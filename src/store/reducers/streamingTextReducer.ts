import {
  SEND_STREAMINGTEXT_REQUEST,
  SEND_STREAMINGTEXT_SUCCESS,
  SEND_STREAMINGTEXT_FAILURE,
  SEND_STREAMINGTEXT_PARTIAL,
  ABORT_STREAMINGTEXT_REQUEST,
  SEND_STREAMINGTEXT2_REQUEST,
  SEND_STREAMINGTEXT2_SUCCESS,
  SEND_STREAMINGTEXT2_FAILURE,
  SEND_STREAMINGTEXT2_PARTIAL,
  ABORT_STREAMINGTEXT2_REQUEST,
} from "../actions/streamingTextAction";

type StreamingState = {
  streamingText: string;
  isLoading: boolean;
  error: null | string;
  abort: boolean;
};

const initialState: StreamingState[] = [
  { streamingText: "", isLoading: false, error: null, abort: false },
  { streamingText: "", isLoading: false, error: null, abort: false },
];

const streamingTextReducer = (
  state = initialState,
  action
): StreamingState[] => {
  const { type, payload } = action;

  switch (type) {
    case SEND_STREAMINGTEXT_REQUEST:
      return state.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            streamingText: "",
            abort: false,
            isLoading: true,
            error: null,
          };
        }
        return item;
      });

    case SEND_STREAMINGTEXT2_REQUEST:
      return state.map((item, index) => {
        if (index === 1) {
          return {
            ...item,
            streamingText: "",
            abort: false,
            isLoading: true,
            error: null,
          };
        }
        return item;
      });

    case SEND_STREAMINGTEXT_SUCCESS:
      return state.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            isLoading: false,
            error: null,
          };
        }
        return item;
      });
    case SEND_STREAMINGTEXT2_SUCCESS:
      return state.map((item, index) => {
        if (index === 1) {
          return {
            ...item,
            isLoading: false,
            error: null,
          };
        }
        return item;
      });

    case SEND_STREAMINGTEXT_PARTIAL:
      return state.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            streamingText: item.streamingText + payload,
          };
        }
        return item;
      });
    case SEND_STREAMINGTEXT2_PARTIAL:
      return state.map((item, index) => {
        if (index === 1) {
          return {
            ...item,
            streamingText: item.streamingText + payload,
          };
        }
        return item;
      });

    case SEND_STREAMINGTEXT_FAILURE:
      return state.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            isLoading: false,
            error: payload.error,
          };
        }
        return item;
      });
    case SEND_STREAMINGTEXT2_FAILURE:
      return state.map((item, index) => {
        if (index === index) {
          return {
            ...item,
            isLoading: false,
            error: payload.error,
          };
        }
        return item;
      });

    case ABORT_STREAMINGTEXT_REQUEST:
      return state.map((item, index) => {
        if (index === index) {
          return {
            ...item,
            isLoading: false,
            error: null,
            abort: true,
          };
        }
        return item;
      });
    case ABORT_STREAMINGTEXT2_REQUEST:
      return state.map((item, index) => {
        if (index === index) {
          return {
            ...item,
            isLoading: false,
            error: null,
            abort: true,
          };
        }
        return item;
      });

    default:
      return state;
  }
};

export default streamingTextReducer;
