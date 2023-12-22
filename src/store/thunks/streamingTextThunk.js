import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  sendStreamingTextRequest,
  sendStreamingTextFailure,
  sendStreamingTextSuccess,
  sendStreamingTextPartial,
} from "../actions/streamingTextAction";
// import store from "../store";
import { setOutputs } from "../actions/playgroundAction";
import apiConfig from "src/services/apiConfig";
/**
 * Sends streaming text to a specified host and path using the specified parameters.
 *
 * @param {Object} streamingText - The streaming text object containing the stream and messages.
 * @param {string} host - The host to send the streaming text to.
 * @param {string} path - The path to send the streaming text to.
 * @param {string} prompt - The prompt for the streaming text.
 * @param {Function} callback - The callback function to be called after the streaming text is sent.
 * @param {number} [readTimeout=5000] - The timeout for reading data from the response in milliseconds.
 * @param {number} [fetchTimeout=10000] - The timeout for the fetch request in milliseconds.
 * @returns {Promise<void>} - A promise that resolves when the streaming text is sent successfully or rejects with an error.
 */
export const sendStreamingTextThunk = async ({
  params,
  host = apiConfig.apiURL,
  path = "api/playground/ask/",
  prompt,
  callback,
  dispatch,
  getState,
  readTimeout = 5000,
  fetchTimeout = 15000, // Add fetch timeout in milliseconds
}) => {
  const abortController = new AbortController();
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
    Authorization: `Bearer ${retrieveAccessToken()}`,
  };
  dispatch(sendStreamingTextRequest());
  const messages = [
    { role: "system", content: prompt || "You are a helpful assistant." },
    ...params.messages.map((item) =>
      item.role !== "user" ? { ...item, role: "assistant" } : item
    ),
  ];
  const body = JSON.stringify({
    ...params,
    messages,
    // @Ruifeng you don't need to pass the params here. They are specific to playground only
  });
  try {
    const response = await Promise.race([
      fetch(host + path, {
        method: "POST",
        headers,
        body,
        signal: abortController.signal,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Fetch Timeout")), fetchTimeout)
      ),
    ]);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let dataString = "";
    const timeout = (ms) =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Read Timeout")), ms)
      );
    while (true) {
      const { done, value } = await Promise.race([
        reader.read(),
        timeout(readTimeout),
      ]);
      if (done) {
        reader.cancel();
        dispatch(sendStreamingTextSuccess());
        if (callback && typeof callback === "function") {
          callback();
        }
        break;
      }
      if (value === undefined) {
        throw new Error("Backend Error");
      }
      dataString = decoder.decode(value);

      const chunks = dataString.split("---");
      if (getState().streamingText.abort) {
        throw new Error("Aborted");
      }
      chunks.forEach((chunk, index) => {
        if (!chunk || chunk === "") return;
      
        const parsedChunk = JSON.parse(chunk);
        if (parsedChunk.evaluation) {
          const { completion_tokens, cost, latency, scores } = parsedChunk.evaluation;
          dispatch(
            setOutputs({
              tokens: completion_tokens,
              cost,
              latency,
              score: scores,
            })
          );
        } else if (parsedChunk.choices?.[0]?.delta.content) {
          const messageChunk = parsedChunk.choices[0].delta.content;
          dispatch(sendStreamingTextPartial(messageChunk));
        }
      
        // Clear dataString after the last chunk has been processed
        if (index === chunks.length - 1) {
          dataString = "";
        }
      });
    }
    reader.releaseLock();
    abortController.abort();
  } catch (error) {
    console.error(error);
    const errorMessage = error.response
      ? error.response.data
      : "An error occurred";
    dispatch(sendStreamingTextFailure(errorMessage));
  }
};
