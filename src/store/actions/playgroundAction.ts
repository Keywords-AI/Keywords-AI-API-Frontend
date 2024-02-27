// Imports
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import {
  SEND_STREAMINGTEXT2_PARTIAL,
  SEND_STREAMINGTEXT_PARTIAL,
  abortStreamingTextRequest,
  resetSingleStreamingText,
  resetStreamingText,
  sendStreamingText2Failure,
  sendStreamingText2Partial,
  sendStreamingText2Request,
  sendStreamingText2Success,
  sendStreamingTextFailure,
  sendStreamingTextPartial,
  sendStreamingTextRequest,
  sendStreamingTextSuccess,
} from "./streamingTextAction";
import { v4 as uuidv4 } from "uuid";
import { dispatchNotification } from "./notificationAction";
import { TypedDispatch } from "src/types/redux";
import { keywordsStream } from "src/utilities/requests";
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
export const SET_SELECTED_LOGS = "SET_SELECTED_LOGS";
export const SET_MESSAGE_BY_INDEX = "SET_MESSAGE_BY_INDEX";
export const SET_MESSAGE_RESPONSE_BY_INDEX = "SET_MESSAGE_RESPONSE_BY_INDEX";
export const DELETE_MESSAGE_BY_INDEX = "DELETE_MESSAGE_BY_INDEX";
export const SET_CHANNEL_MODE = "SET_CHANNEL_MODE";
export const SET_BREAKDOWN_DATA = "SET_BREAKDOWN_DATA";
export const SET_MODEL_LOG_DATA = "SET_MODEL_LOG_DATA";
// Action Creator

export const setModelLogData = (data) => ({
  type: SET_MODEL_LOG_DATA,
  payload: data,
});
export const setBreakDownData = (data) => ({
  type: SET_BREAKDOWN_DATA,
  payload: data,
});
export const setChannelMode = (isSingle) => ({
  type: SET_CHANNEL_MODE,
  payload: isSingle,
});

export const deleMessageByIndex = (id, deleteChannel = -1) => ({
  type: DELETE_MESSAGE_BY_INDEX,
  payload: { id, deleteChannel },
});
export const setMessageResponseByIndex = (id, channel, content) => ({
  type: SET_MESSAGE_RESPONSE_BY_INDEX,
  payload: { id, channel, content },
});
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

export const setSelectedLogs = (selectedLogs) => ({
  type: SET_SELECTED_LOGS,
  payload: selectedLogs,
});

export const setCacheAnswer = (key, cacheAnswers) => ({
  type: SET_CACHE_ANSWER,
  key: key,
  payload: cacheAnswers,
});

export const streamPlaygroundResponse = (specifyChannel?) => {
  return async (dispatch, getState) => {
    const playground = getState().playground;
    const currentModels = playground.currentModels;
    const messages = playground.messages;
    const systemPrompt = playground.prompt;
    const modelOptions = playground.modelOptions;

    const additonalParms = {};
    // if (modelOptions.model !== null)
    //   additonalParms["model"] = modelOptions.model;
    if (modelOptions.temperature !== null) {
      additonalParms["temperature"] = modelOptions.temperature;
    }
    if (modelOptions.maximumLength !== null) {
      additonalParms["max_tokens"] = modelOptions.maximumLength;
    }
    if (modelOptions.topP !== null) additonalParms["top_p"] = modelOptions.topP;
    if (modelOptions.presencePenalty !== null) {
      additonalParms["presence_penalty"] = modelOptions.presencePenalty;
    }
    if (modelOptions.frequencyPenalty !== null) {
      additonalParms["frequency_penalty"] = modelOptions.frequencyPenalty;
    }

    dispatch(
      appendMessage({
        id: uuidv4(),
        role: "assistant",
        responses: [null, null],
        hidden: true,
      })
    );
    let singleChanel = modelOptions.models.some((model) => model == "none");
    if (specifyChannel != null) {
      singleChanel = true;
    }
    if (singleChanel && specifyChannel == null) {
      dispatch(setChannelMode(singleChanel));
    } else if (specifyChannel != null) {
      dispatch(setChannelMode(singleChanel ? false : true));
    }

    const modelParams = modelOptions.models.map((model) => {
      if (model == "none" || model == "router") return null;
      else return { model: model };
    });
    let channels = !singleChanel
      ? [0, 1]
      : [modelOptions.models.indexOf("none") ? 0 : 1];
    if (specifyChannel != null) {
      channels = [specifyChannel];
    }
    await Promise.all(
      channels.map(async (channel) => {
        const chanelMessages = [
          {
            role: "system",
            content: systemPrompt || "",
          },
          ...messages.map((item) => {
            if (item.role == "user") {
              return {
                role: "user",
                content: item.user_content,
              };
            }
            return {
              role: "assistant",
              content: item.responses[channel]
                ? item.responses[channel].content
                : "",
            };
          }),
        ];
        if (channel == 0) {
          dispatch(sendStreamingTextRequest());
        } else if (channel == 1) {
          dispatch(sendStreamingText2Request());
        }
        try {
          // console.log("channel", channel, chanelMessages);
          await keywordsStream({
            data: {
              messages: chanelMessages,
              stream: true,
              request_breakdown: true,
              ...additonalParms,
              ...modelParams[channel],
            },
            dispatch: dispatch,
            path: "api/playground/ask/",
            readStreamLine: (line) => dispatch(readStreamChunk(line, channel)),
            streamingDoneCallback: () => {
              const streamingText =
                getState().streamingText[channel].streamingText;
              const model = getState().streamingText[channel].model;
              const id = uuidv4();

              const newResponse = {
                model: model,
                content: streamingText,
                complete: true,
              };
              const lastMessage = getState().playground.messages.slice(-1)[0];
              if (channel == 0) {
                dispatch(sendStreamingTextSuccess());
                const complete =
                  lastMessage.responses[1] != null &&
                  lastMessage.responses[1].complete == true;
                dispatch(
                  setLastMessage({
                    id: id,
                    hidden: singleChanel ? false : !complete,
                    role: "assistant",
                    responses: [newResponse, lastMessage.responses[1]],
                  })
                );

                if (complete || singleChanel) {
                  dispatch(
                    appendMessage({
                      id: uuidv4(),
                      role: "user",
                      user_content: "",
                    })
                  );
                  // dispatch(resetSingleStreamingText(channel));
                }
              } else if (channel == 1) {
                dispatch(sendStreamingText2Success());
                const complete =
                  lastMessage.responses[0] != null &&
                  lastMessage.responses[0].complete == true;
                dispatch(
                  setLastMessage({
                    id: id,
                    hidden: singleChanel ? false : !complete,
                    role: "assistant",
                    responses: [lastMessage.responses[0], newResponse],
                  })
                );

                if (complete || singleChanel) {
                  dispatch(
                    appendMessage({
                      id: uuidv4(),
                      role: "user",
                      user_content: "",
                    })
                  );
                }
                // dispatch(resetSingleStreamingText(channel));
              }
            },
          });
        } catch (error: any) {
          console.log("error", error);
          let displayError = { errorText: "An error occurred", errorCode: 404 };
          if (!isNaN(parseFloat(error.message))) {
            displayError.errorCode = +error.message;
          }

          // console.log("error", JSON.parse(error.message).error);
          const lastMessage = getState().playground.messages.slice(-1)[0];
          const id = uuidv4();
          const model = getState().streamingText[channel].model;
          if (channel == 0) {
            dispatch(sendStreamingTextFailure(error.toString()));
            const complete =
              lastMessage.responses[1] != null &&
              lastMessage.responses[1].complete == true;
            const errorResponse = {
              model: model,
              content: JSON.stringify(displayError),
              complete: true,
            };
            dispatch(
              setLastMessage({
                id: id,
                hidden: singleChanel ? false : !complete,
                role: "assistant",
                responses: [errorResponse, lastMessage.responses[1]],
              })
            );
          } else if (channel == 1) {
            dispatch(sendStreamingText2Failure(error.toString()));
            const complete =
              lastMessage.responses[0] != null &&
              lastMessage.responses[0].complete == true;
            const errorResponse = {
              model: model,
              content: JSON.stringify(displayError),
              complete: true,
            };
            dispatch(
              setLastMessage({
                id: id,
                hidden: singleChanel ? false : !complete,
                role: "assistant",
                responses: [lastMessage.responses[0], errorResponse],
              })
            );
          }
        }
      })
    );
  };
};

export const regeneratePlaygroundResponse = (channel) => {
  return async (dispatch, getState) => {
    // remove user last message
    getState().playground.messages.slice(-1)[0].role == "user" &&
      dispatch(removeLastMessage());

    const lastAssistantMessage = {
      ...getState().playground.messages.slice(-1)[0],
    };
    let singleChanel = getState().playground.modelOptions.models.some(
      (model) => model == "none"
    );
    if (singleChanel) {
      if (channel == 0) {
        dispatch(resetSingleStreamingText(1));
      } else if (channel == 1) {
        dispatch(resetSingleStreamingText(0));
      }
    }
    // remove assistant last message
    dispatch(removeLastMessage());
    await dispatch(streamPlaygroundResponse(channel));
    // remove last user message
    dispatch(removeLastMessage());

    [0, 1].forEach((_, c) => {
      if (c != channel) {
        if (c == 0) {
          const recoverText = lastAssistantMessage.responses[c]?.content;
          const recoverModel = lastAssistantMessage.responses[c]?.model;
          const recoverContent =
            recoverText && recoverModel
              ? { content: recoverText, model: recoverModel, complete: true }
              : null;
          dispatch(
            setLastMessage({
              id: lastAssistantMessage.id,
              hidden: false,
              role: "assistant",
              responses: [recoverContent, lastAssistantMessage.responses[1]],
            })
          );
        } else if (c == 1) {
          const recoverText = lastAssistantMessage.responses[c]?.content;
          const recoverModel = lastAssistantMessage.responses[c]?.model;
          const recoverContent =
            recoverText && recoverModel
              ? { content: recoverText, model: recoverModel, complete: true }
              : null;
          dispatch(
            setLastMessage({
              id: lastAssistantMessage.id,
              hidden: false,
              role: "assistant",
              responses: [lastAssistantMessage.responses[0], recoverContent],
            })
          );
        }
        dispatch(
          appendMessage({
            id: uuidv4(),
            role: "user",
            user_content: "",
          })
        );
      }
    });
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
        user_content: streamingText,
      })
    );
    dispatch(abortStreamingTextRequest());
    dispatch(appendMessage({ role: "user", user_content: "" }));
  };
};

export const RestorePlaygroundState = (logItem, callback) => {
  return (dispatch, getState) => {
    const [prompt, ...messages] = logItem.prompt_messages;
    const systemPrompt =
      prompt.role === "system" ? logItem.prompt_messages[0].content : "";
    const userMessages = (
      systemPrompt == "" ? logItem.prompt_messages : messages
    ).map((item, index) => {
      return {
        id: index,
        role: "user",
        user_content: item.content,
        responses: null,
      };
    });
    const assisantRespons = {
      id: userMessages.length,
      role: "assistant",
      responses: [
        {
          model: logItem.model,
          content: logItem.completion_message.content,
          complete: true,
        },
      ],
    };
    dispatch(setPrompt(systemPrompt));
    dispatch(setMessages([...userMessages, assisantRespons]));
    callback();
  };
};

const readStreamChunk = (chunk: string, channel: number) => {
  return (dispatch: TypedDispatch, getState) => {
    try {
      if (chunk == "[DONE]" || !chunk) return;
      const data = JSON.parse(chunk);
      const textBit = data.choices?.[0].delta.content;
      const breakdownData = data.choices?.[0].request_breakdown;
      if (breakdownData) {
        const {
          prompt_tokens,
          completion_tokens,
          cost,
          model,
          latency,
          timestamp,
          routing_time,
          status_code,
          time_to_first_token,
        } = breakdownData;
        const currBreakdownData = getState().playground.breakdownData;
        const aggregatedBreakdownData = {
          ...currBreakdownData,
        };
        aggregatedBreakdownData.prompt_tokens += prompt_tokens;
        aggregatedBreakdownData.completion_tokens += completion_tokens;
        aggregatedBreakdownData.cost += cost;
        aggregatedBreakdownData.total_tokens +=
          prompt_tokens + completion_tokens;

        aggregatedBreakdownData.timestamp = timestamp;
        aggregatedBreakdownData.routing_time = routing_time;
        aggregatedBreakdownData.status = status_code;
        dispatch(setBreakDownData(aggregatedBreakdownData));
        const newModelLogData = [...getState().playground.modelLogs];
        newModelLogData[channel] = {
          model: model,
          completion_tokens: completion_tokens,
          cost: cost,
          ttft: time_to_first_token,
          latency: latency,
          time_to_first_token: time_to_first_token,
          status: status_code,
        };
        dispatch(setModelLogData(newModelLogData));
      }

      if (textBit) {
        switch (channel) {
          case 0:
            dispatch({
              type: SEND_STREAMINGTEXT_PARTIAL,
              payload: { text: textBit, model: data.model },
            });
            break;
          case 1:
            dispatch({
              type: SEND_STREAMINGTEXT2_PARTIAL,
              payload: { text: textBit, model: data.model },
            });
            break;
          default:
            throw new Error("Invalid channel");
        }
      }
    } catch (e: any) {
      console.error("Error parsing streaming text chunk", chunk);
      const singleChanel = getState().playground.isSingleChannel;
      let displayError = { errorText: "An error occurred", errorCode: 500 };
      if (!isNaN(parseFloat(e.message))) {
        displayError.errorCode = +e.message;
      }

      // console.log("error", JSON.parse(error.message).error);
      const lastMessage = getState().playground.messages.slice(-1)[0];
      const id = uuidv4();
      const model = getState().streamingText[channel].model;
      if (channel == 0) {
        dispatch(sendStreamingTextFailure(e.toString()));
        const complete =
          lastMessage.responses[1] != null &&
          lastMessage.responses[1].complete == true;
        const errorResponse = {
          model: model,
          content: JSON.stringify(displayError),
          complete: true,
        };
        dispatch(
          setLastMessage({
            id: id,
            hidden: singleChanel ? false : !complete,
            role: "assistant",
            responses: [errorResponse, lastMessage.responses[1]],
          })
        );
      } else if (channel == 1) {
        dispatch(sendStreamingText2Failure(e.toString()));
        const complete =
          lastMessage.responses[0] != null &&
          lastMessage.responses[0].complete == true;
        const errorResponse = {
          model: model,
          content: JSON.stringify(displayError),
          complete: true,
        };
        dispatch(
          setLastMessage({
            id: id,
            hidden: singleChanel ? false : !complete,
            role: "assistant",
            responses: [lastMessage.responses[0], errorResponse],
          })
        );
      }
    }
  };
};
