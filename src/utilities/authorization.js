import { getCookie } from "src/services/getCookie";

export const retrieveAccessToken = () => {
  const token = localStorage.getItem("access_token");
  const cookieToken = getCookie("access_token");
  return token;
};
export const eraseCookie = (name, path = "/") => {
  const extractMainDomain = ".keywordsai.co";
  const domain = extractMainDomain;
  document.cookie =
    name + "=; Max-Age=-99999999; domain=" + domain + "; path=" + path;
};
