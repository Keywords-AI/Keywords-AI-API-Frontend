import apiConfig from "src/services/apiConfig";

export function setCookie(
  name,
  value,
  expirationDays,
  domain = extractMainDomain
) {
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

export function eraseCookie(name, path = "/") {
    const domain = window.location.hostname;
    console.log(domain);
    document.cookie = name + "=; Max-Age=-99999999; domain=" + domain + "; path=" + path;
  }