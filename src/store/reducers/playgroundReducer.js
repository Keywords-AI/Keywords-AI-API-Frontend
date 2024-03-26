import { parse } from "date-fns";
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
  SET_SELECTED_LOGS,
  SET_MESSAGE_BY_INDEX,
  SET_MESSAGE_RESPONSE_BY_INDEX,
  DELETE_MESSAGE_BY_INDEX,
  SET_CHANNEL_MODE,
  SET_BREAKDOWN_DATA,
  SET_MODEL_LOG_DATA,
  RESET_MODEL_OPTIONS,
  RESET_PLAYGROUND,
  DEFAULT_RESET,
  SET_FOCUS_INDEX,
} from "../actions/playgroundAction";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  messages: [
    {
      id: uuidv4(),
      role: "system",
      user_content: "",
    },
    {
      id: uuidv4(),
      role: "user",
      user_content: "",
    },
  ],
  
  firstTime: true,
  prompt: "",
  // currentModels: localStorage.getItem("playgroundModels")
  //   ? localStorage.getItem("playgroundModels").split(",")
  //   : ["gpt-3.5-turbo", "gpt-4"],
  cacheAnswers: {},
  modelOptions: {
    models: localStorage.getItem("playgroundModels")
    ? localStorage.getItem("playgroundModels").split(",")
    : ["gpt-3.5-turbo", "none"],
    temperature: localStorage.getItem("playgroundTemperature") !== null
      ? parseFloat(localStorage.getItem("playgroundTemperature"))
      : 1,
    maximumLength: localStorage.getItem("playgroundMaximumLength")
      ? parseInt(localStorage.getItem("playgroundMaximumLength"))
      : 256,
    topP: localStorage.getItem("playgroundTopP")
      ? parseFloat(localStorage.getItem("playgroundTopP"))
      : 1,
    frequencyPenalty: localStorage.getItem("playgroundFrequencyPenalty")
      ? parseFloat(localStorage.getItem("playgroundFrequencyPenalty"))
      : 0,
    presencePenalty: localStorage.getItem("playgroundPresencePenalty")
      ? parseFloat(localStorage.getItem("playgroundPresencePenalty"))
      : 0,
  },
  isSingleChannel: true,
  outputs: {
    score: {},
    cost: 0.00123,
    latency: 0.8,
    tokens: 4386,
  },
  breakdownData: {
    prompt_tokens: 0,
    completion_tokens: 0,
    cost: 0,
    total_tokens: 0,
    routing_time: 0,
    timestamp: "",
    status: "",
  },
  modelLogs: [
    {
      model: "",
      completion_tokens: 0,
      cost: 0,
      ttft: 0,
      latency: 0,
      status: -1,
    },
    {
      model: "",
      completion_tokens: 0,
      cost: 0,
      ttft: 0,
      latency: 0,
      status: -1,
    },
  ],

  isLeftPanelOpen: false,
  isRightPanelOpen: true,
  selectedLogs: "",
  isReseted: false,
  focusIndex: 0,
};

// Reducer
const playgroundReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOCUS_INDEX:
      return { ...state, focusIndex: action.payload };
    case DEFAULT_RESET:
      return {
        ...state,
        isReseted: false,
      };
    case RESET_PLAYGROUND:
      return {
        ...JSON.parse(JSON.stringify(initialState)),
        isReseted: true,
      };
    case RESET_MODEL_OPTIONS:
      return {
        ...state,
        modelOptions: {
          ...initialState.modelOptions,
        },
      };
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
    case SET_BREAKDOWN_DATA:
      return { ...state, breakdownData: action.payload };
    case SET_CHANNEL_MODE:
      return { ...state, isSingleChannel: action.payload };
    case SET_MESSAGE_BY_INDEX:
      const { index, content } = action.payload;
      return {
        ...state,
        messages: state.messages.map((message, i) => {
          if (message.id === index) {
            return { ...content };
          }
          return message;
        }),
      };
    case DELETE_MESSAGE_BY_INDEX:
      const { id, deleteChannel: dc } = action.payload;

      if (dc === -1) {
        return {
          ...state,
          messages: state.messages.filter(
            (message, index) => message.id !== id
          ),
        };
      } else {
        const theMessage = state.messages.find(
          (message, index) => message.id === id
        );
        const deleteBoth = theMessage.responses.some(
          (element) => element === null
        );
        if (deleteBoth) {
          return {
            ...state,
            messages: state.messages.filter(
              (message, index) => message.id !== id
            ),
          };
        }
        return {
          ...state,
          messages: state.messages.map((message, index) => {
            if (message.id === id) {
              return {
                ...message,
                responses: message.responses.map((r, c) => {
                  if (c === dc) return null;
                  else return r;
                }),
              };
            }
            return message;
          }),
        };
      }
    case SET_MODEL_LOG_DATA:
      return { ...state, modelLogs: action.payload };
    case SET_MESSAGE_RESPONSE_BY_INDEX:
      const {
        id: set_i,
        content: responseText,
        channel: set_c,
      } = action.payload;
      return {
        ...state,
        messages: state.messages.map((message, index) => {
          if (message.id === set_i) {
            const newResponse = message.responses.map((r, c) => {
              if (c === set_c) {
                return { ...r, content: responseText };
              }
              return r;
            });
            return {
              ...message,
              responses: newResponse,
            };
          }
          return message;
        }),
      };
    case SET_PROMPT:
      return { ...state, prompt: action.payload };
    case SET_CURRENT_MODEL:
      return { ...state, currentModels: action.payload };
    case SET_CURRENT_BRAND:
      return { ...state, currentBrand: action.payload };

    case SET_OUTPUTS:
      return { ...state, outputs: { ...state.outputs, ...action.payload } };
    case SET_FIRST_TIME:
      return { ...state, isFirstTime: action.payload };

    case DELETE_MESSAGE_BY_INDEX:
      const { id: det_i, deleteChannel } = action.payload;

      if (deleteChannel === -1) {
        return {
          ...state,
          messages: state.messages.filter(
            (message, index) => message.id !== det_i
          ),
        };
      } else {
        const theMessage = state.messages.find(
          (message, index) => message.id === det_i
        );
        const deleteBoth = theMessage.responses.some(
          (element) => element === null
        );
        if (deleteBoth) {
          return {
            ...state,
            messages: state.messages.filter(
              (message, index) => message.id !== det_i
            ),
          };
        }
        return {
          ...state,
          messages: state.messages.map((message, index) => {
            if (message.id === det_i) {
              return {
                ...message,
                responses: message.responses.map((r, c) => {
                  if (c === deleteChannel) return null;
                  else return r;
                }),
              };
            }
            return message;
          }),
        };
      }
    case SET_MODEL_LOG_DATA:
      return { ...state, modelLogs: action.payload };
    case SET_MESSAGE_RESPONSE_BY_INDEX:
      const { id: set_resp_i, content: text, channel } = action.payload;
      return {
        ...state,
        messages: state.messages.map((message, index) => {
          if (message.id === set_resp_i) {
            const newResponse = message.responses.map((r, c) => {
              if (c === channel) {
                return { ...r, content: text };
              }
              return r;
            });
            return {
              ...message,
              responses: newResponse,
            };
          }
          return message;
        }),
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
    case SET_SELECTED_LOGS:
      return { ...state, selectedLogs: action.payload };
    case TOGGLE_LEFT_PANEL:
      return { ...state, isLeftPanelOpen: !state.isLeftPanelOpen };
    case TOGGLE_RIGHT_PANEL:
      return { ...state, isRightPanelOpen: !state.isRightPanelOpen };
    default:
      return state;
  }
};

export default playgroundReducer;
