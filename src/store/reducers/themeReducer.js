// Import the action types
import { SET_THEME } from "../actions/themeAction";

// Define the initial state
const initialState = {
  theme: "dark",
};

// Define the theme reducer
const themeReducer = (state = initialState, action) => {
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
