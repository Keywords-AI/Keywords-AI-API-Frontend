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
  SET_API_DATA,
} from "src/store/actions";
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
  panelData: "number_of_requests",
  modelData: [
    // {
    //   model:"",
    //   total_cost:0,
    //   total_tokens:0,
    //   average_latency:0,
    //   number_of_requests:0,
    // }
  ],
  apiData: [],
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
    case SET_API_DATA:
      return { ...state, apiData: action.payload };
    default:
      return state;
  }
}
