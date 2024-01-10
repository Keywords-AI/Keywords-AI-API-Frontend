import {
  SET_NEW_KEY_NAME,
  ADD_KEY,
  DELETE_KEY,
  SET_KEY_LIST,
  SET_EDITING_KEY,
  UPDATE_EDITING_KEY,
  SET_DELETING_KEY,
  CLEAR_PREV_API_KEY,
  SET_LOADING,
} from "../../actions/settingPagesActions/apiKeyAction";

const initState = {
  keyList: [],
  newKey: { name: "" },
  editingKey: null,
  apiKey: "",
  deletingKey: null,
  loading: false,
};

export default function apiKeyReducer(state = initState, action) {
  switch (action.type) {
    case SET_NEW_KEY_NAME:
      return {
        ...state,
        newKey: { ...state.newKey, name: action.name },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ADD_KEY:
      const { api_key, ...secretLessKey } = action.key;
      console.log(api_key)
      return {
        ...state,
        keyList: [...state.keyList, secretLessKey],
        newKey: secretLessKey,
        apiKey: api_key,
      };
    case DELETE_KEY:
      return {
        ...state,
        keyList: state.keyList.filter(
          (key) => key.prefix !== action.key?.prefix
        ),
      };
    case SET_KEY_LIST:
      return {
        ...state,
        keyList: action.keyList,
      };
    case SET_EDITING_KEY:
      return {
        ...state,
        editingKey: state.keyList.find(
          (key) => key.prefix === action.key?.prefix
        ),
      };
    case UPDATE_EDITING_KEY:
      return {
        ...state,
        keyList: state.keyList.map((key) => {
          if (key.prefix === action.key?.prefix) return action.key;
          return key;
        }),
      };
    case SET_DELETING_KEY:
      return {
        ...state,
        deletingKey: state.keyList.find((key) => {
          return key.prefix === action.key?.prefix;
        }),
      };
    case CLEAR_PREV_API_KEY:
      return {
        ...state,
        apiKey: "",
      };
    default:
      return state;
  }
}
