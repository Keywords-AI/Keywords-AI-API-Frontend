import apiConfig, { keywordsFetch } from "src/services/apiConfig";
import { eraseCookie, getCookie, setCookie } from "src/utilities/cookies";
import { retrieveAccessToken } from "src/utilities/authorization";
import { dispatchNotification } from "./notificationAction";

// admintestpassword
export const signup = (data = {}) => {
  // data = {email, first_name, last_name, password}
  return (dispatch) => {
    // Return a promise from the thunk
    fetch(`${apiConfig.apiURL}auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const responseJson = await res.json();
          dispatch({ type: "REGISTER_SUCCESS", payload: responseJson }); // Dispatch a success action
          dispatch(
            dispatchNotification({
              type: "success",
              title: "Activation link sent, please check your email",
            })
          );
          window.location.href = "/email-confirmation" + "/" + data.email;
        } else {
          const responseJson = await res.json();
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
      })
      .catch((error) => {
        // dispatch(dispatchNotification({ type: "error", title: "Sign up failed" }));
      });
  };
};
// admintestpassword
export const login = (email, password) => {
  return (dispatch) => {
    // Return a promise from the thunk
    return new Promise((resolve, reject) => {
      fetch(`${apiConfig.apiURL}auth/jwt/create/`, {
        // fetch(`${apiConfig.apiURL}dj-rest-auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ email, password, username: email }),
        credentials: "include",
      })
        .then(async (res) => {
          if (res.ok) {
            // Convert Headers object to a simple key-value object
            const headers = res.headers;
            let headersObj = {};
            headers.forEach((value, key) => {
              headersObj[key] = value;
            });

            // Now headersObj is a regular object and can be converted to JSON
            const responseJson = await res.json();
            localStorage.setItem("access", responseJson.access);
            localStorage.setItem("refresh", responseJson.refresh);
            dispatch({ type: "LOGIN_SUCCESS", payload: responseJson }); // dispatch a success action
            resolve(responseJson); // Resolve the promise with response data
          } else {
            const responseJson = await res.json();
            throw new Error(responseJson.detail);
          }
        })
        .catch((error) => {
          dispatch(
            dispatchNotification({ type: "error", title: error.message })
          );
          reject(error); // Handle network errors
        });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/logout/`, {
      method: "POST",
    })
      .then(async (res) => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        eraseCookie("access");
        eraseCookie("refresh");
        window.location.href = "/login";
        dispatch(
          dispatchNotification({
            type: "success",
            title: "Logged out successfully!",
          })
        );
      })
      .catch((error) => {
        dispatch(dispatchNotification({ type: "error", title: error.message }));
      });
  };
};

export const googleLogin = () => {
  return (dispatch) => {
    // Retrieve the Google authorization URL
    console.log(apiConfig.frontendURL);
    fetch(
      `${apiConfig.apiURL}auth/o/google-oauth2/?redirect_uri=${apiConfig.frontendURL}`,
      {
        credentials: "include",
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const awaitRes = await res.json();
          throw new Error(awaitRes.detail);
        }
      })
      .then((response) => {
        console.log(response);
        if (response.authorization_url) {
          window.location.href = response.authorization_url;
        }
      })
      .catch((error) => {
        dispatch(
          dispatchNotification({
            type: "error",
            title: "Google Auth Error: " + error.message,
          })
        );
      });
  };
};

export const googleAuthJWT = () => {
  // Extract query parameters from URL
  const params = new URLSearchParams(window.location.search);

  // Set up the headers
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-CSRFToken": getCookie("csrftoken"),
  };
  // Make the POST request using axios
  fetch(`${apiConfig.apiURL}auth/o/google-oauth2/?${params}/`, {
    method: "POST",
    headers: headers,
    body: params,
    credentials: "include",
  })
    // axios.post(`${apiConfig.apiURL}auth/o/google-oauth2/?${params}/`, params, headers)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        window.location = "/platform/playground";
      } else {
        throw new Error("Sorry something went wrong, " + data.detail);
      }
    })
    .catch((error) => {
      dispatch(
        dispatchNotification({
          type: "error",
          title: "Google Auth Error: " + error.message,
        })
      );
    });
};

export const isLoggedIn = (user) => {
  return retrieveAccessToken() || (user?.id !== null && user?.id !== undefined);
};

export const resetPassword = (
  email,
  handleResponse = (response) => console.log(response),
  handleError = (error) => console.log(error)
) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/users/reset_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then(async (res) => {
        if (res.ok) {
          console.log("Hi there!");
          dispatch(
            dispatchNotification({
              type: "success",
              title: "Link sent to your email inbox via team@keywordsai.co",
            })
          );
        } else if (!res.ok) {
          const responseJson = await res.text();
          handleError(responseJson);
        }
      })
      .catch((error) => handleError(error));
  };
};

export const resetPasswordConfirm = ({
  new_password,
  re_new_password,
  uid,
  token,
  handleError = () => {},
}) => {
  return (disatch) => {
    fetch(`${apiConfig.apiURL}auth/users/reset_password_confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password,
        re_new_password,
        uid,
        token,
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
    fetch(`${apiConfig.apiURL}user/update_user_system_prompt/`, {
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
    fetch(`${apiConfig.apiURL}user/update_user_sql_prompt/`, {
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

export const activateUser = (
  uid,
  token,
  handleSuccess = () => {
    console.log("Success");
    window.location.href = "/login";
  },
  handelError = () => {}
) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/users/activation/`, {
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
    fetch(`${apiConfig.apiURL}auth/users/resend_activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch(dispatchNotification({type:"success", title:"The activation link has been sent to your email!"}));
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
    fetch(`${apiConfig.apiURL}user/all-users`, {
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
