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
} from "src/store/actions";
import { ApiKey, ApiKeyState } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";



const initState: ApiKeyState = {
  keyList: [],
  newKey: undefined,
  editingKey: undefined,
  apiKey: "",
  deletingKey: undefined,
  loading: false,
};

export default function apiKeyReducer(state = initState, action: PayloadAction<any>): ApiKeyState {
  switch (action.type) {
    case SET_NEW_KEY_NAME:
      return {
        ...state,
        newKey: { ...state.newKey, name: action.payload } as ApiKey,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_KEY:
      const { api_key, ...secretLessKey } = action.payload;
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
          (key) => key.prefix !== action.payload?.prefix
        ),
      };
    case SET_KEY_LIST:
      return {
        ...state,
        keyList: action.payload,
      };
    case SET_EDITING_KEY:
      return {
        ...state,
        editingKey: state.keyList.find(
          (key) => key.prefix === action.payload?.prefix
        ),
      };
    case UPDATE_EDITING_KEY:
      return {
        ...state,
        keyList: state.keyList.map((key) => {
          if (key.prefix === action.payload?.prefix) return action.payload;
          return key;
        }),
      };
    case SET_DELETING_KEY:
      return {
        ...state,
        deletingKey: state.keyList.find((key) => {
          return key.prefix === action.payload?.prefix;
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
