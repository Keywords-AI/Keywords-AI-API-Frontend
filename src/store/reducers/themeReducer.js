// Import the action types
import { SET_THEME } from "../actions/themeAction";

// Define the initial state
const loadState = () => {
  try {
    const value = localStorage.getItem("theme");
    if (value === null) {
      return { theme: "dark" };
    }
    return { theme: value };
  } catch (err) {
    return { theme: "dark" };
  }
};
// Define the theme reducer
const themeReducer = (state = loadState(), action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
