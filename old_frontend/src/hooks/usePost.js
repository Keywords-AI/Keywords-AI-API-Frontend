import { useState } from "react";
import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";

const usePost = (path, method = "POST") => {
  // generic hook for posting data to apis
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (postData) => {
    setLoading(true);
    setError(null);
    setData(null);
    fetch(apiConfig.apiURL + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(postData),
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
