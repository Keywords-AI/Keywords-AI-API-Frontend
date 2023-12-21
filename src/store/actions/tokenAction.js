import { getCookie } from "src/services/getCookie";
import apiConfig from "src/services/apiConfig";

export const refreshToken = () => {
  const refresh = localStorage.getItem("refresh_token");
  fetch(`${apiConfig.apiURL}auth/jwt/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({
      refresh: refresh,
    }),
  })
    .then(async (res) => {
      //   if (res.status === 200) {
      //     const responseJson = await res.json();
      //     localStorage.setItem("access_token", responseJson.access);
      //   } else if (res.status === 400) {
      //     const responseJson = await res.json();
      //     console.log(responseJson);
      //   }
    })
    .catch((error) => console.log(error));
};

export const validateToken = () => {
  fetch(`${apiConfig.apiURL}auth/jwt/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("access_token"),
    }),
  })
    .then(async (res) => {
      if (res.status === 200) {
        return true;
      } else if (res.status === 400) {
        return false;
      }
    })
    .catch((error) => console.log(error));
};

export const deleteToken = () => {
  fetch(`${apiConfig.apiURL}auth/jwt/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
