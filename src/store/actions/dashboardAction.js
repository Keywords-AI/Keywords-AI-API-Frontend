import { keywordsFetch } from "src/services/apiConfig";
import { sliceChartData } from "src/utilities/objectProcessing";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_COST_DATA = "SET_COST_DATA";
export const SET_TOKEN_COUNT_DATA = "SET_TOKEN_COUNT_DATA";
export const SET_LATENCY_DATA = "SET_LATENCY_DATA";
export const SET_REQUEST_COUNT_DATA = "SET_REQUEST_COUNT_DATA";

export const setDashboardData = (data) => {
  return {
    type: SET_DASHBOARD_DATA,
    payload: data,
  };
};

export const setCostData = (data) => {
  return {
    type: SET_COST_DATA,
    payload: data,
  };
}

export const setTokenCountData = (data) => {
  return {
    type: SET_TOKEN_COUNT_DATA,
    payload: data,
  };
}

export const setLatencyData = (data) => {
  return {
    type: SET_LATENCY_DATA,
    payload: data,
  };
}

export const setRequestCountData = (data) => {
  return {
    type: SET_REQUEST_COUNT_DATA,
    payload: data,
  };
}


export const getDashboardData = () => {
  return (dispatch) => {
    const params=new URLSearchParams(window.location.search);
    params.set("date", new Date().toISOString().split('T')[0]);
    keywordsFetch({
      path: `api/dashboard?${params.toString()}`,
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(setDashboardData(data));
        const dataList = data?.data;
        dispatch(setCostData(sliceChartData(dataList, "date_group", "total_cost")));
        dispatch(setTokenCountData(sliceChartData(dataList, "date_group", "total_tokens")));
        dispatch(setLatencyData(sliceChartData(dataList, "date_group", "average_latency")));
        dispatch(setRequestCountData(sliceChartData(dataList, "date_group", "number_of_requests")));
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};
