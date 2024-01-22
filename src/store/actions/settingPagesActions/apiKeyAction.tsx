import { keywordsRequest } from "src/utilities/requests";
import { dispatchNotification } from "src/store/actions";
import { ApiKey, DisplayApiKey } from "src/types";
import { getDateStr } from "src/utilities/stringProcessing";
import { TypedDispatch } from "src/types";
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
  key: ApiKey,
  renderKey = (keyName: string, keyPrefix: string): React.ReactNode => {
    return <></>;
  },
  actions = (key: ApiKey, active: boolean): React.ReactNode => {
    return <></>;
  },
  Models = (models: string[]): React.ReactNode => {
    return <></>;
  }
): DisplayApiKey => {
  const today = new Date();
  const expireDate = isNaN(new Date(key.expiry_date).getTime())
    ? "Infinite"
    : new Date(key.expiry_date);
  // const expireDate = new Date(new Date().setDate(new Date().getDate() - 1));  // for testing expired key

  let active = true;
  if (expireDate === "Infinite") {
    active = true;
  } else if (expireDate < today) {
    active = false;
  }
  return {
    ...key,
    key: renderKey(key.name, key.prefix),
    created: getDateStr(key.created),
    last_used: getDateStr(key.last_used),
    actions: actions(key, active),
    models: Models(key.preset_models),
    mod_prefix: key.prefix.slice(0, 3) + "...",
  };
};

export const processKeyList = (
  keyList: ApiKey[],
  renderKey = (keyName: string, keyPrefix: string): React.ReactNode => {
    return <></>;
  },
  actions = (key: ApiKey, active: boolean): React.ReactNode => {
    return <></>;
  },
  Models = (models: string[]): React.ReactNode => {
    return <></>;
  }
): DisplayApiKey[] => {
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
    return processKey(key, renderKey, actions, Models);
  });
};

export const setNewKeyName = (name) => {
  return {
    type: SET_NEW_KEY_NAME,
    payload: name,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};

export const setKeyList = (keyList) => {
  return {
    type: SET_KEY_LIST,
    payload: keyList,
  };
};

export const getKeys = () => {
  return (dispatch) => {
    keywordsRequest({
      path: "api/get-keys",
      dispatch,
    }).then((data) => {
      dispatch(setKeyList(data));
    });
  };
};

export const addKey = (key) => {
  return {
    type: ADD_KEY,
    // No need to add actions here, setPrevKey (in ApiKeyPage) will get triggered once list is updated
    payload: processKeyList([key])[0],
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
        dispatch(
          dispatchNotification({ title: "API Key created successfully!" })
        );
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
    payload: key,
  };
};

export const deleteKey = (key) => {
  return {
    type: DELETE_KEY,
    payload: key,
  };
};

export const setEditingKey = (key) => {
  return {
    type: SET_EDITING_KEY,
    payload: key,
  };
};

export const updateEditingKey = (keyData: ApiKey) => {
  return (dispatch: TypedDispatch) => {
    dispatch({
      type: UPDATE_EDITING_KEY,
      payload: keyData,
    });
    keywordsRequest({
      path: `api/update-key/${keyData?.prefix}/`,
      data: keyData,
      method: "PATCH",
    })
      .then((data: any) => {
        dispatch(
          dispatchNotification({ title: "API Key updated successfully!" })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
