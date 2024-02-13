import { get, set } from "react-hook-form";
import { keywordsFetch } from "src/services/apiConfig";
import { Metrics, colorTagsClasses } from "src/utilities/constants";
import { getQueryParam, setQueryParams } from "src/utilities/navigation";
import {
  sliceChartData,
  formatDate,
  getColorMap,
  addMissingDate,
} from "src/utilities/objectProcessing";
import { keywordsRequest } from "src/utilities/requests";
import _ from "lodash";
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

export const getDashboardData = (
  overrideParams // search string
) => {
  return (dispatch, getState) => {
    let params = new URLSearchParams(window.location.search);
    if (overrideParams) {
      params = new URLSearchParams(overrideParams);
    }
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
    const startTime = performance.now();
    const currDate = new Date();
    const timeOffset = currDate.getTimezoneOffset() / 60;
    params.set("timezone_offset", timeOffset);
    const date = new Date(getState().dashboard.timeFrame);
    params.set("date", date.toISOString()); // format: yyyy-mm-dd
    keywordsRequest({
      path: `api/dashboard?${params.toString()}`,
    })
      .then((data) => {
        const endTime = performance.now(); // End time

        console.log(`Time taken  for fetch: ${endTime - startTime} ms`); // Time difference in milliseconds
        dispatch(setDashboardData(data));

        if (params.get("breakdown") === "by_model") {
          const breakDowndata = processBreakDownData(
            data.model_breakdown,
            true,
            params.get("summary_type"),
            params.get("metric"),
            getState().dashboard.timeFrame
          );
          dispatch(setGroupByData(breakDowndata));
        } else if (params.get("breakdown") === "by_key") {
          const breakDowndata = processBreakDownData(
            data.key_breakdown,
            false,
            params.get("summary_type"),
            params.get("metric"),
            getState().dashboard.timeFrame
          );
          dispatch(setGroupByData(breakDowndata));
        }

        const dataList = fillMissingDate(
          data?.data,
          params.get("summary_type"),
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
        const endTime2 = performance.now(); // End time
        console.log(`Time taken for process: ${endTime2 - endTime} ms`); // Time difference in milliseconds
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export const fillMissingDate = (data, dateGroup, timeFrame) => {
  const newDataArray = [];
  const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");
  // localeUTC: given a UTC timestamp, return the UTC time when the local time is the same as the given timestamp
  const localeUtc = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  };
  const handleDailyCase = () => {
    const now = new Date(timeFrame);

    // BE gives UTC strings, Date() converts to local timezone
    // The hours are accurate, but the date is not
    for (let hour = 0; hour < 24; hour++) {
      const hourString = formatTimeUnit(hour) + ":00";
      const found = data.find((d) => {
        const date = new Date(d.date_group);
        const foundDate =
          date.getHours() === hour && date.getDate() === now.getDate(); //@ruifeng
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
              error_count: 0,
              average_latency: 0,
              api_key: data.api_key,
              model: data.model,
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
        const dayDate = new Date(timeFrame);
        // Adjust the start date based on the current day of the week
        dayDate.setDate(dayDate.getDate() - dayDate.getDay() + day);
        const dateString = `${formatTimeUnit(
          dayDate.getMonth() + 1
        )}/${formatTimeUnit(dayDate.getDate())}/${dayDate
          .getFullYear()
          .toString()
          .slice(-2)}`;
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
                error_count: 0,
                average_latency: 0,
                api_key: data.api_key,
                model: data.model,
              }
        );
      }
      break;
    case "monthly":
      const now = new Date(timeFrame);
      // Get the number of days in the current month
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        // Format the date string as MM/DD/YYYY
        const month = formatTimeUnit(now.getMonth() + 1); // Month is 0-indexed
        const year = now.getFullYear().toString().slice(-2);
        const dayString = `${month}/${formatTimeUnit(day)}/${year}`;

        const found = data.find((d) => {
          const date = localeUtc(d.date_group);
          return date.getDate() === day && date.getMonth() === now.getMonth();
        });

        newDataArray.push(
          found
            ? { ...found, date_group: dayString }
            : {
                date_group: dayString,
                number_of_requests: 0,
                total_cost: 0,
                total_tokens: 0,
                error_count: 0,
                average_latency: 0,
                api_key: data.api_key,
                model: data.model,
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
          const date = localeUtc(d.date_group);
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
                error_count: 0,
                average_latency: 0,
                api_key: data.api_key,
                model: data.model,
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

export const getgroupByData = (data, isbyModel, timeRange = "daily") => {
  // this function returns the data grouped by date_group and model or api_key:
  //[{name: "2021-07-21T00:00:00.000Z",
  //modelname:{metrics...}}]
  // https://recharts.org/en-US/examples/StackedBarChart
  // Group data by date_group
  data = data.map((item) => {
    let newDateGroup = new Date(item.timestamp);

    // timeRange = "monthly";
    if (timeRange === "yearly") {
      newDateGroup = (new Date(item.timestamp).getMonth() + 1)
        .toString()
        .padStart(2, "0");
    } else if (timeRange === "monthly") {
      newDateGroup = new Date(item.timestamp).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
    } else if (timeRange === "weekly") {
      newDateGroup = new Date(item.timestamp).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
    } else {
      newDateGroup = new Date(item.timestamp).getHours() + ":00";
    }
    return { ...item, date_group: newDateGroup };
  });
  const by_date_group = _.groupBy(data, ({ date_group }) => date_group);
  const byModel = {};
  // Group data by model or api_key
  const groupByCallback = isbyModel
    ? ({ model }) => (model == "" ? "unknown model" : model)
    : ({ api_key }) => api_key;
  Object.keys(by_date_group).forEach((key) => {
    const updatedItem = _.groupBy(by_date_group[key], groupByCallback);
    Object.keys(updatedItem).forEach((key) => {
      // Aggregate the data for each model
      // let request = updatedItem[key].length()
      updatedItem[key] = updatedItem[key].reduce((accumulator, current) => {
        accumulator.prompt_tokens =
          (accumulator.prompt_tokens || 0) + current.prompt_tokens;
        accumulator.completion_tokens =
          (accumulator.completion_tokens || 0) + current.completion_tokens;
        accumulator.latency = (accumulator.latency || 0) + current.latency;
        accumulator.cost = (accumulator.cost || 0) + current.cost;
        accumulator.error_count =
          (accumulator.failed === true ? 1 : 0) + current.error_count || 0;
        accumulator.timestamp = current.timestamp;
        accumulator.number_of_requests =
          (accumulator.number_of_requests || 0) + 1;
        return accumulator;
      }, {});
      // Calculate the average and change naming
      updatedItem[key].total_cost = updatedItem[key].cost;
      delete updatedItem[key].cost;
      // updatedItem[key].number_of_requests = request;
      updatedItem[key].total_prompt_tokens = updatedItem[key].prompt_tokens;
      delete updatedItem[key].prompt_tokens;
      updatedItem[key].total_completion_tokens =
        updatedItem[key].completion_tokens;
      delete updatedItem[key].completion_tokens;
      updatedItem[key].average_latency =
        updatedItem[key].latency / updatedItem[key].number_of_requests;
      delete updatedItem[key].latency;
      updatedItem[key].total_tokens =
        updatedItem[key].total_prompt_tokens +
        updatedItem[key].total_completion_tokens;
    });
    byModel[key] = updatedItem;
  });
  const returnData = Object.keys(byModel)
    .map((key) => {
      let time;
      if (key.includes(":")) {
        time = new Date();
        time.setHours(key.split(":")[0]);
      } else {
        time = new Date(key);
      }
      return {
        name: key,
        timestamp: time.toString(),
        ...byModel[key],
      };
    })
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return returnData;
};

const processBreakDownData = (data, isModel, timeRange, metric, timeFrame) => {
  const localTimeData = data.map((item) => {
    let newDateGroup = new Date(item.date_group);

    if (timeRange === "yearly") {
      newDateGroup = (new Date(item.date_group).getMonth() + 1)
        .toString()
        .padStart(2, "0");
    } else if (timeRange === "monthly") {
      newDateGroup = new Date(item.date_group).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
    } else if (timeRange === "weekly") {
      newDateGroup = new Date(item.date_group).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
    } else {
      newDateGroup = new Date(item.date_group).getHours() + ":00";
    }
    return {
      ...item,
      date_group: newDateGroup,
      timestamp: new Date(item.date_group).toString(),
    };
  });
  const groupByDate = _.groupBy(localTimeData, ({ date_group }) => date_group);
  let returnData = [];
  Object.keys(groupByDate).forEach((key) => {
    const date_group = key;
    let obj = {};
    obj.date_group = date_group;

    groupByDate[key].forEach((item) => {
      const { date_group, timestamp, ...rest } = item;
      obj.timestamp = new Date(timestamp).toString();
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
    // console.log("modelKeys", modelKeys);
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
  // console.log("sorted", sorted);
  const colorMap = {};
  // modelKeys.forEach((key) => {
  //   colorMap[key] = colorTagsClasses[key];
  // });
  return colorMap;
};
