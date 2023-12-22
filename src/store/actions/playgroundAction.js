// Imports
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import { abortStreamingTextRequest } from "./streamingTextAction";
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
export const setOutputs = (outputs) => {
  return (dispatch, getState) => {

    const modelsAndScores = outputs.score;
    // Convert the object into an array of [model, score] pairs
    const modelsWithScores = Object.entries(modelsAndScores);

    // Sort the array based on scores in descending order
    modelsWithScores.sort((a, b) => b[1] - a[1]);
  
    // Extract just the model names from the sorted array
    const sortedModels = modelsWithScores.map(([model, _score]) => model);
    const currentModel = getState().playground.currentModel;
    dispatch(setCurrentModel(currentModel || sortedModels[0]));
    dispatch ({
      type: SET_OUTPUTS,
      payload: outputs,
    });
  };
};

export const setCacheAnswer = (key, cacheAnswers) => ({
  type: SET_CACHE_ANSWER,
  key: key,
  payload: cacheAnswers,
});

export const streamPlaygroundResponse = () => {
  return async (dispatch, getState) => {
    const playground = getState().playground;
    const currentModel = playground.currentModel;
    const messages = playground.messages;
    const systemPrompt = playground.prompt;
    try {
      await sendStreamingTextThunk({
        params: {
          messages: messages,
          stream: true,
          model: currentModel,
          optimize: playground.modelOptions.optimize,
          creativity: playground.modelOptions.creativity,
          max_tokens: playground.modelOptions.maxTokens, // python style snake case
        },
        prompt: systemPrompt,
        callback: () => {
          const currentModel = getState().playground.currentModel;
          const streamingText = getState().streamingText.streamingText;
          const newMessage = {
            role: currentModel,
            content: streamingText,
          };
          const lastuserMessageIdx = getState().playground.messages.length - 1;
          dispatch(appendMessage(newMessage));
          const cache = {
            answer: streamingText,
            index: lastuserMessageIdx,
          };
          dispatch(setCacheAnswer(currentModel, cache));
          dispatch(appendMessage({ role: "user", content: "" }));
        },
        dispatch: dispatch,
        getState: getState,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const regeneratePlaygroundResponse = () => {
  return (dispatch, getState) => {
    dispatch(removeLastMessage());
    dispatch(removeLastMessage());
    dispatch(streamPlaygroundResponse());
  };
};

export const stopResponding = () => {
  return (dispatch, getState) => {
    const state = getState();
    const streamingText = state.streamingText.streamingText;
    const currentModel = state.playground.currentModel;
    dispatch(
      appendMessage({
        role: currentModel,
        content: streamingText,
      })
    );
    dispatch(abortStreamingTextRequest());
    dispatch(appendMessage({ role: "user", content: "" }));
  };
};
