import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { createMessage } from "./messageAction";

export const createConversation = (newMessage = {}) => {
  return (dispatch, getState) => {
    fetch(`${apiConfig.apiURL}chatbot/conversations/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      method: "POST",
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
        dispatch({ type: "SET_CONVERSATION", payload: data });
        dispatch({ type: "CREATE_CONVERSATION", payload: data });
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      method: "POST",
      body: JSON.stringify({ content: content }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          // window.location.href = "/login";
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

export const getConversations = () => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/conversations/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        dispatch({ type: "GET_CONVERSATIONS", payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const retrieveConversation = (id) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}chatbot/conversations/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          // likely not found
          return {};
        }
      })
      .then((data) => {
        dispatch({ type: "SET_CONVERSATION", payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteConversation = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: "DELETE_CONVERSATION", payload: id });
    fetch(`${apiConfig.apiURL}chatbot/conversations/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          if (getState().conversation.id === id) {
            dispatch({ type: "SET_CONVERSATION", payload: {} });
          }
        } else if (res.status === 401) {
          // window.location.href = "/login";
          console.log("401");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };
};
