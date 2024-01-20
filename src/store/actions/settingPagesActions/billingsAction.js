import { keywordsFetch } from "src/services/apiConfig";
export const SET_BILLINGS = "SET_BILLINGS";
export const GET_BILLINGS = "GET_BILLINGS";

export const SET_CURRENT_SUBSCRIPTION = "SET_CURRENT_SUBSCRIPTION";

export const getBillings = (action = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await keywordsFetch({ path: "payment/paid-bills" });
      if (response.ok) {
        const data = await response.json();
        const { billings, current_subscription } = data;
        dispatch(setBillings(billings));
        dispatch(setCurrentSubscription(current_subscription));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setBillings = (billingList) => {
  return {
    type: SET_BILLINGS,
    payload: billingList,
  };
};

export const setCurrentSubscription = (subscription) => {
  return {
    type: SET_CURRENT_SUBSCRIPTION,
    payload: subscription,
  };
}