import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import { keywordsStream, keywordsRequest } from "src/utilities/requests";
import { v4 as uuidv4 } from "uuid";
import {
  ChatMessage,
  ConversationMessage,
  RootState,
  TypedDispatch,
} from "src/types";
import {
  SEND_STREAMINGTEXT_SUCCESS,
  SEND_STREAMINGTEXT_PARTIAL,
  SEND_STREAMINGTEXT_REQUEST,
  sendStreamingTextFailure,
} from "./streamingTextAction";

export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SET_IS_EDITING = "SET_IS_EDITING";
export const SET_ENABLE_CUSTOM_PROMPT = "SET_ENABLE_CUSTOM_PROMPT";
export const SET_CUSTOM_PROMPT = "SET_CUSTOM_PROMPT";
export const SET_CUSTOM_PROMPT_FILE = "SET_CUSTOM_PROMPT_FILE";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_CONVERSATION = "SET_CONVERSATION";
export const RESET_CONVERSATION = "RESET_CONVERSATION";
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const REMOVE_LAST_MESSAGE = "REMOVE_LAST_MESSAGE";
export const SET_MESSAGE_CONTENT = "SET_MESSAGE_CONTENT";
export const SET_EDIT_MESSAGE = "SET_EDIT_MESSAGE";

export const setEditMessage = (id) => {
  return {
    type: SET_EDIT_MESSAGE,
    payload: id,
  };
};
export const setMessageContent = (id, content) => {
  return {
    type: SET_MESSAGE_CONTENT,
    payload: { id, content },
  };
};
export const errorMessage = (error) => ({
  type: ERROR_MESSAGE,
  payload: {
    role: "assistant",
    content: "Error: " + error.detail,
  },
});

// Is the custom prompt editing window open?
export const setIsEditing = (isEditing) => ({
  type: SET_IS_EDITING,
  payload: isEditing,
});

export const setEnableCustomPrompt = (enable: boolean) => {
  return {
    type: SET_ENABLE_CUSTOM_PROMPT,
    payload: enable,
  };
};

export const setCustomPrompt = (customPrompt) => {
  if (typeof customPrompt === "object") {
    customPrompt = customPrompt.content;
  }
  return {
    type: SET_CUSTOM_PROMPT,
    payload: customPrompt,
  };
};

export const setCustomPromptFile = (customPromptFile) => {
  return {
    type: SET_CUSTOM_PROMPT_FILE,
    payload: customPromptFile,
  };
}; // not used

export const deleteConversation = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_CONVERSATION, payload: id });
    if (getState().chatbot.conversation?.id === id) {
      dispatch({ type: RESET_CONVERSATION });
    }
    keywordsRequest({
      method: "DELETE",
      path: `chatbot/conversation/${id}/`,
      dispatch: dispatch,
    });
  };
};

export const getConversations = () => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/conversations/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          // window.location.href = "/login";
          console.log("401");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        dispatch({ type: SET_CONVERSATIONS, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const getConversation = (id) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/conversation/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          console.log("401");
        } else {
          // likely not found
          return;
        }
      })
      .then((data) => {
        if (data) {
          dispatch({ type: SET_CONVERSATION, payload: data });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const createConversation = (newMessage?: ConversationMessage) => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      method: "POST",
      path: "chatbot/conversations/",
      dispatch: dispatch,
    })
      .then((data) => {
        data.name = "New Conversation " + data.id;
        dispatch({ type: CREATE_CONVERSATION, payload: data });
        // dispatch(nameConversation(data.id, newMessage.content));
        if (newMessage) {
          newMessage.conversation = data.id;
          dispatch(createMessage(newMessage));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const nameConversation = (id, content) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/name_conversation/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "POST",
      body: JSON.stringify({ content: content }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
        } else {
          return res.text();
        }
      })
      .then((data) => {
        if (typeof data === "object") {
          dispatch({ type: "RENAME_CONVERSATION", payload: data });
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };
}; // not used

export const createMessage = (msg: ConversationMessage) => {
  return (dispatch: TypedDispatch) => {
    dispatch({ type: CREATE_MESSAGE, payload: msg });
    if (msg.conversation) {
      // Given an id, or the id is not 0
      keywordsRequest({
        data: msg,
        method: "POST",
        path: "chatbot/messages/",
        dispatch: dispatch,
      });
    } else {
      dispatch(createConversation(msg));
    }
  };
};

export const readStreamChunk = (chunk: string) => {
  return (dispatch: TypedDispatch) => {
    try {
      const data = JSON.parse(chunk);
      const textBit = data.choices?.[0].delta.content;
      if (textBit) {
        dispatch({
          type: SEND_STREAMINGTEXT_PARTIAL,
          payload: { text: textBit, model: data.model },
        });
      }
    } catch (e) {}
  };
};

export const sendMessage = (msgText?: string) => {
  return async (dispatch: TypedDispatch, getState: () => RootState) => {
    const state = getState();
    const { isLoading: streaming } = state.streamingText[0];
    const systemPrompt = state.chatbot.customPrompt;
    const conversation_id = state.chatbot.conversation.id;
    if (msgText) {
      dispatch(
        createMessage({
          conversation: conversation_id,

          role: "user",
          content: msgText,
          model: null,
        })
      );
    }
    const messages = getState().chatbot.conversation.messages; // get messages after creating and updating the state
    if (streaming) return;
    const sessionMessages = messages.map((item) => {
      return { role: item.role, content: item.content };
    });
    const messagesToSend = [
     
      ...sessionMessages,
    ];
    dispatch({ type: SEND_STREAMINGTEXT_REQUEST });
    keywordsStream({
      data: { messages: messagesToSend, stream: true, model: "gpt-4" },
      dispatch: dispatch,
      // path: "api/playground/chatbot/"
      path: "api/generate/",
      // zrXMovph.BMpn7htSwiiaBJOeUcBxpNWTloZOxsUe
      apiKey: "zrXMovph.BMpn7htSwiiaBJOeUcBxpNWTloZOxsUe",
      readStreamLine: (line) => dispatch(readStreamChunk(line)),
      streamingDoneCallback: () => {
        const state = getState();
        const streamingText = state.streamingText[0].streamingText;
        const streamingModel = state.streamingText[0].model;
        const currentConversationId = state.chatbot.conversation.id;
        dispatch({ type: SEND_STREAMINGTEXT_SUCCESS });
        dispatch(
          createMessage({
            conversation: currentConversationId,
            role: "assistant",
            content: streamingText,
            model: streamingModel,
          })
        );
      },
    })
      .then((abortController) => {
        // console.log(abortController);
      })
      .catch((err) => {
        console.log(err);
        dispatch(sendStreamingTextFailure(err.toString()));
      });
  };
};

export const regenerateChatbotResponse = () => {
  return (dispatch, getState) => {
    dispatch(removeLastMessage());
    dispatch(sendMessage());
  };
};

export const removeLastMessage = () => ({
  type: REMOVE_LAST_MESSAGE,
});
