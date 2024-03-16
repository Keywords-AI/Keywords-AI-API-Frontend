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
import apiConfig from "src/services/apiConfig";
import {
  // Actions
  setOrg,
  setFreeCredits,
  // Action Types
} from "src/store/actions";
import { FETCH_ENDPOINT, SANITY_CHECK } from "src/env";
import { keywordsRequest } from "src/utilities/requests";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const getUser = () => {
  return (dispatch) => {
    console.log("SANITY ", SANITY_CHECK, FETCH_ENDPOINT);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 20000)
    );
    getCSRF();
    const request = fetch(`${apiConfig.apiURL}auth/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    });
    request
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          const { organization, ...user } = data;
          // Set the user object itself
          dispatch({ type: SET_USER, payload: user });
          // Set the organizaiton of the user
          dispatch(setOrg(organization));
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
        } else {
          // console.log(await res.text());
          const data = await res.text();
          dispatch({ type: SET_USER_FAILED });
          // window.location = "https://keywordsai.co/";
        }
      })
      .catch((error) => {
        // window.location = "/login";
        console.log("error", error);
        dispatch({ type: SET_USER_FAILED });
      });
  };
};

export const updateUser = (data = {}, callback = () => {}, mute = false) => {
  // Check redux devtools for the data structure
  return (dispatch) => {
    dispatch({ type: UPDATE_USER, payload: data });
    keywordsRequest({
      path: "auth/users/me/",
      method: "PATCH",
      data,
      dispatch,
    })
      .then((responseJson) => {
        if (!mute) {
          dispatch(
            dispatchNotification({ title: "User updated successfully" })
          );
        }
        const data = responseJson;
        // ---------Chatbot Actions---------
        // Set user's custom prompt for chatbot
        // dispatch(setCustomPrompt(data.system_prompt));
        dispatch(setEnableCustomPrompt(data.system_prompt_active));
        dispatch(setCustomPromptFile(data.current_file));
        dispatch(getConversation(data.last_conversation));
        // ---------End Chatbot Actions---------
      })
      .catch((error) => console.log(error.message));
  };
};

export const updateSystemPrompt = (promptAndActive) => {
  return (dispatch) => {
    dispatch(setEnableCustomPrompt(promptAndActive.system_prompt_active));
    // dispatch(setCustomPromptFile(promptAndActive.current_file));
    keywordsRequest({
      path: "user/update_user_system_prompt/",
      method: "PATCH",
      data: promptAndActive,
      dispatch,
    })
      .then((responseJson) => {
        dispatch({ type: SET_USER, payload: responseJson });
      })
      .catch((error) => console.log(error));
  };
};
