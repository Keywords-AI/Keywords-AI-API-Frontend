import { keywordsFetch } from "src/services/apiConfig";
import { sliceChartData, formatDate } from "src/utilities/objectProcessing";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_COST_DATA = "SET_COST_DATA";
export const SET_TOKEN_COUNT_DATA = "SET_TOKEN_COUNT_DATA";
export const SET_LATENCY_DATA = "SET_LATENCY_DATA";
export const SET_REQUEST_COUNT_DATA = "SET_REQUEST_COUNT_DATA";
export const SET_DATE_DATA = "SET_DATE_DATA";

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
};

export const setTokenCountData = (data) => {
  return {
    type: SET_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setLatencyData = (data) => {
  return {
    type: SET_LATENCY_DATA,
    payload: data,
  };
};

export const setRequestCountData = (data) => {
  return {
    type: SET_REQUEST_COUNT_DATA,
    payload: data,
  };
};

export const setDateData = (data) => {
  return {
    type: SET_DATE_DATA,
    payload: data,
  };
};

export const getDashboardData = () => {
  return (dispatch) => {
    const params = new URLSearchParams(window.location.search);
    const currDate = new Date();
    const date = new Date(currDate - currDate.getTimezoneOffset() * 60 * 1000); // Get Local Date
    params.set("date", date.toISOString()); // format: yyyy-mm-dd
    // Yes, Fuck JS. They don't provide native formatter to convert to YYYY-mm-dd

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
        console.log(data);
        dispatch(setDashboardData(data));
        const dataList = fillMissingDate(
          data?.data,
          params.get("summary_type")
        );

        dispatch(
          setCostData(sliceChartData(dataList, "date_group", "total_cost"))
        );
        dispatch(
          setTokenCountData(
            sliceChartData(dataList, "date_group", "total_tokens")
          )
        );
        dispatch(
          setLatencyData(
            sliceChartData(dataList, "date_group", "average_latency")
          )
        );
        dispatch(
          setRequestCountData(
            sliceChartData(dataList, "date_group", "number_of_requests")
          )
        );
      })
      .catch((error) => {});
  };
};

export const fillMissingDate = (data, dateGroup) => {
  const newDataArray = [];
  const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");
  // new Date creates a date object in local timezone
  const localeUtc = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }
  const handleDailyCase = () => {
    const now = new Date();
    // BE gives UTC strings, Date() converts to local timezone
    // The hours are accurate, but the date is not
    for (let hour = 0; hour < 24; hour++) {
      const hourString = formatTimeUnit(hour) + ":00";
      const found = data.find((d) => {
        const date = new Date(d.date_group);
        const foundDate = date.getHours() === hour && date.getDate() === now.getDate();
        return foundDate;
      });
      newDataArray.push(
        found
          ? { ...found, date_group: hourString }
          : {
              date_group: hourString,
              number_of_requests: 0,
              total_cost: 0,
              total_tokens: 0,
              average_latency: 0,
            }
      );
    }
  };
  switch (dateGroup) {
    case "daily":
      handleDailyCase();
      break;

    case "weekly":
      for (let day = 0; day < 7; day++) {
        const dayDate = new Date();
        // BE gives UTC strings, Date() converts to local timezone
        // The start and end date will be offset by the timezone
        // So we need to know the dates in UTC.
        dayDate.setDate(dayDate.getDate() - dayDate.getDay() + day);
        const dateString = `${formatTimeUnit(
          dayDate.getMonth() + 1
        )}/${formatTimeUnit(dayDate.getDate())}/${dayDate.getFullYear()}`;
        const found = data.find(
          (d) => localeUtc(d.date_group).getDate() === dayDate.getDate()
        );
        newDataArray.push(
          found
            ? { ...found, date_group: dateString }
            : {
                date_group: dateString,
                number_of_requests: 0,
                total_cost: 0,
                total_tokens: 0,
                average_latency: 0,
              }
        );
      }
      break;
      case "monthly":
        const now = new Date();
        // Get the number of days in the current month
        const daysInMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();
      
        for (let day = 1; day <= daysInMonth; day++) {
          // Format the date string as MM/DD/YYYY
          const month = formatTimeUnit(now.getMonth() + 1); // Month is 0-indexed
          const year = now.getFullYear();
          const dayString = `${month}/${formatTimeUnit(day)}/${year}`;
      
          const found = data.find((d) => {
            const date = localeUtc(d.date_group);
            return date.getDate() === day;
          });
      
          newDataArray.push(
            found
              ? { ...found, date_group: dayString }
              : {
                date_group: dayString,
                number_of_requests: 0,
                total_cost: 0,
                total_tokens: 0,
                average_latency: 0,
              }
          );
        }
      break;

    case "yearly":
      for (let month = 0; month < 12; month++) {
        // The start and end date will be offset by the timezone
        // This will lead of offset in the month
        // So we need to know the month in UTC.
        const monthString = formatTimeUnit(month + 1);
        const found = data.find((d) => {
          const date = localToUtc(d.date_group);
          return date.getMonth() === month;
        });
        newDataArray.push(
          found
            ? { ...found, date_group: monthString }
            : {
                date_group: monthString,
                number_of_requests: 0,
                total_cost: 0,
                total_tokens: 0,
                average_latency: 0,
              }
        );
      }
      break;
    default:
      // Default case logic (if needed)
      handleDailyCase();
      break;
  }

  return newDataArray;
};
