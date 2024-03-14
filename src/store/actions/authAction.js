import apiConfig, { keywordsFetch } from "src/services/apiConfig";
import { keywordsRequest } from "src/utilities/requests";
import { eraseCookie, getCookie, setCookie } from "src/utilities/cookies";
import { retrieveAccessToken } from "src/utilities/authorization";
import { dispatchNotification } from "./notificationAction";
import { REDIRECT_URI } from "src/utilities/navigation";
// admintestpassword
export const signup = (data = {}, code) => {
  // data = {email, first_name, last_name, password}
  const param = new URLSearchParams(window.location.search);
  return (dispatch) => {
    // Return a promise from the thunk
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    keywordsRequest({
      path: "auth/users/",
      method: "POST",
      data: data,
      auth: false,
      dispatch,
    })
      .then((responseJson) => {
        if (code) {
          console.log("code", code);
          // If user is invited, log them in
          dispatch(
            dispatchNotification({
              title: "Welcome, invited user!",
            })
          );
          dispatch(login({ ...data, code }));
        } else {
          dispatch(
            dispatchNotification({
              title: "Activation link sent, please check your email",
            })
          );
          window.location.href = "/email-confirmation" + "/" + data.email;
        }
      })
      .catch((error) => {
        // dispatch(dispatchNotification({ type: "error", title: "Sign up failed" }));
      });
  };
};
// admintestpassword
export const login = (loginData) => {
  return (dispatch) => {
    // Return a promise from the thunk
    const data = { ...loginData, username: loginData.email };
    keywordsRequest({
      path: "auth/jwt/create/",
      method: "POST",
      data: data,
      credentials: "include",
      dispatch,
    })
      .then((responseJson) => {
        localStorage.setItem("access", responseJson.access);
        localStorage.setItem("refresh", responseJson.refresh);
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("next")) {
          window.location.href = searchParams.get("next");
        } else {
          window.location.href = REDIRECT_URI; // reload to trigger the useEffect in LogIn.js
        }
      })
      .catch((error) => {
        // dispatch(dispatchNotification({ type: "error", title: error.message }));
        console.log(error);
      });
  };
};

export const logout = (
  postLogout = () => {
    window.location.href = "/login";
  }
) => {
  return (dispatch) => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    fetch(`${apiConfig.apiURL}auth/logout/`, {
      method: "POST",
    })
      .then(async (res) => {
        eraseCookie("access");
        eraseCookie("refresh");
        postLogout();
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
          if (awaitRes.detail) {
            throw new Error(awaitRes.detail);
          } else {
            throw new Error(awaitRes.toString());
          }
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
  // if (user) {
  //   return user?.id !== null && user?.id !== undefined;
  // } else {
  //   const hasAccessToken = retrieveAccessToken() ? true : false;
  //   return hasAccessToken;
  // }
  return (user?.id !== null && user?.id !== undefined) || retrieveAccessToken()
    ? true
    : false;
};

export const resetPassword = (
  email,
  handleResponse = (response) => console.log(response),
  handleError = (error) => console.log(error)
) => {
  return (dispatch) => {
    keywordsRequest({
      path: "auth/users/reset_password/",
      method: "POST",
      data: { email },
      auth: false,
    })
      .then((responseJson) => {
        dispatch(
          dispatchNotification({
            title: "Link sent to your email inbox via team@keywordsai.co",
          })
        );
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

export const resendActivationEmail = (email) => {
  return (dispatch) => {
    keywordsRequest({
      path: "auth/users/resend_activation/",
      method: "POST",
      data: { email: email },
      auth: false,
    })
      .then((jsonData) => {
        dispatch(
          dispatchNotification({
            type: "success",
            title: "The activation link has been sent to your email!",
          })
        );
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
