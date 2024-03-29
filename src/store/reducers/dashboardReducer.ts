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
  SET_MODEL_COLORS,
  SET_KEY_COLORS,
  SET_SENTIMENT_SUMMARY_DATA,
  SET_SENTIMENT_DATA,
  RESET_TIME_FRAME_OFFSET,
  SET_DASHBOARD_LOADING,
  SET_DASHBOARD_FILTER_OPTIONS,
  SET_DASHBOARD_CURRENT_FILTER,
  ADD_DASHBOARD_FILTER,
  SET_DASHBOARD_FILTER_OPEN,
  SET_DASHBOARD_FILTER_TYPE,
  SET_DASHBOARD_FILTERS,
  UPDATE_DASHBOARD_FILTER,
  DELETE_DASHBOARD_FILTER,
  SET_AVG_TTFT_DATA,
  SET_TPS_DATA,
  SET_MODELS_DISPLAY_CHARTS,
  REMOVE_FROM_MODELS_DISPLAY_CHARTS,
  SET_TOTAL_USERS_DATA,
  SET_ACTIVE_USERS_DATA,
  SET_AVERAGE_COST_PER_USE_DATA,
  SET_AVERAGE_USER_SENTIMENT_DATA,
} from "src/store/actions";
import { FilterObject, FilterParams } from "src/types";

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

let currDate = new Date();

const initState = {
  loading: true,
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
  ttftData: [],
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
  totalUsersData: [],
  activeUsersData: [],
  averageCostPerUserData: [],
  averageUserSentimentData: [],
  filterOpen: false,
  filterType: undefined,
  currentFilter: {
    id: "",
    metric: undefined,
  },
  filters: [] as FilterObject[],
  filterOptions: {} as FilterParams,
  avgModelData: [],
  apiData: [],
  tpsData: [],
  avgApiData: [],
  displayFilter: loadFilter(),
  groupByData: [],
  p50Data: [],
  p90Data: [],
  p95Data: [],
  p99Data: [],
  timeFrame: new Date(
    currDate - currDate.getTimezoneOffset() * 60 * 1000
  ).toISOString(),
  timeOffset: 0,
  modelColors: {},
  keyColors: {},
  hasNext: true,
  sentimentSummaryData: [
    {
      sentiment: "positive",
      value: 5454,
    },
    {
      sentiment: "negative",
      value: 1087,
    },
    {
      sentiment: "neutral",
      value: 3589,
    },
  ],
  sentimentData: [
    {
      date_group: "2024-01-10 00:00:00+00:0",
      positive: 500,
      negative: 200,
      neutral: 300,
    },
    {
      date_group: "2024-01-11 00:00:00+00:0",
      positive: 400,
      negative: 100,
      neutral: 200,
    },
    {
      date_group: "2024-01-12 00:00:00+00:0",
      positive: 300,
      negative: 300,
      neutral: 100,
    },
    {
      date_group: "2024-01-13 00:00:00+00:0",
      positive: 200,
      negative: 400,
      neutral: 400,
    },
    {
      date_group: "2024-01-14 00:00:00+00:0",
      positive: 100,
      negative: 500,
      neutral: 500,
    },
    {
      date_group: "2024-01-15 00:00:00+00:0",
      positive: 0,
      negative: 600,
      neutral: 600,
    },
  ],
  modelDisplayCharts: JSON.parse(
    localStorage.getItem("modelDisplayCharts") || "null"
  ) || ["average_latency", "total_cost", "total_tokens"],
};

type DashboardState = typeof initState;

export default function dashboardReducer(
  state = initState,
  action
): DashboardState {
  let newState = null;
  switch (action.type) {
    case REMOVE_FROM_MODELS_DISPLAY_CHARTS:
      newState = state.modelDisplayCharts.filter(
        (chart) => chart !== action.payload
      );
      localStorage.setItem("modelDisplayCharts", JSON.stringify(newState));
      return {
        ...state,
        modelDisplayCharts: newState,
      };
    case SET_MODELS_DISPLAY_CHARTS:
      newState = action.payload;
      localStorage.setItem("modelDisplayCharts", JSON.stringify(newState));
      return { ...state, modelDisplayCharts: action.payload };
    case SET_TPS_DATA:
      return { ...state, tpsData: action.payload };
    case SET_DASHBOARD_LOADING:
      return { ...state, loading: action.payload };
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
    case SET_AVG_TTFT_DATA:
      return { ...state, ttftData: action.payload };
    case SET_AVG_MODEL_DATA:
      return { ...state, avgModelData: action.payload };
    case SET_API_DATA:
      return { ...state, apiData: action.payload };
    case SET_AVG_API_DATA:
      return { ...state, avgApiData: action.payload };
    case SET_SENTIMENT_SUMMARY_DATA:
      return { ...state, sentimentSummaryData: action.payload };
    case SET_SENTIMENT_DATA:
      return { ...state, sentimentData: action.payload };
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
    case SET_MODEL_COLORS:
      return { ...state, modelColors: { ...action.payload } };
    case SET_KEY_COLORS:
      return { ...state, keyColors: { ...action.payload } };
    case SET_P50_DATA:
      return { ...state, p50Data: action.payload };
    case SET_P90_DATA:
      return { ...state, p90Data: action.payload };
    case SET_P95_DATA:
      return { ...state, p95Data: action.payload };
    case SET_P99_DATA:
      return { ...state, p99Data: action.payload };
    case SET_TIME_FRAME_OFFSET:
      const offset = Number(action.payload);

      let updatedTimeFrame;
      const currTime = state.timeFrame;
      switch (state.displayFilter.timeRange) {
        case "yearly":
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setFullYear(updatedTimeFrame.getFullYear() + offset);
          break;
        case "yearly_by_week":
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setFullYear(updatedTimeFrame.getFullYear() + offset);
          break;
        case "monthly":
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setMonth(updatedTimeFrame.getMonth() + offset);
          break;
        case "weekly":
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setDate(updatedTimeFrame.getDate() + offset * 7);
          break;
        case "quarterly":
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setMonth(updatedTimeFrame.getMonth() + offset * 3);
          break;
        default:
          updatedTimeFrame = new Date(currTime);
          updatedTimeFrame.setHours(12, 0, 0, 0);
          updatedTimeFrame.setDate(updatedTimeFrame.getDate() + offset);
      }
      return {
        ...state,
        timeOffset: state.timeOffset + Number(action.payload),
        timeFrame: new Date(
          updatedTimeFrame - updatedTimeFrame.getTimezoneOffset() * 60 * 1000
        ).toISOString(),
      };
    case RESET_TIME_FRAME_OFFSET:
      currDate = new Date();

      return {
        ...state,
        timeOffset: 0,
        timeFrame: new Date(
          currDate - currDate.getTimezoneOffset() * 60 * 1000
        ).toISOString(),
      };

    case ADD_DASHBOARD_FILTER:
      return { ...state, filters: [...state.filters, action.payload] };
    case SET_DASHBOARD_FILTER_OPEN:
      return {
        ...state,
        filterOpen: action.payload,
      };
    case SET_DASHBOARD_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };
    case SET_DASHBOARD_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_DASHBOARD_CURRENT_FILTER:
      return {
        ...state,
        currentFilter: action.payload,
      };
    case ADD_DASHBOARD_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case UPDATE_DASHBOARD_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if (filter.id === action.payload.id) {
            return action.payload;
          }
          return filter;
        }),
      };
    case DELETE_DASHBOARD_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.id !== action.payload),
      };

    case SET_DASHBOARD_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: action.payload,
      };
    case SET_TOTAL_USERS_DATA:
      return {
        ...state,
        totalUsersData: action.payload,
      };
    case SET_ACTIVE_USERS_DATA:
      return {
        ...state,
        activeUsersData: action.payload,
      };
    case SET_AVERAGE_COST_PER_USE_DATA:
      return {
        ...state,
        averageCostPerUserData: action.payload,
      };
    case SET_AVERAGE_USER_SENTIMENT_DATA:
      return {
        ...state,
        averageUserSentimentData: action.payload,
      };
    default:
      return state;
  }
}
