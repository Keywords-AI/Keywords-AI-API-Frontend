import { keywordsRequest } from "src/utilities/requests";
import { Dispatch } from "redux";

export const GET_REQUEST_LOGS = 'GET_REQUEST_LOGS';
export const SET_REQUEST_LOGS = 'SET_REQUEST_LOGS';

export const setRequestLogs = (requestLogs: any) => {
    return {
        type: SET_REQUEST_LOGS,
        payload: requestLogs
    }
};

export const getRequestLogs = () => {
    return (dispatch: Dispatch) => {
        keywordsRequest({
            path: 'request-logs'
        })
        .then((data)=> {
            dispatch(setRequestLogs(data));
        })
    }
};