import { keywordsRequest } from "src/utilities/requests";
import { TypedDispatch, ChatMessage } from "src/types";
import { LogItem, DisplayLogItem } from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";
import React from "react";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";
export const SET_SELECTED_REQUEST = "SET_SELECTED_REQUEST";
export const SET_SIDE_PANEL_OPEN = "SET_SIDE_PANEL_OPEN";
export const SET_DISPLAY_COLUMNS = "SET_DISPLAY_COLUMNS";
export const SET_FILTER_OPEN = "SET_FILTER_OPEN";
export const SET_SECOND_FILTER = "SET_SECOND_FILTER";
export const SET_FIRST_FILTER = "SET_FIRST_FILTER";
export const SET_FILTERS = "SET_FILTERS";
// export const SET_CURRENT_FILTER = "SET_CURRENT_FILTER";
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

export const setFirstFilter = (filter: string) => {
  return {
    type: SET_FIRST_FILTER,
    payload: filter,
  };
};

export const setFilters = (filter: any) => {
  return {
    type: SET_FILTERS,
    payload: filter,
  };
};

// export const setCurrentFilter = (filter: any) => {
//   return {
//     type: SET_CURRENT_FILTER,
//     payload: filter,
//   };
// };

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
  nextPageUrl: string,
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
}


export const setSelectedRequest = (id: number | undefined) => {
  console.log(id);
  return {
    type: SET_SELECTED_REQUEST,
    payload: id,
  };
};

export const getRequestLogs = () => {
  return (dispatch: TypedDispatch) => {
    const params = new URLSearchParams(window.location.search);
    keywordsRequest({
      path: `api/request-logs?${params.toString()}`,
    }).then((data) => {
      const results = data.results;
      dispatch(
        setPagination(
          data.count,
          data.next,
          data.previous
        )
      );
      dispatch(setRequestLogs(results));
    });
  };
};

export const setFilterOpen = (open: boolean) => {
  return {
    type: SET_FILTER_OPEN,
    payload: open,
  };
};

export const setSecondFilter = (filter: string) => {
  return {
    type: SET_SECOND_FILTER,
    payload: filter,
  };
};
