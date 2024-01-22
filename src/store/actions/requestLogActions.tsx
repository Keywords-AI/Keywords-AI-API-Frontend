import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch, ChatMessage } from "src/types";
import { LogItem, DisplayLogItem } from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";
import React from "react";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";
export const SET_SELECTED_REQUEST = "SET_SELECTED_REQUEST";

const concatMessages = (messages: ChatMessage[]): string => {
    return messages.map((message) => message.content).join(" ");
};

export const processRequestLogs = (
  requestLogs: LogItem[],
  tagGroup: (params: {
    key: string;
    model: string;
    failed: boolean;
  }) => React.ReactNode
): DisplayLogItem[] => {
  return requestLogs.map((log) => {
    return {
      id: log.id,
      time: formatISOToReadableDate(log.timestamp),
      prompt: <span className="truncate">{concatMessages(log.prompt_messages)}</span>,
      response: <span className="truncate">{concatMessages([log.completion_message])}</span>,
      cost: `$${log.cost.toFixed(6)}`,
      tokens: log.completion_tokens + log.prompt_tokens,
      latency: `${log.latency.toFixed(3)}s`, // + converts string to number
      tagGroup: tagGroup({
        key: log.api_key,
        model: log.model,
        failed: log.failed,
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

export const setSelectedRequest = (id: number | undefined) => {
  console.log(id);
  return {
    type: SET_SELECTED_REQUEST,
    payload: id,
  };
};

export const getRequestLogs = () => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "api/request-logs",
    }).then((data) => {
      console.log(data);
      dispatch(setRequestLogs(data));
    });
  };
};
