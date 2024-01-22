import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch, ChatMessage } from "src/types";
import { getDateStr } from "src/utilities/stringProcessing";
import { LogItem, DisplayLogItem } from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";
import React from "react";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";

const concatMessages = (messages: ChatMessage[]): string => {
    return messages.map((message) => message.content).join(" ");
};

export const processRequestLogs = (
  requestLogs: LogItem[],
  tagGroup: (params: {
    key: string;
    model: string;
    status: string;
  }) => React.ReactNode
): DisplayLogItem[] => {
  return requestLogs.map((log) => {
    return {
      time: formatISOToReadableDate(log.timestamp),
      prompt: concatMessages(log.prompt_messages),
      response: concatMessages([log.completion_message]),
      cost: `$${log.cost.toFixed(6)}`,
      tokens: log.completion_tokens + log.prompt_tokens,
      latency: `${log.latency.toFixed(3)} s`, // + converts string to number
      tagGroup: tagGroup({
        key: log.api_key,
        model: log.model,
        status: log.status,
      })
    };
  });
};

export const setRequestLogs = (requestLogs: LogItem[]) => {
  return {
    type: SET_REQUEST_LOGS,
    payload: requestLogs,
  };
};

export const getRequestLogs = () => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "api/request-logs",
    }).then((data) => {
      dispatch(setRequestLogs(data));
    });
  };
};
