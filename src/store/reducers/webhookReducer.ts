import {
    CREATE_WEBHOOK,
    DELETE_WEBHOOK,
    EDIT_WEBHOOK,
    GET_WEBHOOKS,
    SET_DELETEING_WEBHOOK,
    SET_EDITING_WEBHOOK
} from "src/store/actions/settingPagesActions/webhookAction"
import { Webhook } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";

type WebhookState = {
    webhooks: Webhook[];
    deletingWebhook: Webhook | null;
    editingWebhook: Webhook | null;
};


const initState: WebhookState = {
    webhooks: [],
    deletingWebhook: null,
    editingWebhook: null
};

export const webhookReducer = (state = initState, action: PayloadAction<any>): WebhookState => {
    switch (action.type) {
        case CREATE_WEBHOOK:
            if (action.payload) {
                return {...state, webhooks: [...state.webhooks, action.payload]};
            }
            return state;
        case DELETE_WEBHOOK:
            return {...state, webhooks: state.webhooks.filter((webhook) => webhook.id !== action.payload.id)};

        case EDIT_WEBHOOK:
            if (action.payload) {
                return {...state, webhooks: state.webhooks.map((webhook) => webhook.id === action.payload.id ? action.payload : webhook)};
            }
            return state;
        case GET_WEBHOOKS:
            if (action.payload) {
                return {...state, webhooks: action.payload};
            }
            return state;
        case SET_DELETEING_WEBHOOK:
            console.log("dispatch set deleting webhook",action.payload);
            return {...state, deletingWebhook: action.payload};
        case SET_EDITING_WEBHOOK:
            return {...state, editingWebhook: action.payload};
        default:
            return state;
    }
}