// reducers/streamingTextReducer.js

import {
  SEND_STREAMINGTEXT_REQUEST,
  SEND_STREAMINGTEXT_SUCCESS,
  SEND_STREAMINGTEXT_FAILURE,
  SEND_STREAMINGTEXT_PARTIAL,
  ABORT_STREAMINGTEXT_REQUEST,
} from "src/store/actions/streamingTextAction";

const initialState = {
  streamingText: "",
  isLoading: false,
  error: null,
  abort: false,
};

const streamingTextReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SEND_STREAMINGTEXT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SEND_STREAMINGTEXT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SEND_STREAMINGTEXT_PARTIAL:
      return {
        ...state,
        streamingText: state.streamingText + payload,
      };
    case SEND_STREAMINGTEXT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case ABORT_STREAMINGTEXT_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
        abort: true,
      };
    default:
      return state;
  }
};

export default streamingTextReducer;
