// Action Types
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_PROMPT = "SET_PROMPT";
export const SET_CURRENT_MODEL = "SET_CURRENT_MODEL";
export const SET_MODEL_OPTIONS = "SET_MODEL_OPTIONS";
export const SET_OUTPUTS = "SET_OUTPUTS";
export const SET_FIRST_TIME = "SET_FIRST_TIME";
export const SET_CACHE_ANSWER = "SET_CACHE_ANSWERS";
export const APPEND_MESSAGE = "APPEND_MESSAGE";
export const REMOVE_LAST_MESSAGE = "REMOVE_LAST_MESSAGE";
export const SET_LAST_MESSAGE = "SET_LAST_MESSAGE";
export const SET_CURRENT_BRAND = "SET_CURRENT_BRAND";
// Action Creator
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const appendMessage = (message) => ({
  type: APPEND_MESSAGE,
  payload: message,
});

export const removeLastMessage = () => ({
  type: REMOVE_LAST_MESSAGE,
});

export const setLastMessage = (message) => ({
  type: SET_LAST_MESSAGE,
  payload: message,
});

export const setFirstTime = (firstTime) => ({
  type: SET_FIRST_TIME,
  payload: firstTime,
});

export const setPrompt = (prompt) => ({ type: SET_PROMPT, payload: prompt });
export const setCurrentModel = (currentModel) => ({
  type: SET_CURRENT_MODEL,
  payload: currentModel,
});

export const setCurrentBrand = (currentBrand) => ({
  type: SET_CURRENT_BRAND,
  payload: currentBrand,
});

export const setModelOptions = (modelOptions) => ({
  type: SET_MODEL_OPTIONS,
  payload: modelOptions,
});
export const setOutputs = (outputs) => ({
  type: SET_OUTPUTS,
  payload: outputs,
});

export const setCacheAnswer = (key, cacheAnswers) => ({
  type: SET_CACHE_ANSWER,
  key: key,
  payload: cacheAnswers,
});
