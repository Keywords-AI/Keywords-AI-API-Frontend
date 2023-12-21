import { keywordsFetch } from "src/services/apiConfig";
export const SET_BILLINGS = "SET_BILLINGS";
export const GET_BILLINGS = "GET_BILLINGS";

export const getBillings = (action = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await keywordsFetch({ path: "payment/paid-bills" });
      if (response.ok) {
        const data = await response.json();
        dispatch(setBillings(data));
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
