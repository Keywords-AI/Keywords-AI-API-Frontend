import {
  TypedDispatch,
  RootState,
  LogItem,
  FilterObject,
  CurrentFilterObject,
  FilterParams,
} from "src/types";
import { keywordsRequest } from "src/utilities/requests";
import { Parser } from "@json2csv/plainjs";
import { set } from "react-hook-form";
import { updateUser } from "./userAction";

export const SET_USERS_LOG_DATA = "SET_USERS_LOG_DATA";
export const SET_USERS_LOG_DATA_LOADING = "SET_USERS_LOG_DATA_LOADING";
export const SET_USERS_LOG_DATA_SORT = "SET_USERS_LOG_DATA_SORT";
export const SET_USERSLOG_DATA_SORT_ORDERING =
  "SET_USERSLOG_DATA_SORT_ORDERING";
export const SET_USERS_LOG_DATA_TIMERANGE = "SET_USERS_LOG_DATA_TIMERANGE";
export const SET_USERS_LOG_DATA_DISPLAY_COLUMNS =
  "SET_USERS_LOG_DATA_DISPLAY_COLUMNS";
export const SET_AGGREGATION_DATA = "SET_AGGREGATION_DATA";
export const SET_IS_EMPTY = "SET_IS_EMPTY";
export const SET_SIDEPANEL = "SET_SIDEPANEL";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const SET_USERLOG_FILTER_OPTIONS = "SET_USERLOG_FILTER_OPTIONS";

// ===================================filters===================================
export const ADD_USERLOG_FILTER = "ADD_USERLOG_FILTER";
export const DELETE_USERLOG_FILTER = "DELETE_USERLOG_FILTER";
export const UPDATE_USERLOG_FILTER = "UPDATE_USERLOG_FILTER";
export const SET_CURRENT_USERLOG_FILTER = "SET_CURRENT_USERLOG_FILTER";
export const SET_CURRENT_USERLOG_FILTER_TYPE =
  "SET_CURRENT_USERLOG_FILTER_TYPE";
export const SET_USERLOG_FILTERS = "SET_USERLOG_FILTERS";
export const SET_USERLOG_FILTER_TYPE = "SET_USERLOG_FILTER_TYPE";
// ===============================filters=======================================
export const setUserLogFilterType = (
  filterType: keyof LogItem | undefined
) => ({
  type: SET_USERLOG_FILTER_TYPE,
  payload: filterType,
});
export const setUserLogFilters = (filters: FilterObject[]) => ({
  type: SET_USERLOG_FILTERS,
  payload: filters,
});
export const setCurrentUserLogFilter = (filter: CurrentFilterObject) => ({
  type: SET_CURRENT_USERLOG_FILTER,
  payload: filter,
});
function processFilters(filters: FilterObject[]): FilterParams {
  return filters.reduce((acc: FilterParams, filter): FilterParams => {
    if (!(filter.value instanceof Array)) {
      filter.value = [filter.value];
    }
    var values = filter.value.map((value) => {
      if (value === "true" || value === "false") {
        value = value === "true" ? true : false;
      }
      if (filter.value_field_type === "datetime-local") {
        value = new Date(value as string).toISOString();
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
export const applyUserlogPostFilters = (filters: FilterObject[]) => {
  return (dispatch: TypedDispatch) => {
    const postData = processFilters(filters);
    // TODO
    dispatch(updateUser({ user_page_filter: postData }, undefined, true));
    dispatch(getUsersLogData(postData));
  };
};

export const addUserLogFilter = (filter: FilterObject) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: ADD_USERLOG_FILTER,
      payload: filter,
    });
    const state = getState();
    const filters = state.usersPage.filters;
    dispatch(applyUserlogPostFilters(filters));
  };
};

export const deleteUserLogFilter = (filterId: string) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: DELETE_USERLOG_FILTER,
      payload: filterId,
    });
    dispatch(setCurrentUserLogFilter({ metric: undefined, id: "" }));
    const state = getState();
    const filters = state.usersPage.filters;
    dispatch(applyUserlogPostFilters(filters));
  };
};

export const updateUserlogFilter = (filter: FilterObject) => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    dispatch({
      type: UPDATE_USERLOG_FILTER,
      payload: filter,
    });
    if (filter.value?.length === 0) {
      dispatch(deleteUserLogFilter(filter.id));
      return;
    }
    const state = getState();
    const filters = state.usersPage.filters;
    dispatch(applyUserlogPostFilters(filters));
  };
};
// ======================================================================
export const setUserLogFilterOptions = (data) => {
  return {
    type: SET_USERLOG_FILTER_OPTIONS,
    payload: data,
  };
};
export const setSelectedUser = (id) => {
  return {
    type: SET_SELECTED_USER,
    payload: id,
  };
};
export const toggleSidePanel = (value: boolean) => ({
  type: SET_SIDEPANEL,
  payload: value,
});
export const setAggregationData = (data: any) => {
  data.daily_request_per_user =
    data.daily_requests / (data.daily_active_users || 1);
  data.monthly_cost_per_user =
    data.monthly_cost / (data.monthly_active_users || 1);
  return {
    type: SET_AGGREGATION_DATA,
    payload: data,
  };
};
export const setIsEmpty = (value: boolean) => ({
  type: SET_IS_EMPTY,
  payload: value,
});

export const setUsersLogDataDisplayColumns = (columns: string[]) => ({
  type: SET_USERS_LOG_DATA_DISPLAY_COLUMNS,
  payload: columns,
});

export const setUsersLogDataTimeRange = (timeRange: string) => ({
  type: SET_USERS_LOG_DATA_TIMERANGE,
  payload: timeRange,
});

export const setUsersLogDataSortOrdering = (ordering: string) => ({
  type: SET_USERSLOG_DATA_SORT_ORDERING,
  payload: ordering,
});
export const setUsersLogDataSort = (sortFuncKey: any) => ({
  type: SET_USERS_LOG_DATA_SORT,
  payload: sortFuncKey,
});
export const setUsersLogData = (data: any) => ({
  type: SET_USERS_LOG_DATA,
  payload: data,
});

export const setUsersLogDataLoading = (loading: boolean) => ({
  type: SET_USERS_LOG_DATA_LOADING,
  payload: loading,
});

export const getUsersLogData = (postData?: any) => {
  return async (dispatch: any, getState: any) => {
    const params = new URLSearchParams(window.location.search);
    if (postData) {
      params.set("page", "1");
    }
    dispatch(setUsersLogDataLoading(true));
    // API call
    const data = await fetchUsersLogData(
      getSortFunction(
        getState().usersPage.sortKey,
        getState().usersPage.sortOrder
      ),
      getState,
      postData
    );
    const { usersLogData, aggregation_data, ...rest } = data;
    dispatch(setUsersLogData(usersLogData));
    dispatch(setAggregationData(aggregation_data));
    console.log("usersLogData", usersLogData);
    dispatch(setIsEmpty(usersLogData.length === 0));
    dispatch(setUserLogFilterOptions(rest));
    dispatch(setUsersLogDataLoading(false));
  };
};

const sortFunctions = {
  customerId: (a: any, b: any, order: string) => {
    const result = a.customerId.localeCompare(b.customerId);
    return order === "asc" ? result : -result;
  },
  lastActive: (a: any, b: any, order: string) => {
    const result =
      new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
    return order === "asc" ? result : -result;
  },
  activeFor: (a: any, b: any, order: string) => {
    const result = parseInt(a.activeFor) - parseInt(b.activeFor);
    return order === "asc" ? result : -result;
  },
  totalRequests: (a: any, b: any, order: string) => {
    const result = (a.totalRequests as number) - (b.totalRequests as number);
    return order === "asc" ? result : -result;
  },
  requests: (a: any, b: any, order: string) => {
    const result = (a.requests as number) - (b.requests as number);
    return order === "asc" ? result : -result;
  },
  totalTokens: (a: any, b: any, order: string) => {
    const result = (a.totalTokens as number) - (b.totalTokens as number);
    return order === "asc" ? result : -result;
  },
  tokens: (a: any, b: any, order: string) => {
    const result = (a.tokens as number) - (b.tokens as number);
    return order === "asc" ? result : -result;
  },
};

const getSortFunction = (property: string, order: string) => {
  if (!sortFunctions[property]) {
    throw new Error(`Sort function for property "${property}" does not exist.`);
  }

  return (a: any, b: any) => sortFunctions[property](a, b, order);
};

const fetchUsersLogData = async (
  sortFunc,
  getState,
  postData
): Promise<any> => {
  try {
    const timeRange = getState().usersPage.timeRane;
    let params = new URLSearchParams(window.location.search);
    params.set("summary_type", timeRange);
    console.log("postData", postData);
    console.log("params", params.toString());
    const { results: responseData, ...rest } = await keywordsRequest({
      path: `api/users/?${params.toString()}`,
      method: "GET",
      data: { filters: postData },
    });
    console.log("responseData", responseData);
    return {
      ...rest,
      usersLogData: responseData
        .map((data: any) => {
          return {
            customerId: data.customer_identifier,
            lastActive: new Date(data.last_active_timeframe).toISOString(),
            activeFor:
              data.active_days + (+data.active_days > 1 ? " days" : " day"),
            requests: Math.round(data.number_of_requests as number),
            tokens: Math.round(data.total_tokens as number),
            costs: data.total_cost,
            sentiment: data.average_sentiment,
            cacheHits: data.cache_hits,
            topModel: data.top_model,
            averageLatency: (data.average_latency ?? 0).toFixed(3),
          };
        })
        .sort(sortFunc),
    };
  } catch (error) {
    console.error(error);
  }
};

export const exportUserLogs = (format = ".csv") => {
  return async (dispatch: TypedDispatch, getState: () => RootState) => {
    const state = getState();
    try {
      const { results: responseData, ...rest } = await keywordsRequest({
        path: `api/users/`,
        method: "GET",
        data: { exporting: true },
      });
      let blob: Blob;
      let exportData: string;
      if (format === ".json") {
        exportData = JSON.stringify(responseData);
        blob = new Blob([exportData], { type: "text/json" });
      } else if (format === ".csv") {
        exportData = new Parser().parse(responseData);
        blob = new Blob([exportData], { type: "text/csv" });
      } else {
        throw new Error("Invalid format");
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "users_logs" + format;
      a.click();
    } catch (error) {
      console.error(error);
    }
  };
};
