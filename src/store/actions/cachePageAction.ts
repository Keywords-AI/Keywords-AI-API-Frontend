import { keywordsRequest } from "src/utilities/requests";

export const SET_CURRENT_TIME_RANGE = "SET_CURRENT_TIME_RANGE";
export const SET_TOP_CACHES = "SET_TOP_CACHES";
export const SET_CACHE_DATA = "SET_CACHE_DATA";

export const setCurrentTimeRange = (timeRange, setParam, navigate) => {
  setParam({ time_range: timeRange }, navigate);
  return {
    type: SET_CURRENT_TIME_RANGE,
    payload: timeRange,
  };
};

export const setCacheData = (data) => {
  return {
    type: SET_CACHE_DATA,
    payload: data,
  };
};

export const getCacheData = () => {
  return (dispatch) => {
    keywordsRequest({
      path: `api/caches/`,
      method: "GET",
      data: {},
    }).then((response) => {
      console.log(response);
    });
  };
};
