// actions/streamingTextActions.js
export const SEND_STREAMINGTEXT_REQUEST = "SEND_STREAMINGTEXT_REQUEST";
export const SEND_STREAMINGTEXT_SUCCESS = "SEND_STREAMINGTEXT_SUCCESS";
export const SEND_STREAMINGTEXT_FAILURE = "SEND_STREAMINGTEXT_FAILURE";
export const SEND_STREAMINGTEXT_PARTIAL = "SEND_STREAMINGTEXT_PARTIAL";
export const ABORT_STREAMINGTEXT_REQUEST = "ABORT_STREAMINGTEXT_REQUEST";
export const RESET_STREAMINGTEXT = "RESET_STREAMINGTEXT";
export const SEND_STREAMINGTEXT2_REQUEST = "SEND_STREAMINGTEXT2_REQUEST";
export const SEND_STREAMINGTEXT2_SUCCESS = "SEND_STREAMINGTEXT2_SUCCESS";
export const SEND_STREAMINGTEXT2_FAILURE = "SEND_STREAMINGTEXT2_FAILURE";
export const SEND_STREAMINGTEXT2_PARTIAL = "SEND_STREAMINGTEXT2_PARTIAL";
export const ABORT_STREAMINGTEXT2_REQUEST = "ABORT_STREAMINGTEXT2_REQUEST";

export const resetStreamingText = () => ({
  type: RESET_STREAMINGTEXT,
});
export const sendStreamingTextRequest = () => ({
  type: SEND_STREAMINGTEXT_REQUEST,
});

export const sendStreamingTextSuccess = () => ({
  type: SEND_STREAMINGTEXT_SUCCESS,
});

export const sendStreamingTextPartial = (partialData) => {
  return {
    type: SEND_STREAMINGTEXT_PARTIAL,
    payload: partialData,
  };
};

export const sendStreamingTextFailure = (error) => ({
  type: SEND_STREAMINGTEXT_FAILURE,
  payload: error,
});

export const abortStreamingTextRequest = () => ({
  type: ABORT_STREAMINGTEXT_REQUEST,
});

export const sendStreamingText2Request = () => ({
  type: SEND_STREAMINGTEXT2_REQUEST,
});

export const sendStreamingText2Success = () => ({
  type: SEND_STREAMINGTEXT2_SUCCESS,
});

export const sendStreamingText2Partial = (partialData) => {
  return {
    type: SEND_STREAMINGTEXT2_PARTIAL,
    payload: partialData,
  };
};

export const sendStreamingText2Failure = (error) => ({
  type: SEND_STREAMINGTEXT2_FAILURE,
  payload: error,
});

export const abortStreamingText2Request = () => ({
  type: ABORT_STREAMINGTEXT2_REQUEST,
});
