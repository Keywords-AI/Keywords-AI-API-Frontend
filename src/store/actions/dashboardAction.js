import { data } from "autoprefixer";
import moment from 'moment';
import { keywordsFetch } from "src/services/apiConfig";
import { sliceChartData } from "src/utilities/objectProcessing";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_COST_DATA = "SET_COST_DATA";
export const SET_TOKEN_COUNT_DATA = "SET_TOKEN_COUNT_DATA";
export const SET_LATENCY_DATA = "SET_LATENCY_DATA";
export const SET_REQUEST_COUNT_DATA = "SET_REQUEST_COUNT_DATA";
export const SET_DATE_DATA = "SET_DATE_DATA";

export const aggregateData = (data, timePeriod) => {
  const formattedData = [];
  data.forEach(item => {
    
    switch (timePeriod) {
      case 'daily':
        
        break;
      case 'weekly':
        
        break;
      case 'monthly':
        
        break;
      case 'yearly':
        // dateGroup = date.startOf('year').format('YYYY-MM-DD');
        break;
      default:
        dateGroup = date.format('YYYY-MM-DD');
    }

    if (!groupedData[dateGroup]) {
      // groupedData[dateGroup] = { ...item, [dateKey]: dateGroup, [valueKey]: 0 };
    }
    // groupedData[dateGroup][valueKey] += item[valueKey];
  });

  return Object.values(groupedData);
};


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

export const setDateData = (data) => {
  return {
    type: SET_DATE_DATA,
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
          console.log(response.json());
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


