import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  sendStreamingTextRequest,
  sendStreamingTextFailure,
  sendStreamingTextSuccess,
  sendStreamingTextPartial,
  setStreamingTextAbortController,
  clearStreamingTextAbortController,
} from "../actions/streamingTextAction";

export const sendStreamingText = (streamingText) => {
  return async (dispatch) => {
    const path = "api/playground/ask/";
    const host = "https://platform.keywordsai.co/";
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
      Authorization: `Bearer ${retrieveAccessToken()}`,
    };
    dispatch(sendStreamingTextRequest());
    const body = JSON.stringify(streamingText);
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch(setStreamingTextAbortController(abortController));
    try {
      const response = await fetch(host + path, {
        method: "POST",
        headers,
        body,
        signal,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let dataString = "";

      while (true) {
        const { done, value } = await reader.read();

        dataString += decoder.decode(value);

        const chunks = dataString.split("---");

        if (chunks.length === 1) {
          // Handle the first chunk separately
          if (chunks === "" || chunks[0] === "") continue;
          const firstChunk = JSON.parse(chunks[0]);
          if (firstChunk.evaluation) {
            const outputs = firstChunk.evaluation;
            console.log("outputs", outputs);
          } else if (firstChunk.choices[0]?.delta.content) {
            const firstMessageChunk = firstChunk.choices[0]?.delta.content;
            if (firstMessageChunk)
              dispatch(sendStreamingTextPartial(firstMessageChunk));
          }
          dataString = ""; // Clear dataString as the first chunk has been processed
        } else if (chunks.length > 1) {
          dataString = chunks.pop(); // Store any incomplete chunk for the next iteration
          for (const line of chunks) {
            if (!line || line === "") continue;
            const lineChunk = JSON.parse(line);
            if (!lineChunk.choices[0]?.delta.content) continue;
            const messageChunk = lineChunk.choices[0]?.delta.content;
            console.log(messageChunk);
            if (messageChunk) dispatch(sendStreamingTextPartial(messageChunk));

            if (lineChunk.evaluation) {
              const outputs = JSON.parse(lineChunk.evaluation);
              console.log(outputs);
              return;
            }
          }
        }

        if (done) {
          // Dispatch any remaining data
          if (dataString) {
            const lineChunk = JSON.parse(dataString);
            if (lineChunk.evaluation) {
              const outputs = lineChunk.evaluation;
              console.log("outputs", outputs);
            }
          }
          dispatch(sendStreamingTextSuccess());
          break;
        }
      }
    } catch (error) {
      if (error.name === "AbortError") {
        // Request was aborted
        console.log("Request aborted");
      } else {
        console.error(error);
        const errorMessage = error.response
          ? error.response.data
          : "An error occurred";
        dispatch(sendStreamingTextFailure(errorMessage));
      }
    } finally {
      // Clear the abort controller from the Redux store
      dispatch(clearStreamingTextAbortController());
    }
  };
};
