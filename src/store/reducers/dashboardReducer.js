import {
  SET_DASHBOARD_DATA,
  SET_COST_DATA,
  SET_TOKEN_COUNT_DATA,
  SET_LATENCY_DATA,
  SET_REQUEST_COUNT_DATA,
  SET_DATE_DATA,
  SET_ERROR_DATA,
  SET_PANEL_DATA,
  SET_MODEL_DATA,
  SET_API_DATA,
} from "src/store/actions";
const initState = {
  dataByDate: [
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
    total_tokens: 0,
    average_latency: 0,
    number_of_requests: 0,
  },
  costData: [
    // {total_cost, date_group}
  ],
  tokenCountData: [
    // {total_tokens, date_group}
  ],
  latencyData: [
    // {average_latency, date_group}
  ],
  requestCountData: [
    // {number_of_requests, date_group}
  ],
  errorCountData: [],
  panelData: [],
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
    case SET_TOKEN_COUNT_DATA:
      return { ...state, tokenCountData: action.payload };
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
