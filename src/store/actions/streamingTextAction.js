// actions/streamingTextActions.js

export const SEND_STREAMINGTEXT_REQUEST = "SEND_STREAMINGTEXT_REQUEST";
export const SEND_STREAMINGTEXT_SUCCESS = "SEND_STREAMINGTEXT_SUCCESS";
export const SEND_STREAMINGTEXT_FAILURE = "SEND_STREAMINGTEXT_FAILURE";
export const SEND_STREAMINGTEXT_PARTIAL = "SEND_STREAMINGTEXT_PARTIAL";
export const SET_STREAMING_TEXT_ABORT_CONTROLLER =
  "SET_STREAMING_TEXT_ABORT_CONTROLLER";
export const setStreamingTextAbortController = (abortController) => ({
  type: SET_STREAMING_TEXT_ABORT_CONTROLLER,
  payload: abortController,
});

export const clearStreamingTextAbortController = () => ({
  type: SET_STREAMING_TEXT_ABORT_CONTROLLER,
  payload: null,
});

export const abortStreamingTextRequest = () => (dispatch, getState) => {
  const { streamingText } = getState();
  if (streamingText.abortController) {
    streamingText.abortController.abort();
    dispatch(clearStreamingTextAbortController());
  }
};
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
