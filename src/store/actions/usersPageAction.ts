import { TypedDispatch, RootState } from "src/types";
import { keywordsRequest } from "src/utilities/requests";
import { Parser } from "unified";

export const SET_USERS_LOG_DATA = "SET_USERS_LOG_DATA";
export const SET_USERS_LOG_DATA_LOADING = "SET_USERS_LOG_DATA_LOADING";

export const setUsersLogData = (data: any) => ({
  type: SET_USERS_LOG_DATA,
  payload: data,
});

export const setUsersLogDataLoading = (loading: boolean) => ({
  type: SET_USERS_LOG_DATA_LOADING,
  payload: loading,
});

export const getUsersLogData = () => {
  return async (dispatch: any) => {
    dispatch(setUsersLogDataLoading(true));
    // API call
    dispatch(setUsersLogData(await fetchUsersLogData()));
    dispatch(setUsersLogDataLoading(false));
  };
};

export const filterUsersLogDataAction = (searchString: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setUsersLogDataLoading(true));
    if (searchString === "") {
      dispatch(setUsersLogData(await fetchUsersLogData()));
    } else {
      const data: any[] = (await fetchUsersLogData()) as any[];
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

const fetchUsersLogData = async () => {
  return new Promise((resolve) => {
    const fake = [
      {
        customerId: "tghst23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "tghst23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "tghst23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "aavbasd23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "aavbasd23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "aavbasd23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
      {
        customerId: "aavbasd23ddfg",
        lastActive: new Date().toISOString(),
        activeFor: "3 days",
        totalRequests: 203122,
        requestsPerDay: 50,
        totalTokens: 203122,
        tokensPerDay: 203122,
      },
    ];
    setTimeout(() => {
      resolve([...fake, ...fake, ...fake, ...fake, ...fake, ...fake]);
    }, 1000);
  });
};

export const exportUserLogs = (format = ".csv") => {
  return (dispatch: TypedDispatch, getState: () => RootState) => {
    console.log("Exporting user logs", format);
    const state = getState();
    //   const filters = state.requestLogs.filters;
    //   const filterData = processFilters(filters);
    //   keywordsRequest({
    //     path: `api/request-logs/`,
    //     method: "POST",
    //     data: { filters: filterData, exporting: true },
    //   }).then((data) => {
    //     let exportData: string;
    //     let blob: Blob;
    //     if (format === ".json") {
    //       exportData = JSON.stringify(data);
    //       blob = new Blob([exportData], { type: "text/json" });
    //     } else if (format === ".csv") {
    //       exportData = new Parser().parse(data);
    //       blob = new Blob([exportData], { type: "text/csv" });
    //     } else {
    //       throw new Error("Invalid format");
    //     }
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "request_logs" + format;
    //     a.click();
    //   });
  };
};
