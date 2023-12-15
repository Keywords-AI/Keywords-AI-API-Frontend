export const SET_NEW_KEY_NAME = "SET_NEW_KEY_NAME";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const ADD_KEY = "ADD_KEY";
export const DELETE_KEY = "DELETE_KEY";

export const setNewKeyName = (name) => {
  return {
    type: SET_NEW_KEY_NAME,
    name: name,
  };
};

export const setKeyList = (keyList) => {
  return {
    type: SET_KEY_LIST,
    keyList: keyList,
  };
};

export const addKey = (key) => {
  return {
    type: SET_KEY_LIST,
    key: key,
  };
};

export const deleteKey = (id) => {
  return {
    type: DELETE_KEY,
    id: id,
  };
};
