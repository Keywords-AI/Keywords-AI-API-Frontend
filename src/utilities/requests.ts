// Import necessary types
import apiConfig from "src/services/apiConfig"; // Adjust this import according to your project setup
import { retrieveAccessToken } from "src/utilities/authorization";
import { handleApiResponseErrors } from "src/store/actions";
import { TypedDispatch } from "src/types";
// Define the configuration object type
type KeywordsFetchRequestConfig = {
  path: string; // The URL path for the request
  host?: string; // Optional base URL, defaults to apiConfig.apiURL
  data?: any; // The data to be sent with the request. Replace 'any' with a more specific type if possible
  method?: string; // HTTP method (e.g., "GET", "POST"), defaults to "GET"
  auth?: boolean; // Indicates whether to include an authorization token, defaults to true
  credentials?: RequestCredentials; // Credentials policy for the request, defaults to "same-origin"
  dispatch?: TypedDispatch | undefined; // Optional Redux dispatch function, requried for notifications
  muteNotifications?: boolean; // Optional flag to mute notifications
};

/**
 * Performs an HTTP request based on the provided configuration.
 * Handles errors and dispatches notifications.
 *   @param {KeywordsFetchRequestConfig} KeywordsFetchRequestConfig - The configuration object for the request.
 *   @param {string} KeywordsFetchRequestConfig.path - The URL path for the request.
 *   @param {string} [KeywordsFetchRequestConfig.host] - Optional base URL, defaults to apiConfig.apiURL.
 *   @param {any} [KeywordsFetchRequestConfig.data] - The data to be sent with the request. Replace 'any' with a more specific type if possible.
 *   @param {string} [KeywordsFetchRequestConfig.method] - HTTP method (e.g., "GET", "POST"), defaults to "GET".
 *   @param {boolean} [KeywordsFetchRequestConfig.auth] - Indicates whether to include an authorization token, defaults to true.
 *   @param {RequestCredentials} [KeywordsFetchRequestConfig.credentials] - Credentials policy for the request, defaults to "same-origin".
 *   @param {TypedDispatch | undefined} [KeywordsFetchRequestConfig.dispatch] - Optional Redux dispatch function.
 * @returns {Promise<any>} A promise that resolves to the response body in json format.
 */

// Define the function with TypeScript
export const keywordsRequest = async ({
  path,
  host = apiConfig.apiURL, // Ensure apiConfig is defined and imported
  data,
  method = "GET",
  auth = true,
  credentials = "same-origin",
  dispatch,
}: KeywordsFetchRequestConfig): Promise<any> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (auth) {
      headers["Authorization"] = `Bearer ${retrieveAccessToken()}`; // Ensure retrieveAccessToken is defined and imported
    }
    const callBody: RequestInit = {
      method: method,
      headers,
      credentials: credentials,
    };
    if (method !== "GET") {
      callBody.body = JSON.stringify(data);
    }
    const response = await fetch(host + path, callBody);
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      if (dispatch && typeof dispatch === "function") {
        dispatch(handleApiResponseErrors(error));
      }
      throw new Error(response.statusText);
    }
  } catch (error: Error | any) {
    throw error;
  }
};
