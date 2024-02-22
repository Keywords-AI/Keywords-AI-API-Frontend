// Import necessary types
import apiConfig from "src/services/apiConfig"; // Adjust this import according to your project setup
import { retrieveAccessToken } from "src/utilities/authorization";
import { handleApiResponseErrors } from "src/store/actions";
import { TypedDispatch, ChatMessage } from "src/types";
import { PageParagraph } from "src/components/Sections";

// Define the configuration object type
type KeywordsFetchRequestConfig = {
  path: string; // The URL path for the request
  host?: string; // Optional base URL, defaults to apiConfig.apiURL
  data?: any; // The data to be sent with the request. Replace 'any' with a more specific type if possible
  method?: string; // HTTP method (e.g., "GET", "POST"), defaults to "GET"
  auth?: boolean; // Indicates whether to include an authorization token, defaults to true
  credentials?: RequestCredentials; // Credentials policy for the request, defaults to "same-origin"
  dispatch?: TypedDispatch | undefined; // Optional Redux dispatch function, requried for notifications
  hideError?: boolean; // Optional flag to hide error notifications
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
  hideError = false,
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
      if (response.status === 204) {
        return;
      }
      if (response.json === undefined) {
        return { status: response.status };
      }
      return await response.json();
    } else {
      const status = response.status;
      const error = await response.json();
      if (dispatch && typeof dispatch === "function" && !hideError) {
        dispatch(handleApiResponseErrors(error, status));
      }
      throw new Error(error.detail || "Request failed");
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
    model?: string;
    stream: boolean;
    logprobs?: boolean;
    eval?: boolean;
  };
  apiKey?: string;
  readStreamLine: (line: string) => void;
  streamingDoneCallback?: () => void;
  dispatch?: TypedDispatch | undefined;
};

export const keywordsStream = ({
  path = "api/generate/",
  host = apiConfig.apiURL, // Ensure apiConfig is defined and imported
  data,
  readStreamLine,
  streamingDoneCallback,
  apiKey,
  dispatch,
}: StreamingParams) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers["Authorization"] = `Api-Key ${apiKey}`;
  } else {
    headers["Authorization"] = `Bearer ${retrieveAccessToken()}`;
  }
  const fetchPromise = fetch(`${host}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 10000); // 10 seconds
  });

  return Promise.race([fetchPromise, timeoutPromise])
    .then(async (stream: any) => {
      if (!stream.ok) {
        const errors = await stream.json();
        if (dispatch && typeof dispatch === "function") {
          dispatch(handleApiResponseErrors(errors, stream.status));
        }
        throw new Error(JSON.stringify(errors));
      }
      const reader = stream?.body.getReader();
      const decoder = new TextDecoder();
      const abortController = new AbortController();
      const signal = abortController.signal;

      // Start reading the stream
      await (async () => {
        let count = 0;
        try {
          while (true) {
            const { done, value } = await reader.read();
            // if (value === undefined && done === true && count === 0) {
            //   throw new Error("Streaming error");
            // }
            if (done || signal.aborted) {
              streamingDoneCallback && streamingDoneCallback();
              break;
            }

            const message = decoder.decode(value);
            // Splitting the returned text chunck with the delimiter
            for (const line of message.split("---")) {
              // Line is a JSON string
              if (readStreamLine && typeof readStreamLine === "function") {
                readStreamLine(line);
              }
            }
            count++;
          }
        } catch (e) {
          throw e;
        }
      })();
      // Return a function to abort the stream from outside
      return () => {
        abortController.abort();
      };
    })
    .catch((error) => {
      throw error;
    });
};
// export const keywordsStream = ({
//   path = "api/generate/",
//   host = apiConfig.apiURL, // Ensure apiConfig is defined and imported
//   data,
//   readStreamLine,
//   streamingDoneCallback,
//   apiKey,
//   dispatch,
// }: StreamingParams) => {
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   if (apiKey) {
//     headers["Authorization"] = `Api-Key ${apiKey}`;
//   } else {
//     headers["Authorization"] = `Bearer ${retrieveAccessToken()}`;
//   }
//   // fetch("http://localhost:8000/api/generate/", {
//   return fetch(`${host}${path}`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(data),
//   }).then(async (stream: any) => {
//     if (!stream.ok) {
//       const errors = await stream.json();
//       if (dispatch && typeof dispatch === "function") {
//         dispatch(handleApiResponseErrors(errors, stream.status));
//       }
//       throw new Error("Stream response error");
//     }
//     const reader = stream?.body.getReader();
//     const decoder = new TextDecoder();
//     const abortController = new AbortController();
//     const signal = abortController.signal;

//     // Start reading the stream
//     (async () => {
//       try {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done || signal.aborted) {
//             streamingDoneCallback && streamingDoneCallback();
//             break;
//           }
//           const message = decoder.decode(value);
//           // Splitting the returned text chunck with the delimiter
//           for (const line of message.split("---")) {
//             // Line is a JSON string
//             if (readStreamLine && typeof readStreamLine === "function") {
//               readStreamLine(line);
//             }
//           }
//         }
//       } catch (e) {
//         console.error("Stream error:", e);
//       }
//     })();
//     // Return a function to abort the stream from outside
//     return () => {
//       abortController.abort();
//     };
//   });
// };

export const keywordsApiStream = ({
  path = "api/generate/",
  host = apiConfig.apiURL, // Ensure apiConfig is defined and imported
  data,
  readStreamLine,
  streamingDoneCallback,
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
            if (readStreamLine && typeof readStreamLine === "function") {
              readStreamLine(line);
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
