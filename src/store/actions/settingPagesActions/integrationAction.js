import { keywordsFetch } from "src/services/apiConfig";
const localHost = "http://localhost:8000/";
export const GET_VENDORS = "GET_VENDORS";
export const GET_INTEGRATIONS = "GET_INTEGRATIONS";
export const SET_API_KEY = "SET_API_KEY";
export const SET_INTEGRATION = "SET_INTEGRATION";

export const getVendors = () => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/vendors",
      host: localHost,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        dispatch({
          type: GET_VENDORS,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const getIntegrations = () => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/integrations",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "inegration data");
        dispatch({
          type: GET_INTEGRATIONS,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const createOrUpdateIntegration = (data) => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/integrations/",
      host: localHost,
      data,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "inegration data");
        dispatch({
          type: SET_INTEGRATION,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const setApiKey = (data) => {
  return {
    type: SET_API_KEY,
    payload: data,
  };
};

export const setIntegration = (vendorName, data) => {
  return {
    type: SET_API_KEY,
    payload: data,
  };
};
