import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";

export const createMessage = (msg) => {
  return (dispatch) => {
    dispatch({ type: "CREATE_MESSAGE", payload: msg });
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
