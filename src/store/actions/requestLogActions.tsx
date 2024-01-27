import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch, ChatMessage } from "src/types";
import { LogItem, DisplayLogItem } from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";
import React from "react";
import { createDropdownMenuScope } from "@radix-ui/react-dropdown-menu";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";
export const SET_SELECTED_REQUEST = "SET_SELECTED_REQUEST";
export const SET_SIDE_PANEL_OPEN = "SET_SIDE_PANEL_OPEN";
export const SET_DISPLAY_COLUMNS = "SET_DISPLAY_COLUMNS";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";

const concatMessages = (
  messages: ChatMessage[] | undefined[] | undefined
): string => {
  if (messages) {
    return messages.map((message) => message?.content).join(" ");
  }
  return "";
};

export const setFilter = (filter: string) => {
  return {
    type: SET_REQUEST_LOGS,
    payload: filter,
  };
};

export const processRequestLogs = (
  requestLogs: LogItem[]
): DisplayLogItem[] => {
  return requestLogs.map((log) => {
    return {
      id: log.id,
      time: (
        <span className="text-gray-4">
          {formatISOToReadableDate(log.timestamp)}
        </span>
      ),
      prompt: (
        <span className="truncate">{concatMessages(log.prompt_messages)}</span>
      ),
      response: (
        <span className="truncate">
          {concatMessages([log.completion_message])}
        </span>
      ),
      promptTokens: log.prompt_tokens,
      outputTokens: log.completion_tokens,
      cost: `$${log.cost.toFixed(6)}`,
      allTokens: log.completion_tokens + log.prompt_tokens,
      latency: `${log.latency.toFixed(3)}s`, // + converts string to number
      apiKey: log.api_key,
      model: log.model,
      failed: log.failed,
      sentimentAnalysis: log.sentiment_analysis,
    };
  });
};

export const setDisplayColumns = (columns: string[]) => {
  return {
    type: SET_DISPLAY_COLUMNS,
    payload: columns,
  };
};

export const setSidePanelOpen = (open: boolean) => {
  return {
    type: SET_SIDE_PANEL_OPEN,
    payload: open,
  };
};

export const setRequestLogs = (requestLogs: LogItem[]) => {
  return {
    type: SET_REQUEST_LOGS,
    payload: requestLogs,
  };
};

export const setPagination = (
  count: number,
  lastPageUrl: string,
  nextPageUrl: string
) => {
  return {
    type: SET_PAGINATION,
    payload: { count, lastPageUrl, nextPageUrl },
  };
};

export const setPageNumber = (page: number) => {
  return {
    type: SET_PAGINATION,
    payload: page,
  };
};

export const setSelectedRequest = (id: number | undefined) => {
  console.log(id);
  return {
    type: SET_SELECTED_REQUEST,
    payload: id,
  };
};

export const getRequestLogs = (postData?: any) => {
  return (dispatch: TypedDispatch) => {
    const params = new URLSearchParams(window.location.search);
    keywordsRequest({
      path: `api/request-logs${postData? "/":""}?${params.toString()}`,
      method: postData? "POST" : "GET",
      data: postData,
    }).then((data) => {
      const results = data.results;
      console.log(data)
      dispatch(setPagination(data.count, data.previous, data.next));
      dispatch(setRequestLogs(results));
    });
  };
};
