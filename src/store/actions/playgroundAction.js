// Imports
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import { abortStreamingTextRequest } from "./streamingTextAction";
import { dispatchNotification } from "./notificationAction";
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
export const TOGGLE_LEFT_PANEL = "TOGGLE_LEFT_PANEL";
export const TOGGLE_RIGHT_PANEL = "TOGGLE_RIGHT_PANEL";
export const SET_MESSAGE_BY_INDEX = "SET_MESSAGE_BY_INDEX";

// Action Creator
export const setMessageByIndex = (payload) => ({
  type: SET_MESSAGE_BY_INDEX,
  payload: payload,
});
export const toggleLeftPanel = () => ({
  type: TOGGLE_LEFT_PANEL,
});
export const toggleRightPanel = () => ({
  type: TOGGLE_RIGHT_PANEL,
});

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
    // dispatch(setCurrentModel(currentModel || sortedModels[0]));
    dispatch({
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
    const currentModels = playground.currentModels;
    const messages = playground.messages;
    const systemPrompt = playground.prompt;
    dispatch(
      appendMessage({
        id: messages.legnth,
        role: "assistant",
        responses: [null, null],
        hidden: true,
      })
    );
    Promise.all(
      currentModels.map(async (model, channel) => {
        try {
          await sendStreamingTextThunk({
            channel: channel,
            params: {
              messages: messages,
              stream: true,
              model: model,
              optimize: playground.modelOptions.optimize,
              creativity: playground.modelOptions.creativity,
              max_tokens: playground.modelOptions.maxTokens, // python style snake case
            },
            prompt: systemPrompt,
            callback: () => {
              const streamingText =
                getState().streamingText[channel].streamingText;

              const id = getState().playground.messages.length - 1;
              const lastMessage = getState().playground.messages.slice(-1)[0];
              const newResponse = {
                model: model,
                content: streamingText,
                complete: true,
              };
              if (channel == 0) {
                const complete =
                  lastMessage.responses[1] != null &&
                  lastMessage.responses[1].complete == true;
                dispatch(
                  setLastMessage({
                    id: id,
                    hidden: complete ? false : true,
                    role: "assistant",
                    responses: [newResponse, lastMessage.responses[1]],
                  })
                );
                if (complete) {
                  dispatch(
                    appendMessage({
                      id: id + 1,
                      role: "user",
                      userContent: "",
                    })
                  );
                }
              } else if (channel == 1) {
                const complete =
                  lastMessage.responses[0] != null &&
                  lastMessage.responses[0].complete == true;
                dispatch(
                  setLastMessage({
                    id: id,
                    hidden: complete ? false : true,
                    role: "assistant",
                    responses: [lastMessage.responses[0], newResponse],
                  })
                );
                if (complete) {
                  dispatch(
                    appendMessage({
                      id: id + 1,
                      role: "user",
                      userContent: "",
                    })
                  );
                }
              }

              // const lastuserMessageIdx =
              //   getState().playground.messages.length - 1;
              // dispatch(appendMessage(newMessage));
              // const cache = {
              //   answer: streamingText,
              //   index: lastuserMessageIdx,
              // };
              // dispatch(setCacheAnswer(currentModel, cache));
            },
            dispatch: dispatch,
            getState: getState,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );
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
