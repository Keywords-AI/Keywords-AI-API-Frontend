import { getCSRF } from "src/authentication/Authentication";
import { getCookie } from "src/utilities/cookies";
import { retrieveAccessToken } from "src/utilities/authorization";
import {
  setCustomPrompt,
  setEnableCustomPrompt,
  setCustomPromptFile,
  getConversation,
  updateUserSQLPrompt,
  dispatchNotification,
} from "src/store/actions";
import { handleSerializerErrors } from "src/utilities/objectProcessing";
import apiConfig from "src/services/apiConfig";
import {
  // Actions
  setOrg,
  setFreeCredits,
  // Action Types
} from "src/store/actions";
import { SANITY_CHECK } from "src/utilities/env";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = () => {
  return (dispatch) => {
    console.log("SANITY ", SANITY_CHECK);
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
        } else {
          const data = await res.json();
        }
      })
      .catch((error) => console.log(error.message));
  };
};

export const updateUser = (data = {}, callback = () => {}) => {
  // Check redux devtools for the data structure
  return (dispatch) => {
    dispatch({ type: UPDATE_USER, payload: data });
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
          dispatch(
            dispatchNotification({
              title: "Successfully updated user information",
            })
          );
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
          const data = await res.json();
          dispatch({ type: SET_USER, payload: {} });
        } else {
          const data = await res.json();
          console.log(data);
          if (data.detail) {
            dispatchNotification({
              title: "Error setting user information",
              message: data.detail,
            });
          } else {
            handleSerializerErrors(data, (err) => {
              dispatchNotification({
                title: "Error setting user information",
                message: err,
              });
            });
          }
        }
      })
      .catch((error) => console.log(error.message));
  };
};
