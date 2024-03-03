import {
  SET_USERSLOG_DATA_SORT_ORDERING,
  SET_USERS_LOG_DATA,
  SET_USERS_LOG_DATA_DISPLAY_COLUMNS,
  SET_USERS_LOG_DATA_LOADING,
  SET_USERS_LOG_DATA_SORT,
  SET_USERS_LOG_DATA_TIMERANGE,
  SET_AGGREGATION_DATA,
} from "../actions/usersPageAction";
type UserLogData = {
  customerId: string;
  lastActive: Date;
  activeFor: string;
  totalRequests: number;
  requestsPerDay: number;
  totalTokens: number;
  tokensPerDay: number;
};
type State = {
  loading: boolean;
  usersLogData: UserLogData[];
  filteredUsersLogData: UserLogData[];
  aggregationData: {
    total_count: number;
    monthly_active_users: number;
    daily_active_users: number;
    new_users: number;
    daily_request_per_user: number;
    monthly_cost_per_user: number;
  };
  sortKey: string;
  sortOrder: string;
  timeRane: string;
  displayColumns: string[];
};
const initialState = {
  loading: true,
  usersLogData: [],
  aggregationData: {
    total_count: 0,
    monthly_active_users: 0,
    daily_active_users: 0,
    new_users: 0,
    daily_request_per_user: 0,
    monthly_cost_per_user: 0,
  },
  filteredUsersLogData: [],
  sortKey: "customerId",
  sortOrder: "asc",
  timeRane: "daily",
  displayColumns: [
    "customerId",
    "lastActive",
    "activeFor",
    "totalRequests",
    "requests",
    "totalTokens",
    "tokens",
  ],
};

const usersPageReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_USERS_LOG_DATA_DISPLAY_COLUMNS:
      return {
        ...state,
        displayColumns: ["customerId", ...action.payload],
      };
    case SET_USERS_LOG_DATA_TIMERANGE:
      return {
        ...state,
        timeRane: action.payload,
      };
    case SET_AGGREGATION_DATA:
      return {
        ...state,
        aggregationData: {...state.aggregationData, ...action.payload},
      };
    case SET_USERSLOG_DATA_SORT_ORDERING:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SET_USERS_LOG_DATA_SORT:
      return {
        ...state,
        sortKey: action.payload,
      };
    case SET_USERS_LOG_DATA:
      return {
        ...state,
        usersLogData: action.payload,
      };
    case SET_USERS_LOG_DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default usersPageReducer;
