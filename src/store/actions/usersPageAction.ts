import { TypedDispatch, RootState } from "src/types";
import { keywordsRequest } from "src/utilities/requests";
import { Parser } from "@json2csv/plainjs";

export const SET_USERS_LOG_DATA = "SET_USERS_LOG_DATA";
export const SET_USERS_LOG_DATA_LOADING = "SET_USERS_LOG_DATA_LOADING";
export const SET_USERS_LOG_DATA_SORT = "SET_USERS_LOG_DATA_SORT";

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
          getSortFunction(getState().usersPage.sortKey, "asc")
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
            getSortFunction(getState().usersPage.sortKey, "asc")
          )
        )
      );
    } else {
      const data: any[] = (await fetchUsersLogData(
        getSortFunction(getState().usersPage.sortKey, "asc")
      )) as any[];
      const filteredData = data.filter((data: any) => {
        return data.customerId
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });
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
    const result = a.totalRequests - b.totalRequests;
    return order === "asc" ? result : -result;
  },
  requestsPerDay: (a: any, b: any, order: string) => {
    const result = a.requestsPerDay - b.requestsPerDay;
    return order === "asc" ? result : -result;
  },
  totalTokens: (a: any, b: any, order: string) => {
    const result = a.totalTokens - b.totalTokens;
    return order === "asc" ? result : -result;
  },
  tokensPerDay: (a: any, b: any, order: string) => {
    const result = a.tokensPerDay - b.tokensPerDay;
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
    const responseData = await keywordsRequest({
      path: `api/users`,
      method: "GET",
      data: {},
    });
    console.log(sortFunc);
    return responseData
      .map((data: any) => {
        return {
          customerId: data.customer_identifier,
          lastActive: new Date(data.last_active_timeframe).toISOString(),
          activeFor:
            data.active_days + (+data.active_days > 1 ? " days" : " day"),
          totalRequests: data.number_of_requests,
          requestsPerDay: Math.round(data.request_per_day as number),
          totalTokens: data.total_tokens,
          tokensPerDay: Math.round(data.tokens_per_day as number),
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
      const responseData = await keywordsRequest({
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
