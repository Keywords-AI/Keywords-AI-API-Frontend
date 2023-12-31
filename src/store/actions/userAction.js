import { getCSRF } from "src/authentication/Authentication";
import { getCookie } from "src/utilities/cookies";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  setCustomPrompt,
  setEnableCustomPrompt,
  setCustomPromptFile,
  getConversation,
  updateUserSQLPrompt,
} from "src/store/actions";
import apiConfig from "src/services/apiConfig";
import {
  // Actions
  setOrg,
  setFreeCredits,
  // Action Types
} from "src/store/actions";

export const SET_USER = "SET_USER";

export const getUser = () => {
  return (dispatch) => {
    getCSRF();
    fetch(`${apiConfig.apiURL}auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          // Set the user object itself
          dispatch({ type: SET_USER, payload: data });
          // Set the organizaiton of the user
          dispatch(setOrg(data.organization));
          // Set the free credits under usage state of the user
          dispatch(
            setFreeCredits({
              creditsRemaining: data.free_trial_remaining,
              creditsTotal: data.free_free_trial_total || 40000,
              creditsExpired: data.free_trial_expired,
            })
          );
          // ---------Chatbot Actions---------
          // Set user's custom prompt for chatbot
          dispatch(setCustomPrompt(data.system_prompt));
          dispatch(setEnableCustomPrompt(data.system_prompt_active));
          dispatch(setCustomPromptFile(data.current_file));
          dispatch(getConversation(data.last_conversation));
          // ---------End Chatbot Actions---------
        } else if (res.status === 401 && res.status == 403) {
          const data = await res.text();
          dispatch({ type: SET_USER, payload: {} });
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const  updateUser = (data={}) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/users/me/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          // Set the user object itself
          dispatch({ type: SET_USER, payload: data });
          // Set the organizaiton of the user
          dispatch(setOrg(data.organization));
          // Set the free credits under usage state of the user
          dispatch(
            setFreeCredits({
              creditsRemaining: data.free_trial_remaining,
              creditsTotal: data.free_free_trial_total || 40000,
              creditsExpired: data.free_trial_expired,
            })
          );
          // ---------Chatbot Actions---------
          // Set user's custom prompt for chatbot
          dispatch(setCustomPrompt(data.system_prompt));
          dispatch(setEnableCustomPrompt(data.system_prompt_active));
          dispatch(setCustomPromptFile(data.current_file));
          dispatch(getConversation(data.last_conversation));
          // ---------End Chatbot Actions---------
        } else if (res.status === 401 && res.status == 403) {
          const data = await res.text();
          dispatch({ type: SET_USER, payload: {} });
        }
      })
      .catch((error) => console.log(error.message));
  };
}