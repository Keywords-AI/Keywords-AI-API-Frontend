import { NavigateFunction } from "react-router-dom";
export const REDIRECT_URI = "/platform";

export const setQueryParams = (
  params: { [key: string]: any },
  navigate?: NavigateFunction
) => {
  /*
  If you want to trigger a component reload, pass in navigate
  const navigate = useNavigate();
  setQueryParams({ page: 1 }, navigate);

  If you just want to update the URL without triggering a component reload,
  omit the navigate argument
  setQueryParams({ page: 1 });
  */

  // Get the current location
  const location = window.location;
  // Create a new URLSearchParams object from the current search string
  const query = new URLSearchParams(location.search);

  // Update the query parameters
  for (const [key, value] of Object.entries(params)) {
    query.set(key, value);
  }

  // Construct the new URL
  const newUrl = `${location.protocol}//${location.host}${
    location.pathname
  }?${query.toString()}`;

  // Update the URL in the browser's address bar without reloading the page
  // The first argument (state object) could be used to store information but is often left empty
  // The second argument (title) is a title for the new history entry, which is not used by most browsers
  // The third argument (url) is the new URL to be pushed into the history
  if (navigate) {
    navigate({ search: query.toString() });
  } else {
    window.history.pushState({}, "", newUrl);
  }
};

export const getQueryParam = (param: string): string | null => {
  // Get the current location
  const location = window.location;
  // Create a new URLSearchParams object from the current search string
  const query = new URLSearchParams(location.search);

  // Get the value of the specified parameter
  const value = query.get(param);

  return value;
};
