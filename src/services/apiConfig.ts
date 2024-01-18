import { retrieveAccessToken } from "src/utilities/authorization";
import { dispatchNotification } from "src/store/actions";
import { FETCH_ENDPOINT, SANITY_CHECK } from "src/env.js";

// Make your own .env file as it will be ignored by git
// set a variabled named FETCH_ENDPOINT
// Option values are:
// http://localhost:8000/
// https://api-test.keywordsai.co/
// https://api.keywordsai.co/

// example .env can be found named .env.example
const apiConfig = {
  apiURL: FETCH_ENDPOINT, // For anyone who doesn't have backend local server
  frontendURL: window.location.origin,
  apiKey: "your-api-key",
  timeout: 5000,
};

export default apiConfig;


export const keywordsFetch = async ({
  path,
  host = apiConfig.apiURL,
  data,
  method = "GET",
  auth = true,
  credentials = "same-origin",
  dispatch=()=>{},
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (auth) {
      headers["Authorization"] = `Bearer ${retrieveAccessToken()}`;
    }
    const callBody = {
      method: method,
      headers,
      credentials: credentials,
    };
    if (method !== "GET") {
      callBody.body = JSON.stringify(data);
    }
    return fetch(host + path, callBody);
  } catch (error) {
    dispatch(dispatchNotification({type:"error", title:"Something went wrong"}));
    throw error;
  }
};

