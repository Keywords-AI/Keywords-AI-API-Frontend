import { keywordsRequest } from "src/utilities/requests";
import {
  TypedDispatch,
  ChatMessage,
  RawFilterOptions,
  Choice,
  FilterObject,
} from "src/types";
import {
  LogItem,
  DisplayLogItem,
  RootState,
  FilterParams,
  FilterParam,
} from "src/types";
import { formatISOToReadableDate } from "src/utilities/stringProcessing";

export const GET_REQUEST_LOGS = "GET_REQUEST_LOGS";
export const SET_REQUEST_LOGS = "SET_REQUEST_LOGS";
export const SET_SELECTED_REQUEST = "SET_SELECTED_REQUEST";
export const SET_SIDE_PANEL_OPEN = "SET_SIDE_PANEL_OPEN";
export const SET_DISPLAY_COLUMNS = "SET_DISPLAY_COLUMNS";
export const SET_FILTER_OPEN = "SET_FILTER_OPEN";
export const SET_SECOND_FILTER = "SET_SECOND_FILTER";
export const SET_FIRST_FILTER = "SET_FIRST_FILTER";
export const SET_FILTERS = "SET_FILTERS";
export const SET_CURRENT_FILTER = "SET_CURRENT_FILTER";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const SET_API_KEY = "SET_API_KEY";
export const SET_MODEL = "SET_MODEL";
export const SET_FILTER_OPTIONS = "SET_FILTER_OPTIONS";
export const ADD_FILTER = "ADD_FILTER";
export const DELETE_FILTER = "DELETE_FILTER";
export const UPDATE_FILTER = "UPDATE_FILTER";

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

export const setFilters = (filters: any) => {
  return (dispatch: TypedDispatch) => {
    dispatch({
      type: SET_FILTERS,
      payload: filters,
    });
    dispatch(applyPostFilters(filters));
  };
};

export const setCurrentFilter = (filter: any) => {
  return {
    type: SET_CURRENT_FILTER,
    payload: filter,
  };
};

export const applyPostFilters = (filters: FilterObject[]) => {
  return (dispatch: TypedDispatch) => {
    const postData = filters.reduce((acc: FilterParams, filter): FilterParams => {
      filter.metric &&
        (acc[filter.metric] = {
          value: filter.value,
          operator: filter.operator,
        });
      return acc;
    }, {});
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
  }
};

export const updateFilter = (filter: any) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: UPDATE_FILTER,
      payload: filter,
    });
    const state = getState();
    const filters = state.requestLogs.filters;
    console.log(filter, filters)
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

export const getRequestLogs = (postData?: any) => {
  return (dispatch: TypedDispatch) => {
    const params = new URLSearchParams(window.location.search);
    keywordsRequest({
      path: `api/request-logs${postData ? "/" : ""}?${params.toString()}`,
      method: postData ? "POST" : "GET",
      data: postData,
    }).then((data) => {
      const results = data.results;
      const keys = data.aggregation_data;
      // console.log(data);
      dispatch(setPagination(data.count, data.previous, data.next, data.total_count));
      dispatch(setFilterOptions(data.filters_data));
      dispatch(setRequestLogs(results));
      dispatch(setApiKey(keys.key_list));
      dispatch(setModel(keys.model_list));
    });
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
