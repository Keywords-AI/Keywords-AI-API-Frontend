import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  sendStreamingTextRequest,
  sendStreamingTextFailure,
  sendStreamingTextSuccess,
  sendStreamingTextPartial,
} from "../actions/streamingTextAction";
import store from "../store";
export const sendStreamingTextThunk = async (
  streamingText,
  host,
  path,
  callback
) => {
  const abortController = new AbortController();
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken"),
    Authorization: `Bearer ${retrieveAccessToken()}`,
  };
  store.dispatch(sendStreamingTextRequest());
  const body = JSON.stringify(streamingText);
  try {
    const response = await fetch(host + path, {
      method: "POST",
      headers,
      body,
      signal: abortController.signal,
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let dataString = "";

    while (true) {
      const { done, value } = await reader.read();
      console.log("value", value);
      console.log("done", done);
      if (done) {
        console.log(reader);
        reader.cancel();
        store.dispatch(sendStreamingTextSuccess());
        break;
      }
      dataString += decoder.decode(value);

      const chunks = dataString.split("---");
      if (store.getState().streamingText.abort) {
        throw new Error("Aborted");
      }
      if (chunks.length === 1) {
        // Handle the first chunk separately
        if (chunks === "" || chunks[0] === "") continue;
        const firstChunk = JSON.parse(chunks[0]);
        if (firstChunk.evaluation) {
          const outputs = firstChunk.evaluation;
          console.log("outputs", outputs);
        } else if (firstChunk.choices[0]?.delta.content) {
          const firstMessageChunk = firstChunk.choices[0]?.delta.content;
          if (firstMessageChunk) {
            store.dispatch(sendStreamingTextPartial(firstMessageChunk));
          }
        }
        dataString = ""; // Clear dataString as the first chunk has been processed
      } else if (chunks.length > 1) {
        dataString = chunks.pop(); // Store any incomplete chunk for the next iteration
        for (const line of chunks) {
          if (!line || line === "") continue;
          const lineChunk = JSON.parse(line);
          if (!lineChunk.choices[0]?.delta.content) continue;
          const messageChunk = lineChunk.choices[0]?.delta.content;
          if (messageChunk) {
            store.dispatch(sendStreamingTextPartial(messageChunk));
          }

          if (lineChunk.evaluation) {
            const outputs = JSON.parse(lineChunk.evaluation);
            console.log(outputs);
            return;
          }
        }
      }
    }
    reader.releaseLock();
    abortController.abort();
    console.log(abortController);
    if (callback && typeof callback === "function") {
      callback();
    }
  } catch (error) {
    console.error(error);

    const errorMessage = error.response
      ? error.response.data
      : "An error occurred";
    store.dispatch(sendStreamingTextFailure(errorMessage));
  }
};
