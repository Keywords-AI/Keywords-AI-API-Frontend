import {
  SET_NEW_KEY_NAME,
  ADD_KEY,
  DELETE_KEY,
  SET_KEY_LIST,
} from "../actions/apiKeyAction";

const initState = {
  apiKeyList: [],
  newKey: { name: "", apiKey: "" },
};

export default function apiKeyReducer(state = initState, action) {
  switch (action.type) {
    case SET_NEW_KEY_NAME:
      return {
        ...state,
        newKey: { ...state.newKey, name: action.name },
      };
    case ADD_KEY:
      return {
        ...state,
        apiKeyList: [...state.apiKeyList, action.key],
      };
    case DELETE_KEY:
      return {
        ...state,
        apiKeyList: state.apiKeyList.filter((key) => key.id !== action.id),
      };
    default:
      return state;
  }
}
