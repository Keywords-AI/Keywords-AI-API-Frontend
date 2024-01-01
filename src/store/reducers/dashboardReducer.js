import {
  SET_DASHBOARD_DATA,
  SET_COST_DATA,
  SET_TOKEN_COUNT_DATA,
  SET_LATENCY_DATA,
  SET_REQUEST_COUNT_DATA,
  SET_DATE_DATA,
} from "src/store/actions";
const initState = {
  data: [
    {
      date_group: 20,
      total_cost: 5.6e-5,
      total_tokens: 30,
      average_latency: 0.23117351531982422,
      number_of_requests: 1,
    },
  ],
  summary: {
    total_cost: 5.6e-5,
    total_tokens: 30,
    average_latency: 0.23117351531982422,
    number_of_requests: 1,
  },
  costData: [
    { total_cost: 0.03, date_group: 20},
    { total_cost: 0.02, date_group: 21},
    { total_cost: 0.05, date_group: 22},
    { total_cost: 0.5, date_group: 23},
    { total_cost: 0.2, date_group: 24},
    { total_cost: 0.05, date_group: 25},
    { total_cost: 0.05, date_group: 26},
    { total_cost: 0.05, date_group: 27},
    { total_cost: 0.05, date_group: 28},
    { total_cost: 0.05, date_group: 29},
  ],
  tokenCountData: [
    { total_tokens: 0.03, date_group: 20},
    { total_tokens: 0.02, date_group: 21},
    { total_tokens: 0.05, date_group: 22},
    { total_tokens: 0.5, date_group: 23},
    { total_tokens: 0.2, date_group: 24},
    { total_tokens: 0.05, date_group: 25},
    { total_tokens: 0.05, date_group: 26},
    { total_tokens: 0.05, date_group: 27},
    { total_tokens: 0.05, date_group: 28},
    { total_tokens: 0.05, date_group: 29},
  ],
  latencyData: [],
  requestCountData: [],
};

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return { ...state, ...action.payload };
    case SET_COST_DATA:
      return { ...state, costData: action.payload };
    case SET_TOKEN_COUNT_DATA:
      return { ...state, tokenCountData: action.payload };
    case SET_LATENCY_DATA:
      return { ...state, latencyData: action.payload };
    case SET_REQUEST_COUNT_DATA:
      return { ...state, requestCountData: action.payload };
    case SET_DATE_DATA:
      return { ...state, dateData: action.payload };
    default:
      return state;
  }
}
