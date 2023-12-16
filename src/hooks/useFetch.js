import React from "react";
import apiConfig from "src/services/apiConfig";
import { refreshToken, validateToken } from "src/store/actions/tokenAction";
import { retrieveAccessToken } from "src/utilities/authorization";

export const useFetch = ({ path, domain = apiConfig.apiURL }) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const performFetch = async () => {
    try {
      const response = await fetch(domain + path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retrieveAccessToken()}`,
        },
      });
      return response;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await performFetch();
    if (response && response.ok) {
      const data = await response.json();
      setData(data);
      setLoading(false);
    } else if (response && response.status === 401) {
      // Refresh the token
      refreshToken();
      const didRefresh = validateToken(); // Make sure this returns a boolean to indicate success
      // Retry fetching only if the token refresh was successful
      if (didRefresh) {
        const retryResponse = await performFetch();
        if (retryResponse && retryResponse.ok) {
          const data = await retryResponse.json();
          setData(data);
        }
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location = "/unauthenticated";
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [apiConfig.apiURL, path]);
  return { data, error, loading };
};

export default useFetch;
