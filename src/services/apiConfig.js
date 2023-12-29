import { retrieveAccessToken } from "src/utilities/authorization";
const selectEndpoint = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:8000/";
  } else if (window.location.hostname === "platform-test.keywordsai.co") {
    return "https://api-test.keywordsai.co/";
  } else if (window.location.hostname === "platform.keywordsai.co") {
    return "https://api.keywordsai.co/";
  }
}

const apiConfig = {
  apiURL: selectEndpoint(), // For Raymond or anyone who has setup backend local server
  // apiURL: "https://api-test.keywordsai.co", // For anyone who doesn't have backend local server
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
}) => {
  try {
    const callBody = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    };
    if (method !== "GET") {
      callBody.body = JSON.stringify(data);
    }
    const response = await fetch(host + path, callBody);
    return response;
  } catch (error) {
    throw error;
  }
};
