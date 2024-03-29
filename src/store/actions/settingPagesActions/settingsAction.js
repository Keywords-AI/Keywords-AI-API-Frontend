// Action Types
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_STREAMING = "SET_STREAMING";
export const SET_PROMPT = "SET_PROMPT";
export const SET_CURRENT_MODEL = "SET_CURRENT_MODEL";
export const SET_MODEL_OPTIONS = "SET_MODEL_OPTIONS";
export const SET_OUTPUTS = "SET_OUTPUTS";
export const UPDATE_STREAMING_TEXT = "UPDATE_STREAMING_TEXT";
export const SET_STREAMING_TEXT = "SET_STREAMING_TEXT";
export const SET_FIRST_TIME = "SET_FIRST_TIME";
export const SET_CACHE_ANSWER = "SET_CACHE_ANSWERS";

// Action Creator
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});