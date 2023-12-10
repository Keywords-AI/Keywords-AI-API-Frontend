import apiConfig from "src/services/apiConfig";
import { getCookie } from "src/services/getCookie";
import { retrieveConversation } from "./conversationAction";

export const register = (
  formData,
  handleResponse = (response) => console.log(response),
  handleError = (error) => console.log(error)
) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/users/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.ok) {
          const responseJson = await res.json();
          localStorage.setItem("access_token", responseJson.access);
          localStorage.setItem("refresh_token", responseJson.refresh);
          console.log(responseJson, "here is the created user");
          handleResponse(responseJson);
        } else if (res.status === 400) {
          const responseJson = await res.json();
          handleError(responseJson);
        }
      })
      .catch((error) => handleError(error));
  };
};

export const login = (
  email,
  password,
  handleError = (error) => console.log(error)
) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          const responseJson = await res.json();
          localStorage.setItem("access_token", responseJson.access);
          localStorage.setItem("refresh_token", responseJson.refresh);
          let nextStation = new URLSearchParams(window.location.search).get(
            "next"
          );
          window.location = nextStation || "/platform/overview";
        } else if (res.status === 401) {
          const responseJson = await res.json();
          handleError(responseJson);
        } else if (res.status === 400) {
          const responseJson = await res.json();
          handleError(responseJson);
        }
      })
      .catch((error) => handleError(error));
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("access_token");
    window.location = "/";
  };
};

export const googleLogin = (access_code, state, random) => {
  return (dispatch) => {
    console.log("Hi there!!");
  };
};

export const getUser = () => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}auth/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          dispatch({ type: "SET_USER", payload: data });
          dispatch(retrieveConversation(data.last_conversation));
          console.log("user", data);
        } else if (res.status === 401 && res.status == 403) {
          const data = await res.text();
          console.log(data);
          dispatch({ type: "SET_USER", payload: {} });
        }
      })
      .catch((error) => console.log(error));
  };
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
    console.log("Hi there!", uid, token);
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

export const deleteRole = (id, 
  handleSuccess=()=>{}, 
  handleError=()=>{}
  ) => {
  return (dispatch) => {
    fetch(`${apiConfig.apiURL}user/delete-role/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
}