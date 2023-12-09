// Action Types
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_STREAMING = "SET_STREAMING";
export const SET_PROMPT = "SET_PROMPT";
export const SET_CURRENT_MODEL = "SET_CURRENT_MODEL";
export const SET_MODEL_OPTIONS = "SET_MODEL_OPTIONS";
export const SET_OUTPUTS = "SET_OUTPUTS";

// Action Creators
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});
export const setStreaming = (streaming) => ({
  type: SET_STREAMING,
  payload: streaming,
});
export const setPrompt = (prompt) => ({ type: SET_PROMPT, payload: prompt });
export const setCurrentModel = (currentModel) => ({
  type: SET_CURRENT_MODEL,
  payload: currentModel,
});
export const setModelOptions = (modelOptions) => ({
  type: SET_MODEL_OPTIONS,
  payload: modelOptions,
});
export const setOutputs = (outputs) => ({ type: SET_OUTPUTS, payload: outputs });
