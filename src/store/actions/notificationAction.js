import { handleSerializerErrors } from "src/utilities/errorHandling";
export const DISPATCH_NOTIFICATION = "DISPATCH_NOTIFICATION";
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const dispatchNotification = (notification) => {
  // notification: { type: "success", title: "some message" }
  return (dispatch, getState) => {
    // make async call to database
    const randomId = Math.random().toString(36).substring(2, 15);
    const completeNotification = { ...notification, id: randomId };
    dispatch({ type: DISPATCH_NOTIFICATION, payload: completeNotification });
    
    setTimeout(() => {
      dispatch({ type: DISMISS_NOTIFICATION, payload: randomId });
    }, 4000);
  };
};
export const clearNotifications = () => {
  return (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  };
};

export const dismissNotification = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DISMISS_NOTIFICATION, payload: id });
  };
};

export const handleApiResponseErrors = (
  errorJson, // Json object from the api
  status
) => {
  return (dispatch) => {
    if (errorJson.detail) {
      dispatch(
        dispatchNotification({ type: "error", title: errorJson.detail })
      ); // Regular error
      throw new Error(errorJson.detail);
    } else {
      handleSerializerErrors(errorJson, (error) =>
        dispatch(dispatchNotification({ type: "error", title: error }))
      ); // Standard error from django
      throw new Error("Serializer error");
    }
  };
};
