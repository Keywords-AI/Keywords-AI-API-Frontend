import { keywordsFetch } from "src/services/apiConfig";
import { dispatchNotification } from "./notificationAction";

export const SET_ORGANIZATION = "SET_ORGANIZATION";
export const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";

export const setOrganization = (organization) => {
  return (dispatch) => {
    dispatch({ type: SET_ORGANIZATION, payload: organization });
  };
};

export const createOrganization = (organization) => {
  return (dispatch) => {
    keywordsFetch({
      path: "organizations",
      method: "POST",
      body: organization,
    }).then((res) => {
      if (res.ok) {
        dispatch(
          dispatchNotification({ title: "Organization created successfully!" })
        );
      }
    });
  };
};
