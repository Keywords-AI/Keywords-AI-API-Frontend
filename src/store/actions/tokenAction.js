import { getCookie } from "src/services/getCookie";
import apiConfig from "src/services/apiConfig";

export const refreshToken = () => {
  fetch(`${apiConfig.apiURL}auth/jwt/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    }),
    credentials: "include",
  })
    .then(async (res) => {
      if (res.status === 200) {
        const responseJson = await res.json();
        localStorage.setItem("access", responseJson.access);
      } else if (res.status === 400) {
        const responseJson = await res.json();
      }
    })
    .catch((error) => console.log(error));
};

export const validateToken = async () => {
  try {
    const res = await fetch(`${apiConfig.apiURL}auth/jwt/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        token: localStorage.getItem("access"),
      }),
    });

    if (res.status === 200) {
      return true;
    } else if (res.status === 400) {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false; // You can return whatever you want here
  }
};

export const deleteToken = () => {
  fetch(`${apiConfig.apiURL}auth/jwt/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
