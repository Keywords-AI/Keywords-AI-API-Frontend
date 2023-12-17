import { platformURL } from "src/utilities/platformURL";
import { getCookie } from "src/services/getCookie";
import { retrieveConversation } from "./conversationAction";
import { eraseCookie, retrieveAccessToken } from "src/utilities/authorization";

export const register = (
  email,
  password,
  firstname,
  lastname,
  organization
) => {
  return (dispatch) => {
    // Return a promise from the thunk
    return new Promise((resolve, reject) => {
      fetch(`${platformURL}auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: firstname,
          last_name: lastname,
          organization: organization,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const responseJson = await res.json();
            localStorage.setItem("access_token", responseJson.access);
            localStorage.setItem("refresh_token", responseJson.refresh);
            dispatch({ type: "REGISTER_SUCCESS", payload: responseJson }); // Dispatch a success action
            resolve(responseJson); // Resolve the promise with response data
          } else {
            const responseJson = await res.json();
            reject(responseJson); // Reject the promise with the error object
          }
        })
        .catch((error) => {
          reject(error); // Handle network errors
        });
    });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    // Return a promise from the thunk
    return new Promise((resolve, reject) => {
      fetch(`${platformURL}auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (res) => {
          if (res.ok) {
            const responseJson = await res.json();
            localStorage.setItem("access_token", responseJson.access);
            localStorage.setItem("refresh_token", responseJson.refresh);
            dispatch({ type: "LOGIN_SUCCESS", payload: responseJson }); // dispatch a success action
            resolve(responseJson); // Resolve the promise with response data
          } else {
            const responseJson = await res.json();
            reject(responseJson); // Reject the promise with the error object
          }
        })
        .catch((error) => {
          reject(error); // Handle network errors
        });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    console.log("logout");
    localStorage.removeItem("access_token");
    eraseCookie("access_token");
    window.location = "/";
  };
};

export const googleLogin = (access_code, state, random) => {
  return (dispatch) => {
    console.log("Hi there!!");
  };
};

export const isLoggedIn = (user) => {
  return user?.id || retrieveAccessToken();
};

export const resetPassword = (
  email,
  handleResponse = (response) => console.log(response),
  handleError = (error) => console.log(error)
) => {
  return (dispatch) => {
    fetch(`${platformURL}auth/users/reset_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log("Hi there!");
          handleResponse(
            "Link sent to your email inbox via thekeywordsai@gmail.com. "
          );
        } else if (!res.ok) {
          const responseJson = await res.text();
          handleError(responseJson);
        }
      })
      .catch((error) => handleError(error));
  };
};

export const resetPasswordConfirm = (
  password,
  rePassword,
  uid,
  token,
  handleError = () => {}
) => {
  return (disatch) => {
    fetch(`${platformURL}auth/users/reset_password_confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password: password,
        re_new_password: rePassword,
        uid: uid,
        token: token,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log("SUCCESS");
          window.location = "/login";
        } else if (res.status === 400) {
          const responseJson = await res.json();
          handleError(responseJson);
          window.location = "/login";
        }
      })
      .catch((error) => handleError(error));
  };
};

export const loadingFileUpload = () => {
  return (dispatch) => {
    dispatch({ type: "FILE_UPLOAD" });
  };
};

export const updateSystemPrompt = (promptAndActive) => {
  return (dispatch) => {
    fetch(`${platformURL}user/update_user_system_prompt/`, {
      headers: {
        Authorization: `Bearer ${retrieveAccessToken()}`,
        "X-CSRFToken": getCookie("csrftoken"),
      },
      method: "PATCH",
      body: promptAndActive,
    })
      .then(async (res) => {
        if (res.ok) {
          try {
            const data = await res.json();
            dispatch({ type: "SET_USER", payload: data });
            dispatch({ type: "NOT_FILE_UPLOAD" });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(await res.text());
        }
      })
      .catch((error) => console.log(error));
  };
};

export const updateUserSQLPrompt = (promptAndActive) => {
  return (dispatch) => {
    fetch(`${platformURL}user/update_user_sql_prompt/`, {
      headers: {
        Authorization: `Bearer ${retrieveAccessToken()}`,
        "X-CSRFToken": getCookie("csrftoken"),
      },
      method: "PATCH",
      body: promptAndActive,
    })
      .then(async (res) => {
        if (res.ok) {
          try {
            const data = await res.json();
            dispatch({ type: "SET_USER", payload: data });
            dispatch({ type: "NOT_FILE_UPLOAD" });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(await res.text());
        }
      })
      .catch((error) => console.log(error));
  };
};

export const activateUser = (uid, token, handleSuccess, handelError) => {
  return (dispatch) => {
    fetch(`${platformURL}auth/users/activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, token }),
    })
      .then(async (res) => {
        if (res.ok) {
          handleSuccess();
        } else {
          const responseJson = await res.json();
          handelError(responseJson);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const resendActivationEmail = (email, handleSuccess, handleError) => {
  return (dispatch) => {
    fetch(`${platformURL}auth/users/resend_activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then(async (res) => {
        if (res.ok) {
          handleSuccess("The activation link has been sent to your email!");
        } else if (res.status === 400) {
          const responseJson = await res.text();
          handleError(responseJson);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const acceptInvitation = (code, handleSuccess, handleError) => {
  return (dispatch) => {
    fetch(`${platformURL}user/invitations/accept/`, {
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
          handleSuccess("Accepted invitation successfully!");
        } else if (res.status === 400) {
          const responseJson = await res.text();
          handleError(responseJson);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const deleteRole = (
  id,
  handleSuccess = () => {},
  handleError = () => {}
) => {
  return (dispatch) => {
    fetch(`${platformURL}user/delete-role/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          handleSuccess("Deleted role successfully!");
        } else if (res.status === 400) {
          const responseJson = await res.text();
          handleError(responseJson);
        }
      })
      .catch((error) => console.log(error));
  };
};

export const saveAllUsers = () => {
  return (dispatch) => {
    fetch(`${platformURL}user/all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${retrieveAccessToken()}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
        } else {
          console.log(await res.text());
        }
      })
      .catch((error) => console.log(error));
  };
};
