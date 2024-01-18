import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveAccessToken } from "src/utilities/authorization";
import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch } from "src/store/store";

// !!!!!!!!!!!!!!!! This is a redux action, dispatch it!!!!!!!!!!
export const createPaymentSession = (
  lookupKeys: string[],
  successPath = "/onboarding/get-started",
  cancelPath = "/onboarding/plans"
) => {
  // Checkout items
  /* 
  lookupKeys will be an array of strings, stripe lookup_keys for its price objects
  */
  return (dispatch: TypedDispatch) => {
    console.log("LookupKeys: ", lookupKeys);
    const body = {
      lookup_keys: lookupKeys,
      success_url: `${window.location.origin}${successPath}`,
      cancel_url: `${window.location.origin}${cancelPath}`,
    };
    keywordsRequest({
      path: `payment/create-payment-session/`,
      method: "POST",
      data: body,
      dispatch,
    })
      .then((session) => {
        window.location = session.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelSubscription = (successPath = "/") => {
  return (dispatch: Dispatch) => {
    const body = {
      success_url: `${window.location.origin}${successPath}`,
    };
    keywordsRequest({
      path: `payment/cancel-subscription/`,
      method: "POST",
      data: body,
      dispatch,
    })
      .then(() => {
        window.location.href = successPath;
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
