import apiConfig, { keywordsFetch } from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
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
      fetch(`${apiConfig.apiURL}auth/users/`, {
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
      // fetch(`${apiConfig.apiURL}auth/jwt/create/`, {
      fetch(`${apiConfig.apiURL}dj-rest-auth/login/`, {
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
            console.log(JSON.stringify(headersObj, null, 2));
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
    localStorage.removeItem("access_token");
    eraseCookie("access_token");
    window.location = "/";
  };
};

export const googleLogin = async () => {
  // Retrieve the Google authorization URL
  fetch(
    `${apiConfig.apiURL}auth/o/google-oauth2/?redirect_uri=${apiConfig.frontendURL}`,
    {
      credentials: "include",
    }
  )
    .then((res) => res.json())
    .then((response) => {
      window.location.href = response.authorization_url;
    });
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
      console.log(data);
      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        window.location = "/platform/playground";
      }
    })
    .catch((error) => {
      console.error("Error in Google Auth JWT:", error);
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
    fetch(`${apiConfig.apiURL}auth/users/reset_password_confirm/`, {
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

export const activateUser = (uid, token, handleSuccess, handelError) => {
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
