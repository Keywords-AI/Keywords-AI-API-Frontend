import { keywordsRequest } from "src/utilities/requests";
import { Dispatch } from "redux";
import { getDateStr } from "src/utilities/stringProcessing";
import { LogItem } from "src/types";

export const GET_REQUEST_LOGS = 'GET_REQUEST_LOGS';
export const SET_REQUEST_LOGS = 'SET_REQUEST_LOGS';


const processRequestLogs = (requestLogs: LogItem[]): LogItem[] => {
    return requestLogs.map((log: LogItem) => {
        return {
            ...log,
            timestamp: getDateStr(new Date(log.timestamp)),
            latency: +log.latency.toFixed(2), // + converts string to number
            cost: +log.cost.toFixed(6),
            status: log.failed ? 'Failed' : 'Success',
            category: log.category ? log.category : 'N/A'
        }
    });
};

export const setRequestLogs = (requestLogs: LogItem[]) => {
    return {
        type: SET_REQUEST_LOGS,
        payload: requestLogs
    }
};

export const getRequestLogs = () => {
    return (dispatch: Dispatch) => {
        keywordsRequest({
            path: 'api/request-logs'
        })
        .then((data)=> {
            dispatch(setRequestLogs(processRequestLogs(data)));
        })
    }
};