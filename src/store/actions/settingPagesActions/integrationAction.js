import { keywordsFetch } from "src/services/apiConfig";
import { dispatchNotification } from "src/store/actions";
import { handleApiResponseErrors } from "src/utilities/errorHandling";
const localHost = "http://localhost:8000/";
export const GET_VENDORS = "GET_VENDORS";
export const GET_INTEGRATIONS = "GET_INTEGRATIONS";
export const SET_API_KEY = "SET_API_KEY";
export const SET_INTEGRATION = "SET_INTEGRATION";

export const getVendors = () => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/vendors",
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          handleApiResponseErrors(response, dispatchNotification);
        }
      })
      .then((data) => {
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

export const createIntegration = (data) => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/integrations/",
      data,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(dispatchNotification({
          title: "Integration updated"
        }));
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

export const updateIntegration = (data) => {
  return (dispatch) => {
    keywordsFetch({
      path: `vendor_integration/integration/${data.integration_id}/`,
      data,
      method: "PATCH",
      dispatch: dispatch,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(dispatchNotification({
          title: "Integration updated"
        }));
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

export const verifyKey = (data) => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/verify_key/",
      data,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(dispatchNotification({
          title: "Key verified successfully"
        }));
        dispatch({
          type: SET_API_KEY,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
}