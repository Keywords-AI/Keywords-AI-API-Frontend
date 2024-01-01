import {
  SET_DASHBOARD_DATA,
  SET_COST_DATA,
  SET_TOKEN_COUNT_DATA,
  SET_LATENCY_DATA,
  SET_REQUEST_COUNT_DATA,
  SET_DATE_DATA,
} from "src/store/actions";
const initState = {
  data: [],
  summary: {},
  costData: [],
  tokenCountData: [],
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
