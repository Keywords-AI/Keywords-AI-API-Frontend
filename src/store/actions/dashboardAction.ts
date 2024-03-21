import { Metrics, colorTagsClasses } from "src/utilities/constants";
import {
  sliceChartData,
  formatDate,
  getColorMap,
  addMissingDate,
  digitToMonth,
  formatTimeUnit,
  formatDateUnit,
} from "src/utilities/objectProcessing";
import { updateUser, filterParamsToFilterObjects } from "src/store/actions/";
import { keywordsRequest } from "src/utilities/requests";
import _ from "lodash";
import { RootState } from "src/types";
import { Item } from "@radix-ui/react-dropdown-menu";
export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_COST_DATA = "SET_COST_DATA";
export const SET_AVG_COST_DATA = "SET_AVG_COST_DATA";
export const SET_TOKEN_COUNT_DATA = "SET_TOKEN_COUNT_DATA";
export const SET_AVG_TOKEN_COUNT_DATA = "SET_AVG_TOKEN_COUNT_DATA";
export const SET_PROMPT_TOKEN_COUNT_DATA = "SET_PROMPT_TOKEN_COUNT_DATA";
export const SET_AVG_PROMPT_TOKEN_COUNT_DATA =
  "SET_AVG_PROMPT_TOKEN_COUNT_DATA";
export const SET_COMPLETION_TOKEN_COUNT_DATA =
  "SET_COMPLETION_TOKEN_COUNT_DATA";
export const SET_AVG_COMPLETION_TOKEN_COUNT_DATA =
  "SET_AVG_COMPLETION_TOKEN_COUNT_DATA";
export const SET_LATENCY_DATA = "SET_LATENCY_DATA";
export const SET_REQUEST_COUNT_DATA = "SET_REQUEST_COUNT_DATA";
export const SET_DATE_DATA = "SET_DATE_DATA";
export const SET_ERROR_DATA = "SET_ERROR_DATA";
export const SET_PANEL_DATA = "SET_PANEL_DATA";
export const SET_MODEL_DATA = "SET_MODEL_DATA";
export const SET_AVG_MODEL_DATA = "SET_AVG_MODEL_DATA";
export const SET_API_DATA = "SET_API_DATA";
export const SET_AVG_API_DATA = "SET_AVG_API_DATA";
export const SET_DISPLAY_METRIC = "SET_DISPLAY_METRIC";
export const SET_DISPLAY_TYPE = "SET_DISPLAY_TYPE";
export const SET_DISPLAY_BREAKDOWN = "SET_DISPLAY_BREAKDOWN";
export const SET_DISPLAY_TIME_RANGE = "SET_DISPLAY_TIME_RANGE";
export const SET_GROUP_BY_DATA = "SET_GROUP_BY_DATA";
export const SET_TIME_FRAME_OFFSET = "SET_TIME_FRAME_OFFSET";
export const SET_MODEL_COLORS = "SET_MODEL_COLORS";
export const SET_KEY_COLORS = "SET_KEY_COLORS";
export const RESET_TIME_FRAME_OFFSET = "RESET_TIME_FRAME_OFFSET";
export const SET_DASHBOARD_LOADING = "SET_DASHBOARD_LOADING";
export const SET_AVG_TTFT_DATA = "SET_AVG_TTFT_DATA";
export const SET_TPS_DATA = "SET_TPS_DATA";
//==============================================================================
export const SET_DASHBOARD_FILTER_OPEN = "SET_DASHBOARD_FILTER_OPEN";
export const SET_DASHBOARD_SECOND_FILTER = "SET_DASHBOARD_SECOND_FILTER";

export const SET_DASHBOARD_FILTER_TYPE = "SET_DASHBOARD_FILTER_TYPE";
export const SET_DASHBOARD_FILTER_OPTIONS = "SET_DASHBOARD_FILTER_OPTIONS";
export const SET_DASHBOARD_FILTERS = "SET_DASHBOARD_FILTERS";
export const ADD_DASHBOARD_FILTER = "ADD_DASHBOARD_FILTER";
export const DELETE_DASHBOARD_FILTER = "DELETE_DASHBOARD_FILTER";
export const UPDATE_DASHBOARD_FILTER = "UPDATE_DASHBOARD_FILTER";
export const SET_DASHBOARD_CURRENT_FILTER = "SET_DASHBOARD_CURRENT_FILTER";

// Filter actions

export const setDashboardFilterType = (filterType) => {
  return {
    type: SET_DASHBOARD_FILTER_TYPE,
    payload: filterType,
  };
};

export const setDashboardFilters = (filters) => {
  return (dispatch) => {
    dispatch({
      type: SET_DASHBOARD_FILTERS,
      payload: filters,
    });
    dispatch(applyDashboardPostFilters(filters));
  };
};

export const setDashboardCurrentFilter = (filter) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_DASHBOARD_CURRENT_FILTER,
      payload: filter,
    });
  };
};

function processDashboardFilters(filters) {
  return filters.reduce((acc, filter) => {
    if (!(filter.value instanceof Array)) {
      filter.value = [filter.value];
    }
    var values = filter.value.map((value) => {
      if (value === "true" || value === "false") {
        value = value === "true" ? true : false;
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

export const applyDashboardPostFilters = (filters) => {
  return (dispatch) => {
    const postData = processDashboardFilters(filters);
    dispatch(updateUser({ dashboard_filters: postData }, undefined, true));
    dispatch(getDashboardData(postData));
  };
};

export const addDashboardFilter = (filter) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_DASHBOARD_FILTER,
      payload: filter,
    });
    const state = getState();
    const filters = state.dashboard.filters;
    dispatch(applyDashboardPostFilters(filters));
  };
};

export const deleteDashboardFilter = (filterId) => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_DASHBOARD_FILTER,
      payload: filterId,
    });
    const state = getState();
    const filters = state.dashboard.filters;
    dispatch(applyDashboardPostFilters(filters));
  };
};

export const updateDashboardFilter = (filter) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_DASHBOARD_FILTER,
      payload: filter,
    });
    const state = getState();
    const filters = state.dashboard.filters;
    dispatch(applyDashboardPostFilters(filters));
  };
};
export const setDashboardFilterOptions = (filters) => {
  return {
    type: SET_DASHBOARD_FILTER_OPTIONS,
    payload: filters,
  };
};

export const setDashboardFilterOpen = (open) => {
  return {
    type: SET_DASHBOARD_FILTER_OPEN,
    payload: open,
  };
};

export const setDashboardSecondFilter = (filter) => {
  return {
    type: SET_DASHBOARD_SECOND_FILTER,
    payload: filter,
  };
};
//==============================================================================

export const setTpsData = (data) => {
  return {
    type: SET_TPS_DATA,
    payload: data,
  };
};
export const setAvgTtftData = (data) => {
  return {
    type: SET_AVG_TTFT_DATA,
    payload: data,
  };
};

export const setDashboardLoading = (data) => {
  return {
    type: SET_DASHBOARD_LOADING,
    payload: data,
  };
};
export const setKeyColors = (data) => {
  return {
    type: SET_KEY_COLORS,
    payload: data,
  };
};
export const SET_SENTIMENT_SUMMARY_DATA = "SET_SENTIMENT_SUMMARY_DATA";
export const SET_SENTIMENT_DATA = "SET_SENTIMENT_DATA";

export const setModelColors = (data) => {
  return {
    type: SET_MODEL_COLORS,
    payload: data,
  };
};

export const setTimeFrameOffset = (offset, navigate) => {
  // setQueryParams({ timeFrameOffset: offset }, navigate);
  return {
    type: SET_TIME_FRAME_OFFSET,
    payload: offset,
  };
};
export const resetTimeFrameOffset = () => {
  return {
    type: RESET_TIME_FRAME_OFFSET,
    payload: 0,
  };
};
export const SET_P50_DATA = "SET_P50_DATA";
export const SET_P90_DATA = "SET_P90_DATA";
export const SET_P95_DATA = "SET_P95_DATA";
export const SET_P99_DATA = "SET_P99_DATA";

export const setGroupByData = (data) => {
  return {
    type: SET_GROUP_BY_DATA,
    payload: data,
  };
};

export const setDisplayTimeRange = (timeRange, setParam, navigate) => {
  setParam({ summary_type: timeRange }, navigate);
  return {
    type: SET_DISPLAY_TIME_RANGE,
    payload: timeRange,
  };
};

export const setDisplayMetric = (metric, setParam, navigate) => {
  setParam({ metric: metric }, navigate);
  return {
    type: SET_DISPLAY_METRIC,
    payload: metric,
  };
};

export const setDisplayType = (type, setParam, navigate) => {
  setParam({ type: type }, navigate);
  return {
    type: SET_DISPLAY_TYPE,
    payload: type,
  };
};

export const setDisplayBreakdown = (breakdown, setParam, navigate) => {
  setParam({ breakdown: breakdown }, navigate);
  return {
    type: SET_DISPLAY_BREAKDOWN,
    payload: breakdown,
  };
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
};

export const setAvgCostData = (data) => {
  return {
    type: SET_AVG_COST_DATA,
    payload: data,
  };
};

export const setTokenCountData = (data) => {
  return {
    type: SET_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setAvgTokenCountData = (data) => {
  return {
    type: SET_AVG_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setPromptTokenCountData = (data) => {
  return {
    type: SET_PROMPT_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setAvgPromptTokenCountData = (data) => {
  return {
    type: SET_AVG_PROMPT_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setCompletionTokenCountData = (data) => {
  return {
    type: SET_COMPLETION_TOKEN_COUNT_DATA,
    payload: data,
  };
};

export const setAvgCompletionTokenCountData = (data) => {
  return {
    type: SET_AVG_COMPLETION_TOKEN_COUNT_DATA,
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

export const setPanelData = (data) => {
  return {
    type: SET_PANEL_DATA,
    payload: data,
  };
};

export const setModelData = (data) => {
  return {
    type: SET_MODEL_DATA,
    payload: data,
  };
};

export const setAvgModelData = (data) => {
  return {
    type: SET_AVG_MODEL_DATA,
    payload: data,
  };
};

export const setApiData = (data) => {
  return {
    type: SET_API_DATA,
    payload: data,
  };
};

export const setAvgApiData = (data) => {
  return {
    type: SET_AVG_API_DATA,
    payload: data,
  };
};

export const setErrorData = (data) => {
  return {
    type: SET_ERROR_DATA,
    payload: data,
  };
};

export const setP50Data = (data) => {
  return {
    type: SET_P50_DATA,
    payload: data,
  };
};

export const setP90Data = (data) => {
  return {
    type: SET_P90_DATA,
    payload: data,
  };
};

export const setP95Data = (data) => {
  return {
    type: SET_P95_DATA,
    payload: data,
  };
};

export const setP99Data = (data) => {
  return {
    type: SET_P99_DATA,
    payload: data,
  };
};

export const setSentimentSummaryData = (data) => {
  return {
    type: SET_SENTIMENT_SUMMARY_DATA,
    payload: data,
  };
};

export const setSentimentData = (data) => {
  return {
    type: SET_SENTIMENT_DATA,
    payload: data,
  };
};

export const getDashboardData = (postData) => {
  return (dispatch, getState: () => RootState) => {
    dispatch(setDashboardLoading(true));
    let params = new URLSearchParams(window.location.search);
    if (params.get("summary_type") === null) {
      params.set("summary_type", getState().dashboard.displayFilter.timeRange);
    }
    if (params.get("metric") === null) {
      params.set("metric", getState().dashboard.displayFilter.metric);
    }
    if (params.get("breakdown") === null) {
      params.set("breakdown", getState().dashboard.displayFilter.breakdown);
    }
    if (params.get("type") === null) {
      params.set("type", getState().dashboard.displayFilter.type);
    }

    // const startTime = performance.now();
    const currDate = new Date();
    const timeOffset = currDate.getTimezoneOffset() / 60;
    params.set("timezone_offset", timeOffset.toString());
    const date = new Date(getState().dashboard.timeFrame);

    params.set("date", date.toISOString()); // format: yyyy-mm-dd
    keywordsRequest({
      path: `api/dashboard/?${params.toString()}`,
      method: postData ? "POST" : "GET",
      data: { filters: postData },
    })
      .then((data) => {
        const { filter_options, ...dashboardData } = data;
        dispatch(setDashboardData(dashboardData));
        dispatch(setDashboardFilterOptions(filter_options));
        const state = getState();
        const userFilters = state.user?.dashboard_filters || {};
        const filters = filterParamsToFilterObjects(
          userFilters,
          data.filter_options
        );
        const currentFilterType = state.dashboard.currentFilter.id;
        if (!currentFilterType) {
          // If we are currently editing a filter, do no refresh the filters
          // console.log("filters", filters);
          dispatch({
            type: SET_DASHBOARD_FILTERS,
            payload: filters,
          });
        }
        if (params.get("breakdown") === "by_model") {
          const breakDowndata = processBreakDownData(
            data.model_breakdown,
            true,
            params.get("summary_type"),
            params.get("metric"),
            params.get("type"),
            getState().dashboard.timeFrame
          );
          dispatch(setGroupByData(breakDowndata));
        } else if (params.get("breakdown") === "by_key") {
          const breakDowndata = processBreakDownData(
            data.key_breakdown,
            false,
            params.get("summary_type"),
            params.get("metric"),
            params.get("type"),
            getState().dashboard.timeFrame
          );
          dispatch(setGroupByData(breakDowndata));
        }
        const dataList = addMissingDate(
          data?.data,
          params.get("summary_type")!,
          getState().dashboard.timeFrame
        );

        let requestData = sliceChartData(dataList, "date_group", [
          "error_count",
          "number_of_requests",
        ]);
        const allZeros = requestData.every(
          (item) => item[Metrics.error_count.value] == 0
        );
        if (allZeros) {
          requestData = requestData.map((item) => {
            return {
              ...item,
              [Metrics.error_count.value]: null,
            };
          });
        }
        dispatch(
          setAvgTtftData(
            sliceChartData(dataList, "date_group", [
              Metrics.average_ttft.value,
              Metrics.ttft_p_50.value,
              Metrics.ttft_p_90.value,
              Metrics.ttft_p_95.value,
              Metrics.ttft_p_99.value,
            ])
          )
        );
        dispatch(
          setErrorData(
            sliceChartData(dataList, "date_group", Metrics.error_count.value)
          )
        );
        dispatch(
          setCostData(
            sliceChartData(dataList, "date_group", Metrics.total_cost.value)
          )
        );
        dispatch(
          setAvgCostData(sliceChartData(dataList, "date_group", "average_cost"))
        );
        dispatch(
          setTokenCountData(
            sliceChartData(dataList, "date_group", Metrics.total_tokens.value)
          )
        );

        dispatch(
          setAvgTokenCountData(
            sliceChartData(dataList, "date_group", "average_tokens")
          )
        );
        dispatch(
          setPromptTokenCountData(
            sliceChartData(
              dataList,
              "date_group",
              Metrics.total_prompt_tokens.value
            )
          )
        );
        dispatch(
          setAvgPromptTokenCountData(
            sliceChartData(dataList, "date_group", "average_prompt_tokens")
          )
        );
        dispatch(
          setCompletionTokenCountData(
            sliceChartData(
              dataList,
              "date_group",
              Metrics.total_completion_tokens.value
            )
          )
        );
        dispatch(
          setAvgCompletionTokenCountData(
            sliceChartData(dataList, "date_group", "average_completion_tokens")
          )
        );
        dispatch(
          setLatencyData(
            sliceChartData(dataList, "date_group", [
              "average_latency",
              "latency_p_50",
              "latency_p_90",
              "latency_p_95",
              "latency_p_99",
            ])
          )
        );
        dispatch(
          setTpsData(
            sliceChartData(dataList, "date_group", [
              Metrics.average_tps.value,
              Metrics.tps_p_50.value,
              Metrics.tps_p_90.value,
              Metrics.tps_p_95.value,
              Metrics.tps_p_99.value,
            ])
          )
        );
        dispatch(setRequestCountData(requestData));
        dispatch(setModelData(data?.data_by_model));
        dispatch(setApiData(data?.data_by_key));
        const modelData = getState().dashboard.data_by_model;
        const keyData = getState().dashboard.data_by_key;
        const modelColor = getColorMap(
          [...modelData],
          params.get("metric"),
          true
        );
        const keyColor = getColorMap([...keyData], params.get("metric"), false);

        dispatch(setModelColors(modelColor));
        dispatch(setKeyColors(keyColor));

        dispatch(setAvgModelData(data?.data_avg_by_model));
        dispatch(setAvgApiData(data?.data_avg_by_key));
        dispatch(setP50Data(data?.summary.latency_p_50));
        dispatch(setP90Data(data?.summary.latency_p_90));
        dispatch(setP95Data(data?.summary.latency_p_95));
        dispatch(setP99Data(data?.summary.latency_p_99));
        dispatch(setDashboardLoading(false));
        // const endTime2 = performance.now(); // End time
        // console.log(`Time taken for process: ${endTime2 - endTime} ms`); // Time difference in milliseconds
      })
      .catch((error) => {
        dispatch(setDashboardLoading(false));
        console.log("error", error);
      });
  };
};

// export const fillMissingDate = (data, dateGroup, timeFrame) => {
//   const newDataArray = [];

//   // const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");

//   // localeUTC: given a UTC timestamp, return the UTC time when the local time is the same as the given timestamp
//   const localeUtc = (dateStr) => {
//     const date = new Date(dateStr);
//     return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
//   };
//   const handleDailyCase = () => {
//     const now = new Date(timeFrame);

//     // BE gives UTC strings, Date() converts to local timezone
//     // The hours are accurate, but the date is not
//     for (let hour = 0; hour < 24; hour++) {
//       const hourString = formatTimeUnit(hour);
//       const found = data.find((d) => {
//         const date = new Date(d.date_group);
//         const foundDate = date.getHours() === hour;
//         return foundDate;
//       });
//       newDataArray.push(
//         found
//           ? { ...found, date_group: hourString }
//           : {
//               date_group: hourString,
//               number_of_requests: 0,
//               total_cost: 0,
//               total_tokens: 0,
//               error_count: 0,
//               average_latency: 0,
//               api_key: data.api_key,
//               model: data.model,
//             }
//       );
//     }
//   };
//   switch (dateGroup) {
//     case "daily":
//       handleDailyCase();
//       break;

//     case "weekly":
//       for (let day = 0; day < 7; day++) {
//         const dayDate = new Date(timeFrame);
//         // Adjust the start date based on the current day of the week
//         dayDate.setDate(dayDate.getDate() - dayDate.getDay() + day);
//         const dateString = formatDateUnit(dayDate);
//         const found = data.find(
//           (d) => localeUtc(d.date_group).getDate() === dayDate.getDate()
//         );
//         newDataArray.push(
//           found
//             ? { ...found, date_group: dateString }
//             : {
//                 date_group: dateString,
//                 number_of_requests: 0,
//                 total_cost: 0,
//                 total_tokens: 0,
//                 error_count: 0,
//                 average_latency: 0,
//                 api_key: data.api_key,
//                 model: data.model,
//               }
//         );
//       }
//       break;
//     case "monthly":
//       const now = new Date(timeFrame);
//       // Get the number of days in the current month
//       const daysInMonth = new Date(
//         now.getFullYear(),
//         now.getMonth() + 1,
//         0
//       ).getDate();

//       for (let day = 1; day <= daysInMonth; day++) {
//         // Format the date string as MM/DD/YYYY
//         let date = new Date(now.getFullYear(), now.getMonth(), day);
//         const dayString = formatDateUnit(date);

//         const found = data.find((d) => {
//           const date = localeUtc(d.date_group);
//           return date.getDate() === day && date.getMonth() === now.getMonth();
//         });

//         newDataArray.push(
//           found
//             ? { ...found, date_group: dayString }
//             : {
//                 date_group: dayString,
//                 number_of_requests: 0,
//                 total_cost: 0,
//                 total_tokens: 0,
//                 error_count: 0,
//                 average_latency: 0,
//                 api_key: data.api_key,
//                 model: data.model,
//               }
//         );
//       }
//       break;

//     case "yearly":
//       for (let month = 0; month < 12; month++) {
//         // The start and end date will be offset by the timezone
//         // This will lead of offset in the month
//         // So we need to know the month in UTC.
//         const monthString = digitToMonth(month);
//         const found = data.find((d) => {
//           const date = localeUtc(d.date_group);
//           return date.getMonth() === month;
//         });
//         newDataArray.push(
//           found
//             ? { ...found, date_group: monthString }
//             : {
//                 date_group: monthString,
//                 number_of_requests: 0,
//                 total_cost: 0,
//                 total_tokens: 0,
//                 error_count: 0,
//                 average_latency: 0,
//                 api_key: data.api_key,
//                 model: data.model,
//               }
//         );
//       }
//       break;
//     default:
//       // Default case logic (if needed)
//       handleDailyCase();
//       break;
//   }

//   return newDataArray;
// };

const processBreakDownData = (
  data,
  isModel,
  timeRange,
  metric,
  type,
  timeFrame
) => {
  data = data.map((item) => {
    return { ...item, model: item.model || "Unknown model" };
  });

  const groupByDate = _.groupBy(data, ({ date_group }) => date_group);
  if (type === "average") {
    metric = metric.replace("total", "average");
  } else if (["p50", "p90", "p95", "p99"].includes(type)) {
    metric = metric.split("_")[1] + "_" + type.replace("p", "p_");
  }
  let returnData: any[] = [];
  Object.keys(groupByDate).forEach((key) => {
    const date_group = key;
    let obj: any = {};
    obj.date_group = date_group;

    groupByDate[key].forEach((item) => {
      const { date_group, timestamp, ...rest } = item;
      obj.timestamp = new Date(date_group).toString();
      const itemName = isModel ? rest.model : rest.organization_key__name;
      isModel ? delete rest.model : delete rest.organization_key__name;
      obj[itemName] = rest;
    });
    returnData.push(obj);
  });

  returnData = returnData.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  let modelKeys = [];
  returnData = returnData.map((item) => {
    const { date_group, timestamp, ...models } = item;
    const modelSection = {};
    modelKeys.push(...Object.keys(models));
    modelKeys = [...new Set(modelKeys)];
    Object.keys(models).forEach((modelKey) => {
      modelSection[modelKey] = models[modelKey][metric];
    });

    return { date_group, ...modelSection };
  });
  returnData = addMissingDate(returnData, timeRange, timeFrame);
  return returnData;
};

const getBreakDownColors = (data, metric, isModel) => {
  const sorted = data
    .sort((a, b) => a.metric - b.metric)
    .map((item) => (isModel ? item.model : item.organization_key__name));
  const colorMap = {};
  // modelKeys.forEach((key) => {
  //   colorMap[key] = colorTagsClasses[key];
  // });
  return colorMap;
};
