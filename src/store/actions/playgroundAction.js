// Action Types
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_STREAMING = "SET_STREAMING";
export const SET_PROMPT = "SET_PROMPT";
export const SET_CURRENT_MODEL = "SET_CURRENT_MODEL";
export const SET_MODEL_OPTIONS = "SET_MODEL_OPTIONS";
export const SET_OUTPUTS = "SET_OUTPUTS";
export const UPDATE_STREAMING_TEXT = "UPDATE_STREAMING_TEXT";
export const SET_STREAMING_TEXT = "SET_STREAMING_TEXT";
import { parseChunk } from "src/utilities/streaming";

// Action Creator
export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setStreaming = (streaming) => ({
  type: SET_STREAMING,
  payload: streaming,
});

// Streaming text
export const updateStreamText = (chunk) => ({
  type: UPDATE_STREAMING_TEXT,
  payload: parseChunk(chunk),
});

export const setStreamingText = (text) => ({
  type: SET_STREAMING_TEXT,
  payload: text,
});
// End streaming text

export const setPrompt = (prompt) => ({ type: SET_PROMPT, payload: prompt });
export const setCurrentModel = (currentModel) => ({
  type: SET_CURRENT_MODEL,
  payload: currentModel,
});

export const setModelOptions = (modelOptions) => ({
  type: SET_MODEL_OPTIONS,
  payload: modelOptions,
});
export const setOutputs = (outputs) => ({
  type: SET_OUTPUTS,
  payload: outputs,
});

export const stopStreaming = () => {
  return (dispatch, getState) => {
    const state = getState();
    const messages = state.playground.messages;
    const streamingText = state.playground.streamingText;
    dispatch(setStreaming(false));
    dispatch(
      setMessages([...messages, { role: "assistant", content: streamingText }])
    );
    dispatch(setStreamingText(""));
    console.log("Stop streaming");
  };
};
