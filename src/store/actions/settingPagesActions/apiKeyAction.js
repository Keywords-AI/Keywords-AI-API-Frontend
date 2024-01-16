import { keywordsRequest } from "src/utilities/requests";
import { dispatchNotification } from "src/store/actions";
import { processKeyList, processKey } from "src/utilities/objectProcessing";
export const SET_NEW_KEY_NAME = "SET_NEW_KEY_NAME";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const ADD_KEY = "ADD_KEY";
export const DELETE_KEY = "DELETE_KEY";
export const SET_DELETING_KEY = "SET_DELETING_KEY";
export const SET_EDITING_KEY = "SET_EDITING_KEY";
export const UPDATE_EDITING_KEY = "UPDATE_EDITING_KEY";
export const CLEAR_PREV_API_KEY = "CLEAR_PREV_API_KEY";
export const SET_LOADING = "SET_LOADING";

export const setNewKeyName = (name) => {
  return {
    type: SET_NEW_KEY_NAME,
    name: name,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    loading: loading,
  };
}

export const setKeyList = (keyList) => {
  return {
    type: SET_KEY_LIST,
    keyList: keyList,
  };
};

export const getKeys = () => {
  return (dispatch) => {
    keywordsRequest({
      path: "api/get-keys",
      dispatch,
    })
      .then((data) => {
        dispatch(setKeyList(data));
      });
  };
};

export const addKey = (key, actions) => {
  return {
    type: ADD_KEY,
    key: processKeyList([key], actions)[0],
  };
};

export const createApiKey = (data, actions) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    keywordsRequest({
      path: "api/create-api-key/",
      method: "POST",
      data: data,
      dispatch,
    })
      .then((data) => {
        dispatch(setLoading(false));
        dispatch(addKey(data, actions));
        dispatch(dispatchNotification({ title: "API Key created successfully!" }));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};

export const clearPrevApiKey = () => {
  return {
    type: CLEAR_PREV_API_KEY,
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
