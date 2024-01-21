import { TypedDispatch } from "src/types";
import { keywordsRequest } from "src/utilities/requests";
import { StripeBillingItem, StripeSubscription, Subscription } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { processSubscription } from "src/utilities/objectProcessing";
export const SET_BILLINGS = "SET_BILLINGS";
export const GET_BILLINGS = "GET_BILLINGS";
export const SET_CURRENT_BILLING = "SET_CURRENT_BILLING";
export const SET_CURRENT_SUBSCRIPTION = "SET_CURRENT_SUBSCRIPTION";

export const getBillings = (action = () => { }) => {
  return async (dispatch: TypedDispatch) => {
    keywordsRequest({ path: "payment/paid-bills" })
      .then((responseJson) => {
        const { billings, current_billing, current_subscription } = responseJson;
        dispatch(setBillings(billings));
        dispatch(setCurrentBilling(current_billing));
        dispatch(setCurrentSubscription(current_subscription));
      })
  };
};

export const setBillings = (billingList: StripeBillingItem[]) => {
  return {
    type: SET_BILLINGS,
    payload: billingList,
  };
};

export const setCurrentBilling = (billing: StripeBillingItem) => {
  return {
    type: SET_CURRENT_BILLING,
    payload: billing,
  };
}

export const setCurrentSubscription = (subscription: StripeSubscription): PayloadAction<Subscription>  => {
  return {
    type: SET_CURRENT_SUBSCRIPTION,
    payload: processSubscription(subscription),
  };
};