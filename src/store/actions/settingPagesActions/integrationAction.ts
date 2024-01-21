import { keywordsRequest } from "src/utilities/requests";
import { dispatchNotification } from "src/store/actions";
import { TypedDispatch } from "src/types";
export const GET_VENDORS = "GET_VENDORS";
export const GET_INTEGRATIONS = "GET_INTEGRATIONS";
export const SET_API_KEY = "SET_API_KEY";
export const SET_INTEGRATION = "SET_INTEGRATION";

export const getVendors = () => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "vendor_integration/vendors",
    })
      .then((data) => {
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
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "vendor_integration/integrations",
      dispatch
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

export const createIntegration = (data, callback = () => { }) => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "vendor_integration/integrations/",
      data,
      method: "POST",
      dispatch
    })
      .then((responseJson) => {
        dispatch(
          dispatchNotification({
            title: "Integration updated",
          })
        );
        dispatch({
          type: SET_INTEGRATION,
          payload: responseJson,
        });
        callback();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
};

export const updateIntegration = (data) => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: `vendor_integration/integration/${data.integration_id}/`,
      data,
      method: "PATCH",
      dispatch
    })
      .then((responseJson) => {
        dispatch(
          dispatchNotification({
            title: "Integration updated",
          })
        );
        dispatch({
          type: SET_INTEGRATION,
          payload: responseJson,
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

export const verifyKey = (data, callback = () => { }) => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "vendor_integration/validate-api-key/",
      data,
      method: "POST",
      dispatch
    })
      .then((responseJson) => {
        dispatch(
          dispatchNotification({
            title: "Key verified successfully",
          })
        );
        dispatch(createIntegration(data, callback));
        dispatch({
          type: SET_API_KEY,
          payload: responseJson,
        });
      })
      .catch((error) => {
        dispatch(
          dispatchNotification({
            type: "error",
            title: "Key verification failed: " + error.message,
          })
        );
      });
  };
};
