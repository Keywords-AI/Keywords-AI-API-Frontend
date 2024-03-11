import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch, Webhook } from "src/types";
import { dispatchNotification } from "../notificationAction"; 
import React from "react";
export const CREATE_WEBHOOK = "CREATE_WEBHOOK";
export const DELETE_WEBHOOK = "DELETE_WEBHOOK";
export const EDIT_WEBHOOK = "EDIT_WEBHOOK";
export const GET_WEBHOOKS = "GET_WEBHOOKS";
export const SET_DELETEING_WEBHOOK = "SET_DELETE_WEBHOOK";
export const SET_EDITING_WEBHOOK = "SET_EDIT_WEBHOOK";

export const getWebhooks = () => {
    return async (dispatch: TypedDispatch) => {
        const responseJson = await keywordsRequest({method:"GET", path: "user/webhooks/", dispatch});
        dispatch({ type: GET_WEBHOOKS, payload: responseJson });
    };
}

export const processWebhooks = (webhooks: any, action: (webhook: any) => React.ReactNode) => {
    webhooks = webhooks ?? [];
    return webhooks.map((webhook: any) => {
        return {
            ...webhook,
            actions: action(webhook)
        }
    });
}

export const createWebhook = (webhook: any) => {
  return async (dispatch: TypedDispatch) => {
    try {
      const responseJson = await keywordsRequest({method:"POST", path: "user/webhooks/", data: webhook, dispatch});
      dispatch(dispatchNotification({ title: "Webhook created successfully!" }));
      dispatch({ type: CREATE_WEBHOOK, payload: responseJson });
    } catch (e) {
      console.error(e);
    }
  };
};

export const deleteWebhook = (webhook: Webhook) => {
    return async (dispatch: TypedDispatch) => {
        const webhookId = webhook.id;
        dispatch({ type: DELETE_WEBHOOK, payload: webhook });
        try {
            const responseJson = await keywordsRequest({method:"DELETE", path: `user/webhook/${webhookId}`, dispatch});
            dispatch(dispatchNotification({ title: "Webhook deleted successfully!" }));
        } catch (e) {
            console.error(e);
        }
    };
};

export const editWebhook = (webhook: any) => {
    return async (dispatch: TypedDispatch) => {
        const responseJson = await keywordsRequest({method:"PATCH", path: `user/webhook/${webhook.id}`, data: webhook, dispatch});
        dispatch({ type: EDIT_WEBHOOK, payload: responseJson });
    };
}

export const setEditingWebhook = (webhook: any) => {
    return (dispatch: TypedDispatch) => {
        dispatch({ type: SET_EDITING_WEBHOOK, payload: webhook });
    };
}

export const setDeletingWebhook = (webhook: any) => {
    return (dispatch: TypedDispatch) => {
        dispatch({ type: SET_DELETEING_WEBHOOK, payload: webhook });
    };
}