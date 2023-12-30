// Action Types
export const SET_THEME = "SET_THEME";

// Action Creators
export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};
