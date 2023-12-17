import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import { sendStreamingTextThunk } from "../thunks/streamingTextThunk";

export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SET_IS_EDITING = "SET_IS_EDITING";
export const SET_ENABLE_CUSTOM_PROMPT = "SET_ENABLE_CUSTOM_PROMPT";
export const SET_CUSTOM_PROMPT = "SET_CUSTOM_PROMPT";
export const SET_CUSTOM_PROMPT_FILE = "SET_CUSTOM_PROMPT_FILE";
export const SET_MESSAGES = "SET_MESSAGES";
export const SET_CONVERSATIONS = "SET_CONVERSATIONS";
export const SET_CONVERSATION = "SET_CONVERSATION";
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

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

export const setEnableCustomPrompt = (enable) => {
  return {
    type: SET_ENABLE_CUSTOM_PROMPT,
    payload: enable,
  };
};

export const setCustomPrompt = (customPrompt) => {
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
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const setConversations = (conversations) => {
  return {
    type: SET_CONVERSATIONS,
    payload: conversations,
  };
};

export const setConversation = (conversation) => {
  return {
    type: SET_CONVERSATION,
    payload: conversation,
  };
};

export const deleteConversation = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_CONVERSATION, payload: id });
    fetch(`${apiConfig.apiURL}chatbot/conversations/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          if (getState().conversation?.id === id) {
            dispatch({ type: SET_CONVERSATION, payload: {} });
          }
        } else if (res.status === 401) {
        } else {
          console.log(res.status);
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
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
    fetch(`${apiConfig.apiURL}chatbot/conversations/${id}/`, {
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
          return {};
        }
      })
      .then((data) => {
        dispatch({ type: SET_CONVERSATION, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const createConversation = (newMessage = {}) => {
  return (dispatch, getState) => {
    fetch(`${apiConfig.apiURL}chatbot/conversations/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        data.name = "New Conversation " + data.id;
        dispatch({ type: CREATE_CONVERSATION, payload: data });
        dispatch(nameConversation(data.id, newMessage.content));
        if (Object.keys(newMessage).length !== 0) {
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
};

export const createMessage = (msg) => {
  return (dispatch) => {
    dispatch({ type: CREATE_MESSAGE, payload: msg });
    fetch(`${apiConfig.apiURL}chatbot/messages/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "POST",
      body: JSON.stringify(msg),
    })
      .then(async (res) => {
        if (res.ok) {
          return await res.json();
        } else {
          console.log(await res.text());
        }
      })
      .catch((err) => console.log(err));
  };
};

export const deleteMesage = (id) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/messages/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "DELETE_MESSAGE", id });
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };
};

export const sendMessage = (msgText) => {
  async (dispatch, getState) => {
    const state = getState();
    const { isLoading: streaming } = state.streamingText;
    const messages = state.chatbot.conversation.messages;
    const systemPrompt = state.chatbot.systemPrompt;
    console.log(messages);
    createMessage({ role: "user", content: msgText });
    const newMessage = getState().chatbot.conversation.messages;
    console.log(newMessage);
    if (streaming) return;
    //   const messagesWithPrompt = [
    //     { role: "system", content: systemPrompt },
    //     ...messages,
    //   ];
    //   try {
    //     await sendStreamingTextThunk(
    //       {
    //         messages: messagesWithPrompt,
    //         stream: true,
    //         model: currentModel,
    //       },
    //       "https://platform.keywordsai.co/",
    //       "api/chatbot/",
    //       systemPrompt,
    //       () => {
    //         console.log("callback");
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
};
