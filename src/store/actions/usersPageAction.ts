import { TypedDispatch, RootState } from "src/types";
import { keywordsRequest } from "src/utilities/requests";
import { Parser } from "@json2csv/plainjs";

export const SET_USERS_LOG_DATA = "SET_USERS_LOG_DATA";
export const SET_USERS_LOG_DATA_LOADING = "SET_USERS_LOG_DATA_LOADING";
export const SET_USERS_LOG_DATA_SORT = "SET_USERS_LOG_DATA_SORT";
export const SET_USERSLOG_DATA_SORT_ORDERING =
  "SET_USERSLOG_DATA_SORT_ORDERING";
export const SET_USERS_LOG_DATA_TIMERANGE = "SET_USERS_LOG_DATA_TIMERANGE";
export const SET_USERS_LOG_DATA_DISPLAY_COLUMNS =
  "SET_USERS_LOG_DATA_DISPLAY_COLUMNS";
export const SET_AGGREGATION_DATA = "SET_AGGREGATION_DATA";

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

export const getUsersLogData = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(setUsersLogDataLoading(true));
    // API call
    dispatch(
      setUsersLogData(
        await fetchUsersLogData(
          getSortFunction(
            getState().usersPage.sortKey,
            getState().usersPage.sortOrder
          )
        )
      )
    );
    dispatch(setUsersLogDataLoading(false));
  };
};

export const filterUsersLogDataAction = (searchString: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setUsersLogDataLoading(true));
    if (searchString === "") {
      dispatch(
        setUsersLogData(
          await fetchUsersLogData(
            getSortFunction(
              getState().usersPage.sortKey,
              getState().usersPage.sortOrder
            )
          )
        )
      );
    } else {
      const { results: data, ...summary } = await fetchUsersLogData(
        getSortFunction(
          getState().usersPage.sortKey,
          getState().usersPage.sortOrder
        )
      );
      const filteredData = data.filter((data: any) => {
        return data.customerId
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });
      if (filteredData.length === 0) {
        dispatch(setUsersLogDataLoading(false));
        return;
      }
      dispatch(setUsersLogData(filteredData));
    }
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

const fetchUsersLogData = async (sortFunc) => {
  try {
    const {
      results: responseData,
      aggregation_data,
      ...rest
    } = await keywordsRequest({
      path: `api/users`,
      method: "GET",
      data: {},
    });
    console.log("aggregation_data", aggregation_data, rest, responseData);
    return responseData
      .map((data: any) => {
        return {
          customerId: data.customer_identifier,
          lastActive: new Date(data.last_active_timeframe).toISOString(),
          activeFor:
            data.active_days + (+data.active_days > 1 ? " days" : " day"),
          requests: Math.round(data.request_per_day as number),
          tokens: Math.round(data.tokens_per_day as number),
        };
      })
      .sort(sortFunc);
  } catch (error) {
    console.error(error);
  }
};

export const exportUserLogs = (format = ".csv") => {
  return async (dispatch: TypedDispatch, getState: () => RootState) => {
    const state = getState();
    try {
      const { results: responseData, ...rest } = await keywordsRequest({
        path: `api/users`,
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
