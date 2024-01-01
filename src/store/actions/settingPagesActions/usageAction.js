import apiConfig from "src/services/apiConfig";
import { getDateStr } from "../../../utilities/stringProcessing";
import { retrieveAccessToken } from "src/utilities/authorization";
import { timeSkip } from "src/utilities/objectProcessing";
import { digitToMonth } from "src/utilities/objectProcessing";

export const SET_DATE = "SET_DATE";
export const SET_USAGE_DATA = "SET_USAGE_DATA";
export const SET_FREE_CREDITS = "SET_FREE_CREDITS";
export const SET_IS_LAST = "SET_IS_LAST";
export const SET_IS_FIRST = "SET_IS_FIRST";

const formatData = (datalist) => {
  const formattedData = [];
  for (var i = 0; i < datalist.length; i++) {
    const data = datalist[i];
    formattedData.push({
      name: getDateStr(data?.date),
      usage: data?.total_cost,
    });        
  }
  return formattedData;
};

export const getUsageData = (fetchDate) => {
  return async (dispatch, getState) => {
    const date = fetchDate || getState().usage.date;
    const month = date.getMonth();
    if (
      digitToMonth(date?.getMonth(), date?.getFullYear()) === "Oct 2023"
    ) {
      dispatch(setIsFirst(true));
    } else {
      dispatch(setIsFirst(false));
    }
    if (month === new Date().getMonth()) {
      dispatch(setIsLast(true));
    } else {
      dispatch(setIsLast(false));
    }
    const response = await fetch(
      // JavaScript headshup: month is 0-indexed!
      `${apiConfig.apiURL}api/get-usage?month=${month + 1}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retrieveAccessToken()}`,
        },
      }
    );
    const data = await response.json();
    const formattedData = formatData(data);
    dispatch({
      type: SET_USAGE_DATA,
      payload: formattedData,
    });
  };
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const setIsLast = (isLast) => {
  return {
    type: SET_IS_LAST,
    payload: isLast,
  };
};

export const setIsFirst = (isFirst) => {
  return {
    type: SET_IS_FIRST,
    payload: isFirst,
  };
};

export const getLastMonthUsageData = () => {
  return async (dispatch, getState) => {
    const date = getState().usage.date;
    const lastMonth = timeSkip(date, { months: -1 });
    dispatch(setDate(lastMonth));
    dispatch(getUsageData(lastMonth));
  };
};

export const getNextMonthUsageData = () => {
  return async (dispatch, getState) => {
    const date = getState().usage.date;
    const nextMonth = timeSkip(date, { months: 1 });
    if (nextMonth > new Date()) {
      return;
    }
    dispatch(setDate(nextMonth));
    dispatch(getUsageData(nextMonth));
  };
};

export const setFreeCredits = (freeCredits) => {
  return {
    type: SET_FREE_CREDITS,
    payload: freeCredits,
  };
};
