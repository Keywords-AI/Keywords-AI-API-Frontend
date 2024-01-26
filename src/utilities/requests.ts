// Import necessary types
import apiConfig from "src/services/apiConfig"; // Adjust this import according to your project setup
import { retrieveAccessToken } from "src/utilities/authorization";
import { handleApiResponseErrors } from "src/store/actions";
import { TypedDispatch, ChatMessage } from "src/types";

// Define the configuration object type
type KeywordsFetchRequestConfig = {
  path: string; // The URL path for the request
  host?: string; // Optional base URL, defaults to apiConfig.apiURL
  data?: any; // The data to be sent with the request. Replace 'any' with a more specific type if possible
  method?: string; // HTTP method (e.g., "GET", "POST"), defaults to "GET"
  auth?: boolean; // Indicates whether to include an authorization token, defaults to true
  credentials?: RequestCredentials; // Credentials policy for the request, defaults to "same-origin"
  dispatch?: TypedDispatch | undefined; // Optional Redux dispatch function, requried for notifications
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
 *   @param {TypedDispatch | undefined} [KeywordsFetchRequestConfig.dispatch] - Optional Redux dispatch function. Not passing this will mute notifications.
 * @returns {Promise<any>} A promise that resolves to the response body in json format.
 *
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
      const status = response.status;
      const error = await response.json();
      if (dispatch && typeof dispatch === "function") {
        dispatch(handleApiResponseErrors(error, status));
      }
      throw new Error(response.statusText);
    }
  } catch (error: Error | any) {
    throw error;
  }
};

export type StreamingParams = {
  host?: string;
  path?: string;
  data: {
    messages: ChatMessage[];
    model: string;
    stream: boolean;
    logprobs?: boolean;
  };
  apiKey: string;
  callbackFunction: (line: string) => void;
  dispatch?: TypedDispatch | undefined;
};

export const keywordsStream = ({
  path = "api/generate/",
  host = apiConfig.apiURL, // Ensure apiConfig is defined and imported
  data,
  callbackFunction,
  apiKey,
  dispatch,
}: StreamingParams) => {
  // fetch("http://localhost:8000/api/generate/", {
  fetch(`${host}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (stream: any) => {
    if (!stream.ok) {
      const errors = await stream.json();
      if (dispatch && typeof dispatch === "function") {
        dispatch(handleApiResponseErrors(errors, stream.status));
      }
      throw new Error("Stream response error");
    }
    const reader = stream?.body.getReader();
    const decoder = new TextDecoder();
    const abortController = new AbortController();
    const signal = abortController.signal;
    // Start reading the stream
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done || signal.aborted) {
            console.log("Stream complete");
            break;
          }
          const message = decoder.decode(value);
          // Splitting the returned text chunck with the delimiter
          for (const line of message.split("---")) {
            // Line is a JSON string
            if (callbackFunction && typeof callbackFunction === "function") {
              callbackFunction(line);
            }
          }
        }
      } catch (e) {
        console.error("Stream error:", e);
      }
    })();
    // Return a function to abort the stream from outside
    return () => {
      abortController.abort();
    };
  });
};
