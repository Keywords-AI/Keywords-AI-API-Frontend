import {
  SET_MESSAGES,
  SET_STREAMING,
  SET_PROMPT,
  SET_CURRENT_MODEL,
  SET_MODEL_OPTIONS,
  SET_OUTPUTS,
  UPDATE_STREAMING_TEXT,
  SET_STREAMING_TEXT
} from "../actions/playgroundAction";
const initialState = {
  messages: [
    {
      role: "user",
      content: "",
    },
  ],
  streaming: false,
  streamingText: "",
  prompt: "",
  currentModel: "",
  modelOptions: {
    optimize: "speed",
    creativity: "high",
    maxTokens: 0,
  },
  outputs: {
    score: 8.8,
    cost: 0.00123,
    latency: 9.2,
    tokens: 4386,
  },
};

// Reducer
const playgroundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_STREAMING:
      return { ...state, streaming: action.payload };
    case SET_PROMPT:
      return { ...state, prompt: action.payload };
    case UPDATE_STREAMING_TEXT:
      return { ...state, streamingText: state.streamingText + action.payload };
    case SET_STREAMING_TEXT:
      return { ...state, streamingText: action.payload };
    case SET_CURRENT_MODEL:
      return { ...state, currentModel: action.payload };
    case SET_MODEL_OPTIONS:
      return {
        ...state,
        modelOptions: { ...state.modelOptions, ...action.payload },
      };
    case SET_OUTPUTS:
      return { ...state, outputs: { ...state.outputs, ...action.payload } };
    default:
      return state;
  }
};

export default playgroundReducer;
