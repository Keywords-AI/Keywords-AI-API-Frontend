import { keywordsFetch } from "src/services/apiConfig";
import { dispatchNotification } from "src/store/actions";
import { handleApiResponseErrors } from "src/utilities/errorHandling";
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

export const createIntegration = (data, callback = () => {}) => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/integrations/",
      data,
      method: "POST",
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const error = await response.json();
          if (error.detail) {
            dispatch(
              dispatchNotification({
                type: "error",
                title: error.detail,
              })
            );
          } else {
            handleApiResponseErrors(response, dispatchNotification);
          }
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        dispatch(
          dispatchNotification({
            title: "Integration updated",
          })
        );
        dispatch({
          type: SET_INTEGRATION,
          payload: data,
        });
        callback();
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
        dispatch(
          dispatchNotification({
            title: "Integration updated",
          })
        );
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

export const verifyKey = (data, callback = () => {}) => {
  return (dispatch) => {
    keywordsFetch({
      path: "vendor_integration/validate-api-key/",
      data,
      method: "POST",
    })
      .then(async (response) => {
        if (response.ok) {
          dispatch(
            dispatchNotification({
              title: "Key verified successfully",
            })
          );
          dispatch(createIntegration(data, callback));
          return response.json();
        } else {
          const data = await response.json();
          handleApiResponseErrors(data, dispatchNotification);
        }
      })
      .then((data) => {
        dispatch({
          type: SET_API_KEY,
          payload: data,
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
