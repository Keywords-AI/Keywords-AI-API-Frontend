import { keywordsFetch } from "src/services/apiConfig";
import { keywordsRequest } from "src/utilities/requests";
import { dispatchNotification } from "./notificationAction";
import { handleSerializerErrors } from "src/utilities/objectProcessing";
import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/utilities/cookies";
import { retrieveAccessToken } from "src/utilities/authorization";
import { TypedDispatch } from "src/types";
import { getUser } from "./userAction";
import { get } from "react-hook-form";

export const SET_ORGANIZATION = "SET_ORGANIZATION";
export const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";
export const UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION";
export const SET_ORG = "SET_ORG";
export const SET_ORG_NAME = "SET_ORG_NAME";
export const ADD_MEMBER = "ADD_MEMBER";
export const DELETE_ROLE = "DELETE_ROLE";
export const ADD_PRESET = "ADD_PRESET";
export const DELETE_PRESET = "DELETE_PRESET";
export const CHANGE_ROLE = "CHANGE_ROLE";

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
    dispatch({ type: ADD_MEMBER, payload: { member, pending: true } });
  };
};

export const createOrganization = (organization, callback = () => {}) => {
  // organization {name, organization_size}
  return (dispatch, getState) => {
    keywordsFetch({
      path: "user/organizations/",
      method: "POST",
      data: organization,
    })
      .then(async (res) => {
        if (res.ok) {
          // dispatch(
          //   dispatchNotification({
          //     title: "Organization created successfully!",
          //   })
          // );

          return res.json();
        } else {
          if (res.status === 409) {
            // Conflict: Organization already exists
            const responseJson = await res.json();
            dispatch(
              dispatchNotification({
                type: "error",
                title: responseJson.detail,
              })
            );
            callback(); // Perform the action anyway
          } else {
            const errors = await res.json();
            if (errors.detail) {
              dispatch(
                dispatchNotification({ type: "error", title: errors.detail })
              );
            } else if (errors.error) {
              dispatch(
                dispatchNotification({ type: "error", title: errors.error })
              );
            } else {
              handleSerializerErrors(errors, (err) => {
                dispatch(dispatchNotification({ type: "error", title: err }));
              });
            }
          }
        }
      })
      .then((responseJson) => {
        dispatch(setOrg({ ...responseJson }));
        dispatch(getUser());
        // dispatch(UpdateOrgSubscription("starter"));

        callback();
      });
  };
};

export const updateOrganization = (
  update_fields,
  callback = () => {},
  muteNotifications = false
) => {
  return (dispatch, getState) => {
    const organization = getState().organization;
    dispatch({ type: UPDATE_ORGANIZATION, payload: update_fields });
    keywordsRequest({
      path: `user/organization/${organization.id}/`,
      method: "PATCH",
      data: update_fields,
      dispatch,
      muteNotifications,
    }).then((responseJson) => {
      dispatch(
        dispatchNotification({
          title: "Organization information updated successfully!",
        })
      );
      callback();
    });
  };
};

export const sendInvitation = (data, callback = () => {}, resend = false) => {
  // data = {email, role, organization}
  return (dispatch) => {
    keywordsFetch({
      path: "user/invitations/create/",
      method: "POST",
      data: data,
    }).then(async (res) => {
      if (res.ok) {
        callback();
        dispatch(
          dispatchNotification({
            type: "success",
            title: "Invitation sent to " + data.email,
          })
        );
        const responseJson = await res.json();
        const payLoad = {
          email: data.email,
          ...responseJson.temp_role,
          role: responseJson.temp_role,
        };
        if (!resend) {
          // Only add member on UI if it is first time sending
          dispatch({
            type: ADD_MEMBER,
            payload: payLoad,
          });
        }
        dispatch(getUser());
      } else {
        const responseJson = await res.json();
        if (responseJson.detail) {
          // API Call errors
          dispatch(
            dispatchNotification({ type: "error", title: responseJson.detail })
          );
        } else {
          // Serializer errors
          Object.keys(responseJson).forEach((key) => {
            responseJson[key].forEach((error) => {
              dispatch(
                dispatchNotification({
                  type: "error",
                  title: `${key}: ${error}`,
                })
              );
            });
          });
        }
      }
    });
  };
};

export const acceptInvitation = (code) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}user/invitations/accept/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
      body: JSON.stringify({ code: code }),
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch(
            dispatchNotification({
              type: "success",
              title: "Invitation accepted!",
            })
          );
          window.location.href = "/platform/";
        } else if (res.status === 400) {
          const responseJson = await res.json();
          if (responseJson.detail) {
            dispatch(
              dispatchNotification({
                type: "error",
                title: responseJson.detail,
              })
            );
          } else {
            handleSerializerErrors(responseJson, (error) => {
              dispatch(dispatchNotification({ type: "error", title: error }));
            });
          }
        }
      })
      .catch((error) => {
        dispatch(
          dispatchNotification({ title: "Something went wrong", type: "error" })
        );
      });
  };
};

export const deleteRole = (id) => {
  return (dispatch) => {
    dispatch(
      dispatchNotification({
        type: "success",
        title: "Role deleted!",
      })
    );
    fetch(`${apiConfig.apiURL}user/delete-role/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch({ type: DELETE_ROLE, payload: id });
          dispatch(getUser());
        } else if (res.status === 400) {
          const responseJson = await res.json();
          dispatch(
            dispatchNotification({
              type: "error",
              title: responseJson.detail,
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };
};

export const addModelPreset = (preset) => {
  return {
    type: ADD_PRESET,
    payload: preset,
  };
};

export const createPreset = (data, callback = () => {}) => {
  return (dispatch) => {
    keywordsRequest({
      path: "user/model-presets/",
      method: "POST",
      data: data,
      dispatch,
    })
      .then((responseData) => {
        dispatch(
          dispatchNotification({
            title: "Preset created!",
          })
        );
        dispatch(addModelPreset(responseData));
        callback();
      })
      .catch((error) => {});
  };
};

export const deletePreset = (id, callback) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRESET,
      payload: id,
    });
    keywordsRequest({
      path: `user/model-preset/${id}/`,
      method: "DELETE",
      dispatch,
    })
      .then((responseData) => {
        dispatch(
          dispatchNotification({
            title: "Preset deleted!",
          })
        );
        if (callback && typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {});
  };
};

export const changeRole = (id: number, roleName: string) => {
  return (dispatch: TypedDispatch) => {
    dispatch({
      type: CHANGE_ROLE,
      payload: { id, roleName },
    });
    keywordsRequest({
      path: `user/organization-user-role/${id}/`,
      method: "PATCH",
      data: { role: roleName },
      dispatch,
    })
      .then((responseData) => {
        dispatch(getUser());
        dispatch(
          dispatchNotification({
            title: "Role changed!",
          })
        );
      })
      .catch((error) => {});
  };
};

export const UpdateOrgSubscription = (newPlan: string) => {
  return async (dispatch, getState) => {
    const id = getState().organization.organization_subscription.id;
    await keywordsRequest({
      path: `payment/organization-subscriptions/${id}/`,
      method: "PATCH",
      data: { plan: newPlan || "free" },
    });
    dispatch(getUser());
  };
};

export const updateOrgEvalOptions = (evalName: string, data: any) => {
  return async (dispatch, getState) => {
    const organization = getState().organization;
    console.log("evalName", evalName, evalName.replace("_", "-"));
    if (organization[evalName] === null) {
      await keywordsRequest({
        path: `user/${evalName.replace(/_/g, "-")}s/`,
        method: "POST",
        data: { ...data, organization: organization.id },
      });
    } else {
      // Update the organization state
      console.log(
        "path",
        `user/${evalName.replace(/_/g, "-")}/${organization[evalName].id}/`
      );
      await keywordsRequest({
        path: `user/${evalName.replace(/_/g, "-")}/${
          organization[evalName].id
        }/`,
        method: "PATCH",
        data: data,
      });
    }
    dispatch(getUser());
  };
};

export const createCustomEval = (data: any) => {
  return async (dispatch, getState) => {
    const organization = getState().organization;
    console.log("data", data);
    try {
      const response = await keywordsRequest({
        path: `user/custom_evals/`,
        method: "POST",
        data: { ...data, organization: organization.id },
        dispatch,
      });
      dispatch(
        dispatchNotification({
          title: "Custom evaluation created successfully!",
        })
      );
    } catch (error) {}
    dispatch(getUser());
  };
};

export const updateCustomEval = (data: any) => {
  return async (dispatch, getState) => {
    console.log("data", data);
    try {
      const response = await keywordsRequest({
        path: `user/custom_eval/${data.id}/`,
        method: "PATCH",
        data: data,
        dispatch,
      });
      dispatch(
        dispatchNotification({
          title: "Custom evaluation updated successfully!",
        })
      );
    } catch {}
    dispatch(getUser());
  };
};
