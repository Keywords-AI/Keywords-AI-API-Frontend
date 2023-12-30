import axios from "axios";
import { platformURL } from "src/utilities/platformURL";
import apiConfig, { keywordsFetch } from "src/services/apiConfig";
const apiurl = platformURL;
const genericDomain = "keywordsai.co";
const extractMainDomain =
  "." +
  (window.location.hostname.includes("keywordsai.co")
    ? genericDomain
    : apiConfig.apiURL);

const expirationDays = 7;
const bypassAuth = false;

export const isUserLoggedIn = async () => {
  if (bypassAuth) return true;
  try {
    const response = await axios.get(`${apiurl}auth/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
      timeout: 5000,
    });
    console.log("response", response);

    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async ({
  email,
  password,
  firstname,
  lastname,
  organization,
  endpoint = "auth/users/",
}) => {
  try {
    await getCSRF();
    console.log("endpoint", `${apiConfig.apiURL}${endpoint}`);
    const response = await axios.post(
      `${apiConfig.apiURL}${endpoint}`,
      {
        // const response = await axios.post(`localhost:8000/${endpoint}`, {
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
        organization,
      },
      {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        timeout: 5000,
      }
    );

    const responseData = response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out");
    } else if (
      error.code === "ERR_BAD_REQUEST" &&
      error.response.status === 400
    ) {
      if (error.response.data.email) {
        throw new Error(error.response.data.email[0]);
      } else if (error.response.data.password) {
        throw new Error(error.response.data.password[0]);
      }
    } else {
      throw error;
    }
  }
};

export const login = async (email, password) => {
  try {
    await getCSRF(); // Assuming getCSRF() is a function you've defined elsewhere

    const response = await axios.post(
      `${apiurl}auth/jwt/create/`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );
    if (response.status === 200) {
      const responseData = response.data;
      setCookie("access_token", responseData.access, expirationDays);
      setCookie("refresh_token", responseData.refresh, expirationDays);
      const nextStation = new URLSearchParams(window.location.search).get(
        "next"
      );
      return nextStation || "/platform/overview";
    }
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST" && error.response.status === 401) {
      throw new Error("Incorrect email or password.");
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out");
    }
    throw error;
  }
};

export const getCookie = (name = "csrftoken") => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const getCSRF = async () => {
  try {
    await axios.get(`${apiConfig.apiURL}csrf`, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });
  } catch (error) {
    throw error;
  }
};

function setCookie(name, value, expirationDays, domain = extractMainDomain) {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // Calculate expiration date
  const expires = "expires=" + date.toUTCString();
  console.log(
    "cookie",
    name +
      "=" +
      encodeURIComponent(value) +
      ";" +
      expires +
      ";path=/;domain=" +
      domain +
      ";secure; SameSite=Lax"
  );
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";" +
    expires +
    ";path=/;domain=" +
    domain +
    ";secure; SameSite=Lax";
}

function eraseCookie(name, path = "/") {
  const domain = extractMainDomain;
  console.log(domain);
  document.cookie =
    name + "=; Max-Age=-99999999; domain=" + domain + "; path=" + path;
}
