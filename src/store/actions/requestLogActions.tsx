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
import { get } from "react-hook-form";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
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

const concatMessages = (
  messages: ChatMessage[] | undefined[] | undefined
): string => {
  if (messages) {
    return messages.map((message) => message?.content).join(" ");
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

export const applyPostFilters = (filters: FilterObject[]) => {
  return (dispatch: TypedDispatch) => {
    const postData = filters.reduce(
      (acc: FilterParams, filter): FilterParams => {
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
      },
      {}
    );
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
    const state = getState();
    const filters = state.requestLogs.filters;
    dispatch(applyPostFilters(filters));
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
      cost: <span className="">{`$${log.cost.toFixed(6)}`}</span>,
      allTokens: (
        <span className="">{log.completion_tokens + log.prompt_tokens}</span>
      ),
      latency: <span className="">{`${log.latency.toFixed(3)}s`}</span>, // + converts string to number
      apiKey: log.api_key,
      model: log.model,
      failed: log.failed,
      sentimentAnalysis: log.sentiment_analysis,
      status: {
        failed: log.failed,
        errorCode: log.error_code,
      },
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

export const getRequestLogs = (postData?: any) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const params = new URLSearchParams(window.location.search);
    console.log(params.toString());
    keywordsRequest({
      path: `api/request-logs${postData ? "/" : ""}?${params.toString()}`,
      method: postData ? "POST" : "GET",
      data: postData,
    }).then((data) => {
      const results = data.results;
      console.log(results?.[0]);
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

export const updateLog = (id, data) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    keywordsRequest({
      path: `api/request-log/${id}`,
      method: "PATCH",
      data: data,
    }).then((data) => {
      const updatedLogs = getState().requestLogs.logs.map((log) => {
        if (log.id === id) {
          return { ...log, ...data };
        }
        return log;
      });
      dispatch(setRequestLogs(updatedLogs));
    });
  };
};

export const setCacheResponse = (cached: boolean) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    const currentRequestLog = getState().requestLogs.selectedRequest;
    if (!currentRequestLog) {
      throw new Error("No request log selected");
    }
    const lastUserMessage = currentRequestLog.prompt_messages.findLast(
      (message) => message.role === "user"
    );
    if (!lastUserMessage) {
      throw new Error("No user message found");
    }
    if (cached) {
      //
      const body = {
        organization_key: currentRequestLog.organization_key,
        request_content: lastUserMessage.content,
        response_content: currentRequestLog.completion_message.content,
      };
      keywordsRequest({
        path: `api/caches/`,
        method: "POST",
        data: body,
      }).then((data) => {
        console.log(data);
        if (!data.id) {
          throw new Error("failed to cache");
        }
        const currentRequestLog = getState().requestLogs.selectedRequest;
        if (!currentRequestLog) {
          throw new Error("No request log selected");
        }

        dispatch(updateLog(currentRequestLog.id, { cached_response: data.id }));
      });
    } else {
      console.log("delete cache");
      keywordsRequest({
        path: `api/cache/${currentRequestLog.cached_response}`,
        method: "DELETE",
      }).then((data) => {
        dispatch(updateLog(currentRequestLog.id, { cached_response: 0 }));
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
