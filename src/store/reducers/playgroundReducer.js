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
  SET_CURRENT_BRAND,
  TOGGLE_LEFT_PANEL,
  TOGGLE_RIGHT_PANEL,
  SET_MESSAGE_BY_INDEX,
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
  currentModels: ["gpt-3.5-turbo", "gpt-4"],
  cacheAnswers: {},
  modelOptions: {
    optimize: "speed",
    creativity: "high",
    maxTokens: 256,
  },
  outputs: {
    score: {},
    cost: 0.00123,
    latency: 0.8,
    tokens: 4386,
  },
  isLeftPanelOpen: false,
  isRightPanelOpen: false,
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
    case SET_MESSAGE_BY_INDEX:
      const { index, content } = action.payload;
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, index),
          { ... content },
          ...state.messages.slice(index + 1),
        ],
      };
    case SET_PROMPT:
      return { ...state, prompt: action.payload };
    case SET_CURRENT_MODEL:
      return { ...state, currentModels: action.payload };
    case SET_CURRENT_BRAND:
      return { ...state, currentBrand: action.payload };
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
    case TOGGLE_LEFT_PANEL:
      return { ...state, isLeftPanelOpen: !state.isLeftPanelOpen };
    case TOGGLE_RIGHT_PANEL:
      return { ...state, isRightPanelOpen: !state.isRightPanelOpen };
    default:
      return state;
  }
};

export default playgroundReducer;
