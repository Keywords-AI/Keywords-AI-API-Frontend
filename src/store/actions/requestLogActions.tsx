import { keywordsRequest } from "src/utilities/requests";
import {
  TypedDispatch,
  ChatMessage,
  RawFilterOptions,
  Choice,
  FilterObject,
  CurrentFilterObject,
} from "src/types";
import {
  LogItem,
  DisplayLogItem,
  RootState,
  FilterParams,
  FilterParam,
} from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";
import { updateUser } from "./userAction";
import { SentimentTag, StatusTag } from "src/components/Misc";
import { Parser } from "@json2csv/plainjs";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const START_GET_REQUEST_LOGS = "START_GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";
export const SET_SELECTED_REQUEST = "SET_SELECTED_REQUEST";
export const SET_SIDE_PANEL_OPEN = "SET_SIDE_PANEL_OPEN";
export const SET_DISPLAY_COLUMNS = "SET_DISPLAY_COLUMNS";
export const SET_FILTER_OPEN = "SET_FILTER_OPEN";
export const SET_SECOND_FILTER = "SET_SECOND_FILTER";
export const SET_CURRENT_FILTER_TYPE = "SET_CURRENT_FILTER_TYPE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_FILTER_TYPE = "SET_FILTER_TYPE";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const SET_API_KEY = "SET_API_KEY";
export const SET_MODEL = "SET_MODEL";
export const SET_FILTER_OPTIONS = "SET_FILTER_OPTIONS";
export const ADD_FILTER = "ADD_FILTER";
export const DELETE_FILTER = "DELETE_FILTER";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const SET_CURRENT_FILTER = "SET_CURRENT_FILTER";
export const SET_SELECTED_REQUEST_CONTENT = "SET_SELECTED_REQUEST_CONTENT";
export const SET_JSON_MODE = "SET_JSON_MODE";

export const setJsonMode = (jsonMode: boolean) => {
  return {
    type: SET_JSON_MODE,
    payload: jsonMode,
  };
};
export const startGetRequestLogs = () => {
  return {
    type: START_GET_REQUEST_LOGS,
  };
};
const concatMessages = (
  messages: ChatMessage[] | undefined[] | undefined
): string => {
  if (messages) {
    return messages.map((message) => message?.content).join(" ");
  }
  return "";
};

export const setselectRequestContent = (data) => {
  return {
    type: SET_SELECTED_REQUEST_CONTENT,
    payload: data,
  };
};
const getLastUserText = (messages: ChatMessage[]): string => {
  if (messages?.length && messages.length > 0) {
    const lastMessage = messages.slice(-1)[0].content;
    if (lastMessage instanceof Array) {
      console.log("lastMessage", lastMessage);
      return lastMessage.find((part) => part.type === "text").text;
    }
    return messages.slice(-1)[0].content;
  }
  return "";
};

export const setFilterType = (filterType: keyof LogItem | undefined) => {
  return {
    type: SET_FILTER_TYPE,
    payload: filterType,
  };
};

export const setFilters = (filters: FilterObject[]) => {
  return (dispatch: TypedDispatch) => {
    dispatch({
      type: SET_FILTERS,
      payload: filters,
    });
    dispatch(applyPostFilters(filters));
  };
};

export const setCurrentFilter = (filter: CurrentFilterObject) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: SET_CURRENT_FILTER,
      payload: filter,
    });
  };
};

function processFilters(filters: FilterObject[]): FilterParams {
  return filters.reduce((acc: FilterParams, filter): FilterParams => {
    if (!(filter.value instanceof Array)) {
      filter.value = [filter.value];
    }
    var values = filter.value.map((value) => {
      if (value === "true" || value === "false") {
        value = value === "true" ? true : false;
      }
      return value;
    });
    filter.metric &&
      (acc[filter.metric] = {
        value: values,
        operator: filter.operator,
      });
    return acc;
  }, {});
}

export const applyPostFilters = (filters: FilterObject[]) => {
  return (dispatch: TypedDispatch) => {
    const postData = processFilters(filters);
    dispatch(updateUser({ request_log_filters: postData }, undefined, true));
    dispatch(getRequestLogs(postData));
  };
};

export const addFilter = (filter: FilterObject) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: ADD_FILTER,
      payload: filter,
    });
    const state = getState();
    const filters = state.requestLogs.filters;
    dispatch(applyPostFilters(filters));
  };
};

export const deleteFilter = (filterId: string) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: DELETE_FILTER,
      payload: filterId,
    });
    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
    const state = getState();
    const filters = state.requestLogs.filters;
    dispatch(applyPostFilters(filters));
  };
};

export const updateFilter = (filter: FilterObject) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filter,
    });
    if (filter.value?.length === 0) {
      dispatch(deleteFilter(filter.id));
      return;
    }
    const state = getState();
    const filters = state.requestLogs.filters;
    dispatch(applyPostFilters(filters));
  };
};

export const logColumnToDisplayLogColumn = (value: any): string => {
  const convert = {
    timestamp: "time",
    status_code: "failed",
    organization_key__name: "apiKey",
    model: "model",
    sentiment_score: "sentimentScore",
  };
  return convert[value] || value;
};

export const processGroupingTitle = (
  value: string | number,
  metric?: string
): React.ReactNode => {
  if (typeof value === "boolean") {
    return <StatusTag statusCode={value} />;
  }
  if (metric === "sentiment_score") {
    return <SentimentTag sentiment_score={value as number} showScore={false} />;
  }
  if (!metric) {
    return "Unknown";
  }
  return value;
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
        <span className="truncate">{getLastUserText(log.prompt_messages)}</span>
      ),
      response: (
        <span className="truncate">
          {concatMessages([log.completion_message])}
        </span>
      ),
      promptTokens: log.prompt_tokens,
      time_to_first_token: (
        <span className="">{`${log.time_to_first_token.toFixed(3)}s`}</span>
      ),
      outputTokens: log.completion_tokens,
      cost: <span className="">{`$${log.cost.toFixed(6)}`}</span>,
      allTokens: (
        <span className="">{log.completion_tokens + log.prompt_tokens}</span>
      ),
      latency: <span className="">{`${log.latency.toFixed(3)}s`}</span>, // + converts string to number
      apiKey: log.api_key,
      model: log.model,
      failed: log.failed,
      organizationKey: log.organization_key__name,
      sentimentAnalysis: log.sentiment_analysis,
      status: {
        failed: log.status_code >= 300 || log.status_code === 0,
        errorCode: log.status_code,
      },
      sentimentScore: log.sentiment_score,
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

export const processFilterMetricOptions = (
  filterOptions: RawFilterOptions
): Choice[] => {
  return Object.keys(filterOptions).map((key) => {
    return {
      name: filterOptions[key].display_name,
      value: key,
    };
  });
};

export const setPagination = (
  count: number,
  lastPageUrl: string,
  nextPageUrl: string,
  totalCount: number
) => {
  return {
    type: SET_PAGINATION,
    payload: { count, lastPageUrl, nextPageUrl, totalCount },
  };
};

export const setPageNumber = (page: number) => {
  return {
    type: SET_PAGINATION,
    payload: page,
  };
};

export const setSelectedRequest = (id: number | undefined) => {
  return {
    type: SET_SELECTED_REQUEST,
    payload: id,
  };
};

export const filterParamsToFilterObjects = (
  filterParams: FilterParams,
  filterOptions: RawFilterOptions
): FilterObject[] => {
  return Object.keys(filterParams).map((key): FilterObject => {
    return {
      id: Math.random().toString(36).substring(2, 15),
      metric: key as keyof LogItem,
      value_field_type: filterOptions[key].value_field_type,
      operator: filterParams[key].operator,
      value: filterParams[key].value,
      display_name: filterOptions[key].display_name,
    };
  });
};

export const getRequestLogs = (postData?: any, exporting = false) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const params = new URLSearchParams(window.location.search);
    if (postData) {
      params.set("page", "1");
    }
    dispatch(startGetRequestLogs());
    keywordsRequest({
      path: `api/request-logs${postData ? "/" : ""}?${params.toString()}`,
      method: postData ? "POST" : "GET",
      data: { filters: postData, exporting: exporting },
    }).then((data) => {
      const results = data.results;
      dispatch(
        setPagination(data.count, data.previous, data.next, data.total_count)
      );
      dispatch(setFilterOptions(data.filters_data));
      dispatch(setRequestLogs(results));
      const state = getState();
      const userFilters = state.user?.request_log_filters;
      if (!userFilters) {
        return;
      }
      const filters = filterParamsToFilterObjects(
        userFilters,
        data.filters_data
      );
      const currentFilterType = state.requestLogs.currentFilter.id;
      if (currentFilterType) {
        // If we are currently editing a filter, do no refresh the filters
        return;
      }
      dispatch({
        type: SET_FILTERS,
        payload: filters,
      });
    });
  };
};

export const updateLog = (id) => {
  console.log("id", id);
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const filters = getState().requestLogs.filters;

    // dispatch(applyPostFilters(filters)); // Refetch to trigger the update display hooks
    // dispatch(getRequestLogs());

    dispatch(
      setselectRequestContent(
        getState().requestLogs.logs.find((log) => log.id === id)
      )
    );
  };
};

export const setCacheResponse = (
  cached: boolean,
  requestIndex,
  responseContent
) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const currentRequestLog = getState().requestLogs.logs.find(
      (e) => e.id === getState().requestLogs.selectedRequest?.id
    );
    if (!currentRequestLog) {
      throw new Error("No request log selected");
    }
    const requestContent =
      currentRequestLog.prompt_messages[requestIndex - 1].content;
    if (requestContent === undefined) {
      throw new Error("No request content found");
    }
    if (cached) {
      const body = {
        request_log: currentRequestLog.id,
        request_index: requestIndex,
        organization_key: currentRequestLog.organization_key,
        request_content: requestContent,
        response_content: responseContent,
      };
      console.log("requestbody", body);
      keywordsRequest({
        path: `api/caches/`,
        method: "POST",
        data: body,
      }).then((data) => {
        const currentRequestLog = getState().requestLogs.selectedRequest;
        if (!currentRequestLog) {
          throw new Error("No request log selected");
        }
        dispatch(updateLog(currentRequestLog.id));
        return;
      });
    } else {
      const deleteId = currentRequestLog.cached_responses.find(
        (e) => e.request_index === requestIndex
      ).id;
      console.log("deleteId", deleteId);
      keywordsRequest({
        path: `api/cache/${deleteId}/`,
        method: "DELETE",
        dispatch: dispatch,
      }).then((data) => {
        dispatch(updateLog(currentRequestLog.id));
        return;
      });
    }
  };
};

export const setApiKey = (apiKey: any[]) => {
  return {
    type: SET_API_KEY,
    payload: apiKey,
  };
};

export const setModel = (model: any[]) => {
  return {
    type: SET_MODEL,
    payload: model,
  };
};

export const setFilterOptions = (filters: RawFilterOptions) => {
  return {
    type: SET_FILTER_OPTIONS,
    payload: filters,
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

export const exportLogs = (format = ".csv") => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const state = getState();
    const filters = state.requestLogs.filters;
    const filterData = processFilters(filters);
    console.log("format", format);
    keywordsRequest({
      path: `api/request-logs/`,
      method: "POST",
      data: { filters: filterData, exporting: true },
    }).then((data) => {
      let exportData: string;
      let blob: Blob;
      if (format === ".json") {
        exportData = JSON.stringify(data);
        blob = new Blob([exportData], { type: "text/json" });
      } else if (format === ".csv") {
        exportData = new Parser().parse(data);
        blob = new Blob([exportData], { type: "text/csv" });
      } else {
        throw new Error("Invalid format");
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "request_logs" + format;
      a.click();
    });
  };
};
