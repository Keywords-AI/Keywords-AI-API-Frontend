import { keywordsFetch } from "src/services/apiConfig";

export const GET_VENDORS = "GET_VENDORS";
export const GET_INTEGRATIONS = "GET_INTEGRATIONS";

export const getVendors = () => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/vendors",
      host: "http://localhost:8000/",
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
      host: "http://localhost:8000/",
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
      host: "http://localhost:8000/",
      data,
      method: "POST",
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
