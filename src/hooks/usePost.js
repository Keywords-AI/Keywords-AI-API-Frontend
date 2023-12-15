import { useState } from "react";
import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";

const usePost = ({ path, method = "POST", domain = apiConfig.apiURL }) => {
  // generic hook for posting data to apis
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (postData, form = false) => {
    setLoading(true);
    setError(null);
    setData(null);
    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      Authorization: `Bearer ${retrieveAccessToken()}`,
    };
    if (!form) {
      headers["Content-Type"] = "application/json";
    }
    fetch(domain + path, {
      method: method,
      headers: headers,
      body: form ? postData : JSON.stringify(postData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail);
        } else {
          const data = await response.json();
          return data;
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, error, data, postData };
};

export default usePost;
