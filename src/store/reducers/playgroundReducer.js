import {
  SET_MESSAGES,
  SET_PROMPT,
  SET_CURRENT_MODEL,
  SET_MODEL_OPTIONS,
  SET_OUTPUTS,
  SET_FIRST_TIME,
  SET_CACHE_ANSWER,
  APPEND_MESSAGE,
  REMOVE_LAST_MESSAGE,
  SET_LAST_MESSAGE,
} from "../actions/playgroundAction";
const initialState = {
  messages: [
    {
      role: "user",
      content: "",
    },
  ],
  firstTime: true,
  prompt: "",
  currentModel: "",
  cacheAnswers: {},
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
    case APPEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case REMOVE_LAST_MESSAGE:
      return { ...state, messages: state.messages.slice(0, -1) };
    case SET_LAST_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, -1),
          { ...state.messages.slice(-1)[0], ...action.payload },
        ],
      };
    case SET_PROMPT:
      return { ...state, prompt: action.payload };
    case SET_CURRENT_MODEL:
      return { ...state, currentModel: action.payload };
    case SET_MODEL_OPTIONS:
      return {
        ...state,
        modelOptions: { ...state.modelOptions, ...action.payload },
      };
    case SET_OUTPUTS:
      return { ...state, outputs: { ...state.outputs, ...action.payload } };
    case SET_FIRST_TIME:
      return { ...state, firstTime: action.payload };
    case SET_CACHE_ANSWER:
      return {
        ...state,
        cacheAnswers: {
          ...state.cacheAnswers,
          [action.key]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default playgroundReducer;
