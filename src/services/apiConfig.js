const apiConfig = {
  apiURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'? 'http://127.0.0.1:8000/' : 'https://platform.keywordsai.co/',
  // apiURL: "https://platform.keywordsai.co/",
  testURL: "http://localhost:8001/",
  apiKey: "your-api-key",
  timeout: 5000,
};

export default apiConfig;
