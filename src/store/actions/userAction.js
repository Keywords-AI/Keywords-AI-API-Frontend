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
import { FETCH_ENDPOINT, SANITY_CHECK } from "src/env";
import { keywordsRequest } from "src/utilities/requests";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = () => {
  return (dispatch) => {
    console.log("SANITY ", SANITY_CHECK, FETCH_ENDPOINT);
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

export const updateUser = (data = {}, callback = () => {}, mute=false) => {
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
          dispatchNotification({ title: "User updated successfully" });
        }
      })
      .catch((error) => console.log(error.message));
  };
};
