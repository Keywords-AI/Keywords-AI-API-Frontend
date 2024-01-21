import {
  SET_DASHBOARD_DATA,
  SET_COST_DATA,
  SET_AVG_COST_DATA,
  SET_TOKEN_COUNT_DATA,
  SET_AVG_TOKEN_COUNT_DATA,
  SET_PROMPT_TOKEN_COUNT_DATA,
  SET_AVG_PROMPT_TOKEN_COUNT_DATA,
  SET_COMPLETION_TOKEN_COUNT_DATA,
  SET_AVG_COMPLETION_TOKEN_COUNT_DATA,
  SET_LATENCY_DATA,
  SET_REQUEST_COUNT_DATA,
  SET_DATE_DATA,
  SET_ERROR_DATA,
  SET_PANEL_DATA,
  SET_MODEL_DATA,
  SET_AVG_MODEL_DATA,
  SET_API_DATA,
  SET_AVG_API_DATA,
  SET_DISPLAY_METRIC,
  SET_DISPLAY_BREAKDOWN,
  SET_DISPLAY_TYPE,
  SET_DISPLAY_TIME_RANGE,
  SET_GROUP_BY_DATA,
  SET_P50_DATA,
  SET_P90_DATA,
  SET_P95_DATA,
  SET_P99_DATA,
  SET_TIME_FRAME_OFFSET,
} from "src/store/actions";

const loadFilter = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const metric = urlParams.get("metric");
  const type = urlParams.get("type");
  const breakDown = urlParams.get("breakdown");
  const timeRange = urlParams.get("summary_type");
  // Use the retrieved values from the URL parameters
  // to set the displayFilter in the state
  return {
    metric: metric || "number_of_requests",
    type: type || "total",
    breakDown: breakDown || "none",
    timeRange: timeRange || "daily",
  };
};

const currDate = new Date();

const initState = {
  data: [
    // {
    //   date_group: 20,
    //   total_cost: 5.6e-5,
    //   total_tokens: 30,
    //   average_latency: 0.23117351531982422,
    //   number_of_requests: 1,
    // },
  ],
  summary: {
    total_cost: 0,
    average_cost: 0,
    total_tokens: 0,
    average_tokens: 0,
    total_prompt_tokens: 0,
    average_prompt_tokens: 0,
    total_completion_tokens: 0,
    average_completion_tokens: 0,
    average_latency: 0,
    number_of_requests: 0,
    latency_p_50: 0,
    latency_p_90: 0,
    latency_p_95: 0,
    latency_p_99: 0,
  },
  costData: [
    // {total_cost, date_group}
  ],
  avgCostData: [],
  tokenCountData: [
    // {total_tokens, date_group}
  ],
  avgTokenCountData: [
    // {total_tokens, date_group}
  ],
  promptTokenCountData: [
    // {total_prompt_tokens, date_group}
  ],
  avgPromptTokenCountData: [
    // {total_prompt_tokens, date_group}
  ],
  completionTokenCountData: [
    // {total_completion_tokens, date_group}
  ],
  avgCompletionTokenCountData: [],
  latencyData: [
    // {average_latency, date_group}
  ],
  requestCountData: [
    // {number_of_requests, date_group}
  ],
  errorCountData: [],
  modelData: [
    // {
    //   model:"",
    //   total_cost:0,
    //   total_tokens:0,
    //   average_latency:0,
    //   number_of_requests:0,
    // }
  ],
  avgModelData: [],
  apiData: [],
  avgApiData: [],
  displayFilter: loadFilter(),
  groupByData: {},
  p50Data: [],
  p90Data: [],
  p95Data: [],
  p99Data: [],
  timeFrame: new Date(
    currDate - currDate.getTimezoneOffset() * 60 * 1000
  ).toISOString(),
  timeOffset: 0,
};

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return { ...state, ...action.payload };
    case SET_COST_DATA:
      return { ...state, costData: action.payload };
    case SET_AVG_COST_DATA:
      return { ...state, avgCostData: action.payload };
    case SET_TOKEN_COUNT_DATA:
      return { ...state, tokenCountData: action.payload };
    case SET_AVG_TOKEN_COUNT_DATA:
      return { ...state, avgTokenCountData: action.payload };
    case SET_PROMPT_TOKEN_COUNT_DATA:
      return { ...state, promptTokenCountData: action.payload };
    case SET_AVG_PROMPT_TOKEN_COUNT_DATA:
      return { ...state, avgPromptTokenCountData: action.payload };
    case SET_COMPLETION_TOKEN_COUNT_DATA:
      return { ...state, completionTokenCountData: action.payload };
    case SET_AVG_COMPLETION_TOKEN_COUNT_DATA:
      return { ...state, avgCompletionTokenCountData: action.payload };
    case SET_LATENCY_DATA:
      return { ...state, latencyData: action.payload };
    case SET_REQUEST_COUNT_DATA:
      return { ...state, requestCountData: action.payload };
    case SET_DATE_DATA:
      return { ...state, dateData: action.payload };
    case SET_ERROR_DATA:
      return { ...state, errorCountData: action.payload };
    case SET_PANEL_DATA:
      return { ...state, panelData: action.payload };
    case SET_MODEL_DATA:
      return { ...state, modelData: action.payload };
    case SET_AVG_MODEL_DATA:
      return { ...state, avgModelData: action.payload };
    case SET_API_DATA:
      return { ...state, apiData: action.payload };
    case SET_AVG_API_DATA:
      return { ...state, avgApiData: action.payload };
    case SET_DISPLAY_METRIC:
      return {
        ...state,
        displayFilter: { ...state.displayFilter, metric: action.payload },
      };
    case SET_DISPLAY_BREAKDOWN:
      return {
        ...state,
        displayFilter: { ...state.displayFilter, breakDown: action.payload },
      };
    case SET_DISPLAY_TYPE:
      return {
        ...state,
        displayFilter: { ...state.displayFilter, type: action.payload },
      };
    case SET_DISPLAY_TIME_RANGE:
      return {
        ...state,
        displayFilter: { ...state.displayFilter, timeRange: action.payload },
      };
    case SET_GROUP_BY_DATA:
      return { ...state, groupByData: action.payload };

    case SET_P50_DATA:
      return { ...state, p50Data: action.payload };
    case SET_P90_DATA:
      return { ...state, p90Data: action.payload };
    case SET_P95_DATA:
      return { ...state, p95Data: action.payload };
    case SET_P99_DATA:
      return { ...state, p99Data: action.payload };
    case SET_TIME_FRAME_OFFSET:
      const { offsetType, currTime, offset } = action.payload;
      console.log(offsetType, currTime, offset);
      switch (offsetType) {
        case "yearly":
          let newYear = new Date(currTime).setFullYear(
            new Date(currTime).getFullYear() + offset
          );

          newYear = new Date(newYear).toISOString();
          return {
            ...state,
            timeFrame: newYear,
            timeOffset: state.timeOffset + offset,
          };
        case "monthly":
          let newMonth = new Date(currTime).setMonth(
            new Date(currTime).getMonth() + offset
          );
          newMonth = new Date(newMonth).toISOString();
          return {
            ...state,
            timeFrame: newMonth,
            timeOffset: state.timeOffset + offset,
          };
        case "weekly":
          let newWeek = new Date(currTime).setDate(
            new Date(currTime).getDate() + offset * 7
          );
          newWeek = new Date(newWeek).toISOString();

          return {
            ...state,
            timeFrame: newWeek,
            timeOffset: state.timeOffset + offset,
          };
        default:
          let newDate = new Date(currTime).setDate(
            new Date(currTime).getDate() + offset
          );
          newDate = new Date(newDate).toISOString();

          return {
            ...state,
            timeFrame: newDate,
            timeOffset: state.timeOffset + offset,
          };
      }

    default:
      return state;
  }
}
