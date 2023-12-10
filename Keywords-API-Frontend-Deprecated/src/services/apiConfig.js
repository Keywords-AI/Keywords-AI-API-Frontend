const apiConfig = {
    apiURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'? 'http://127.0.0.1:8000/' : 'https://keywordsai.co/',
    testURL: 'http://localhost:8001/',
    jingyangEndpoint: "https://keywordsai.co",
    apiKey: 'your-api-key',
    timeout: 5000,
  };

export default apiConfig;