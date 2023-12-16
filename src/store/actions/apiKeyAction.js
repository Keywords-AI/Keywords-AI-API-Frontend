import apiConfig from "src/services/apiConfig";
import { processKeyList, processKey } from "src/utilities/objectProcessing";
export const SET_NEW_KEY_NAME = "SET_NEW_KEY_NAME";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const ADD_KEY = "ADD_KEY";
export const DELETE_KEY = "DELETE_KEY";
export const SET_DELETING_KEY = "SET_DELETING_KEY";
export const SET_EDITING_KEY = "SET_EDITING_KEY";
export const UPDATE_EDITING_KEY = "UPDATE_EDITING_KEY";

export const setNewKeyName = (name) => {
  return {
    type: SET_NEW_KEY_NAME,
    name: name,
  };
};

export const setKeyList = (keyList, actions) => {
  return {
    type: SET_KEY_LIST,
    keyList: processKeyList(keyList, actions),
  };
};

export const addKey = (key, actions) => {
  return {
    type: ADD_KEY,
    key: processKeyList([key], actions)[0],
  };
};

export const setDeletingKey = (key) => {
  return {
    type: SET_DELETING_KEY,
    key: key,
  };
};

export const deleteKey = (key) => {
  return {
    type: DELETE_KEY,
    key: key,
  };
};

export const setEditingKey = (key) => {
  return {
    type: SET_EDITING_KEY,
    key: key,
  };
};

export const updateEditingKey = (key) => {
  return {
    type: UPDATE_EDITING_KEY,
    key: key,
  };
};
