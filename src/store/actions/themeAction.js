// Action Types
export const SET_THEME = "SET_THEME";

// Action Creators
export const setTheme = (theme) => {
  return (dispatch) => {
    // Save theme to localStorage
    localStorage.setItem("theme", theme);

    // Dispatch the SET_THEME action
    dispatch({
      type: SET_THEME,
      payload: theme,
    });
  };
};
