export const DISPATCH_NOTIFICATION = "DISPATCH_NOTIFICATION";
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";

export const dispatchNotification = (notification) => {
  return (dispatch, getState) => {
    // make async call to database
    const randomId = Math.random().toString(36).substring(2, 15);
    const completeNotification = {...notification, id: randomId}
    dispatch({ type: DISPATCH_NOTIFICATION, payload: completeNotification });
    setTimeout(() => {
      dispatch({ type: DISMISS_NOTIFICATION, payload: randomId });
    }, 4000);
  };
};

export const dismissNotification = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DISMISS_NOTIFICATION, payload: id });
  };
};