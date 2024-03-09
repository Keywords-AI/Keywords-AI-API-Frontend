import { getCookie } from "src/services/getCookie";

export const retrieveAccessToken = () => {
  const token = localStorage.getItem("access");
  const cookieToken = getCookie("access");
  if (token) {
    return token;
  }
  return cookieToken;
};
export const eraseCookie = (name, path = "/") => {
  const extractMainDomain = ".keywordsai.co";
  const domain = extractMainDomain;
  document.cookie =
    name + "=; Max-Age=-99999999; domain=" + domain + "; path=" + path;
};

export const accessMap = (user_level, path) => {
  // user is level 1,
  // beta user is level 2,
  // admin is level3,
  // super_admin is 999
  if (user_level == 999) {
    return true;
  }
  if (!path || !user_level) return false;
  const lv1Pages = [
    "/platform/dashboard",
    "/platform/requests",
    "/platform/users",
    "/platform/api",
    "/login",
    "/signup",
    "/onboarding",
    "/unauthenticated",
    "/forgot-password",
    "/unauthorized",
    "email-confirmation",
    "/platform/doc",
  ];
  const lv2Pages = [
    "/platform/playground",
    // "/platform/chatbot",
    // "/platform/cache",
    ...lv1Pages,
  ];
  const map = {
    1: lv1Pages,
    2: [...lv1Pages, ...lv2Pages],
    3: [...lv1Pages, ...lv2Pages],
  };
  return (
    map[user_level].includes(path) ||
    map[user_level].some((p) => path.startsWith(p))
  );
};
