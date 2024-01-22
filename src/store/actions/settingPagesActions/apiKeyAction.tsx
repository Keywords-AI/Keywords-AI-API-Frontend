import { keywordsRequest } from "src/utilities/requests";
import { dispatchNotification } from "src/store/actions";
import { ApiKey } from "src/types";
import { getDateStr } from "src/utilities/stringProcessing";
import React from "react";
export const SET_NEW_KEY_NAME = "SET_NEW_KEY_NAME";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const ADD_KEY = "ADD_KEY";
export const DELETE_KEY = "DELETE_KEY";
export const SET_DELETING_KEY = "SET_DELETING_KEY";
export const SET_EDITING_KEY = "SET_EDITING_KEY";
export const UPDATE_EDITING_KEY = "UPDATE_EDITING_KEY";
export const CLEAR_PREV_API_KEY = "CLEAR_PREV_API_KEY";
export const SET_LOADING = "SET_LOADING";

export const processKey = (
  key: any,
  actions = (key: any): React.ReactNode => { return <></> },
  renderStatus = (status: any): React.ReactNode => { return <></> }
) => {
  const today = new Date();
  const expireDate = isNaN(new Date(key.expire_date).getTime())
    ? "Infinite"
    : new Date(key.expire_date);
  // const expireDate = new Date(new Date().setDate(new Date().getDate() - 1));  // for testing expired key

  let status = "Active";
  if (expireDate === "Infinite") {
    status = "Active";
  } else if (expireDate < today) {
    status = "Expired";
  }
  return {
    ...key,
    created: getDateStr(key.created),
    last_used: getDateStr(key.last_used),
    Status: renderStatus(status),
    actions: actions(key),
    mod_prefix: key.prefix.slice(0, 3) + "...",
  };
};

export const processKeyList = (
  keyList: ApiKey[],
  actions = (key: any): React.ReactNode => { return <></> },
  renderStatus = (status: any): React.ReactNode => { return <></> }
) => {
  /*
  keyList: [{
    prefix: 1,
    name: "key1",
    created: "2020-01-01T00:00:00.000Z",
    last_used: "2020-01-01T00:00:00.000Z",
  }]
  actions: callback function (prefix) => { some actions with the prefix }
  */
  if (!keyList || !keyList.length) return [];
  return keyList.map((key) => {
    return processKey(key, actions, renderStatus);
  });
};

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

export const addKey = (key) => {
  return {
    type: ADD_KEY,
    // No need to add actions here, setPrevKey (in ApiKeyPage) will get triggered once list is updated
    key: processKeyList([key])[0],
  };
};

export const createApiKey = (data) => {
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
        dispatch(addKey(data));
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
