import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  sendStreamingTextRequest,
  sendStreamingTextFailure,
  sendStreamingTextSuccess,
  sendStreamingTextPartial,
  sendStreamingText2Request,
  sendStreamingText2Success,
  sendStreamingText2Partial,
  sendStreamingText2Failure,
} from "../actions/streamingTextAction";
// import store from "../store";
import { setOutputs } from "../actions/playgroundAction";
import apiConfig from "src/services/apiConfig";
import { dispatchNotification } from "src/store/actions";
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
  channel,
  params,
  host = apiConfig.apiURL,
  path = "api/playground/chatbot/",
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
  if (channel == 0) {
    dispatch(sendStreamingTextRequest());
  } else if (channel == 1) {
    dispatch(sendStreamingText2Request());
  }

  const messages = [
    { role: "system", content: prompt || "You are a helpful assistant." },
    ...params.messages.map((item) => {
      if (item.role == "user") {
        return {
          role: "user",
          content: item.user_content,
        };
      }
      return {
        role: "assistant",
        content: item.responses[channel].content,
      };
    }),
  ];
  const body = JSON.stringify({
    ...params,
    messages,
    // @Ruifeng you don't need to pass the params here. They are specific to playground only
  });
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") || "", // Ensure "X-CSRFToken" is not null
      Authorization: `Bearer ${retrieveAccessToken()}`,
    };
    console.log("Sending streaming text", host + path);
    // https://api-test.keywordsai.co/api/playground/chatbot/
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
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.detail);
    }
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
      if (value === undefined) {
        throw new Error("Backend Error");
      }
      if (done) {
        reader.cancel();
        if (channel == 0) {
          dispatch(sendStreamingTextSuccess());
        } else if (channel == 1) {
          dispatch(sendStreamingText2Success());
        }

        if (callback && typeof callback === "function") {
          callback();
        }
        break;
      }

      dataString = decoder.decode(value);

      const chunks = dataString.split("---");
      if (getState().streamingText[channel].abort) {
        throw new Error("Aborted");
      }
      chunks.forEach((chunk, index) => {
        if (!chunk || chunk === "") return;

        const parsedChunk = JSON.parse(chunk);
        if (parsedChunk.evaluation) {
          const { completion_tokens, cost, latency, scores } =
            parsedChunk.evaluation;
          // TODO: Output to the correct channel
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
          if (channel == 0) {
            dispatch(sendStreamingTextPartial(messageChunk));
          } else if (channel == 1) {
            dispatch(sendStreamingText2Partial(messageChunk));
          }
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

    if (channel == 0) {
      dispatch(sendStreamingTextFailure(errorMessage));
    } else if (channel == 1) {
      dispatch(sendStreamingText2Failure(errorMessage));
    }
    console.log(error);
    if (error.message) {
      dispatch(dispatchNotification({ type: "error", title: error.message }));
    }
  }
};
