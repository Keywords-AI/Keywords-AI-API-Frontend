import { keywordsFetch } from "src/services/apiConfig";
import { dispatchNotification } from "./notificationAction";
import { handleSerializerErrors } from "src/utilities/objectProcessing";

export const SET_ORGANIZATION = "SET_ORGANIZATION";
export const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";
export const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";
export const SET_ORG = "SET_ORG";
export const SET_ORG_NAME = "SET_ORG_NAME";
export const ADD_MEMBER = "ADD_MEMBER";

export const setOrg = (org) => {
  return (dispatch) => {
    dispatch({ type: SET_ORG, payload: org });
  };
};

export const setOrgName = (orgName) => {
  return (dispatch) => {
    dispatch({ type: SET_ORG_NAME, payload: orgName });
  };
};

export const addMember = (member) => {
  return (dispatch) => {
    dispatch({ type: ADD_MEMBER, payload: member });
  };
};


export const setOrganization = (organization) => {
  return (dispatch) => {
    dispatch({ type: SET_ORGANIZATION, payload: organization });
  };
};

export const createOrganization = (organization, callback = () => {}) => {
  // organization {name, organization_size}
  return (dispatch) => {
    keywordsFetch({
      path: "user/organizations/",
      method: "POST",
      data: organization,
    }).then(async (res) => {
      if (res.ok) {
        dispatch(
          dispatchNotification({ title: "Organization created successfully!" })
        );
        callback();
      } else {
        const errors = await res.json();
        if (errors.detail) {
          dispatch(
            dispatchNotification({ type: "error", title: errors.detail })
          );
        } else {
          handleSerializerErrors(errors, (err) => {
            dispatch(dispatchNotification({ type: "error", title: err }));
          });
        }
      }
    });
  };
};

export const updateOrganization = (update_fields, callback = () => {}) => {
  return (dispatch, getState) => {
    const organization = getState().organization;
    dispatch({ type: UPDATE_ORGANIZATION, payload: update_fields });
    keywordsFetch({
      path: `user/organization/${organization.id}/`,
      method: "PATCH",
      data: update_fields,
    }).then(async (res) => {
      if (res.ok) {
        dispatch(
          dispatchNotification({ title: "Organization information updated successfully!" })
        );
        callback();
      } else {
        const errors = await res.json();
        if (errors.detail) {
          dispatch(
            dispatchNotification({ type: "error", title: errors.detail })
          );
        } else {
          handleSerializerErrors(errors, (err) => {
            dispatch(dispatchNotification({ type: "error", title: err }));
          });
        }
      }
    });
  };
};
