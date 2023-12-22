import { retrieveAccessToken } from "src/utilities/authorization";

const apiConfig = {
  // apiURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'? 'http://127.0.0.1:8000/' : 'https://platform.keywordsai.co/',
  apiURL: "https://platform.keywordsai.co/",
  testURL: "http://localhost:8001/",
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
