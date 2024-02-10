
export const SET_CURRENT_TIME_RANGE = "SET_CURRENT_TIME_RANGE";
export const SET_TOP_CACHES = "SET_TOP_CACHES";

export const setCurrentTimeRange = (timeRange, setParam, navigate) => {
    setParam({ time_range: timeRange }, navigate);
    return {
      type: SET_CURRENT_TIME_RANGE,
      payload: timeRange,
    };
  };

