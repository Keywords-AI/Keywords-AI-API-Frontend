// actions/streamingTextActions.js

import { sendStreamingTextThunk } from "../thunks/streamingTextThunk";

export const SEND_STREAMINGTEXT_REQUEST = "SEND_STREAMINGTEXT_REQUEST";
export const SEND_STREAMINGTEXT_SUCCESS = "SEND_STREAMINGTEXT_SUCCESS";
export const SEND_STREAMINGTEXT_FAILURE = "SEND_STREAMINGTEXT_FAILURE";
export const SEND_STREAMINGTEXT_PARTIAL = "SEND_STREAMINGTEXT_PARTIAL";
export const ABORT_STREAMINGTEXT_REQUEST = "ABORT_STREAMINGTEXT_REQUEST";
// export const SEND_STREAMINGTEXT = "SEND_STREAMINGTEXT";

// export const sendStreamingText = (streamingText, host, path, callback) => ({
//   type: SEND_STREAMINGTEXT,
//   payload: sendStreamingTextThunk(
//     streamingText,
//     host,
//     path,
//     callback
//   )(dispatch, getState),
// });
export const sendStreamingTextRequest = () => ({
  type: SEND_STREAMINGTEXT_REQUEST,
});

export const sendStreamingTextSuccess = (streamingText) => ({
  type: SEND_STREAMINGTEXT_SUCCESS,
  payload: streamingText,
});

export const sendStreamingTextPartial = (partialData) => ({
  type: SEND_STREAMINGTEXT_PARTIAL,
  payload: partialData,
});

export const sendStreamingTextFailure = (error) => ({
  type: SEND_STREAMINGTEXT_FAILURE,
  payload: error,
});

export const abortStreamingTextRequest = () => ({
  type: ABORT_STREAMINGTEXT_REQUEST,
});
