import {
  SET_USERSLOG_DATA_SORT_ORDERING,
  SET_USERS_LOG_DATA,
  SET_USERS_LOG_DATA_DISPLAY_COLUMNS,
  SET_USERS_LOG_DATA_LOADING,
  SET_USERS_LOG_DATA_SORT,
  SET_USERS_LOG_DATA_TIMERANGE,
  SET_AGGREGATION_DATA,
  SET_SIDEPANEL,
  SET_SELECTED_USER,
  SET_USERLOG_FILTER_OPTIONS,
  ADD_USERLOG_FILTER,
  UPDATE_USERLOG_FILTER,
  DELETE_USERLOG_FILTER,
  SET_USERLOG_FILTERS,
  SET_CURRENT_USERLOG_FILTER,
  SET_USERLOG_FILTER_TYPE,
} from "../actions/usersPageAction";
type UserLogData = {
  customerId: string;
  lastActive: string;
  activeFor: string;
  requests: number;
  tokens: number;
  sentiment: number;
  cost: number;
  topModel: string;
  cacheHits: number;
  averageLatency: number;
};
type State = {
  selectedID: string | null;
  loading: boolean;
  usersLogData: UserLogData[];
  sidepanel: boolean;
  aggregationData: {
    total_users: number;
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
  isEmpty: boolean;
  filters: any[];
  filterType: undefined;
  currentFilter: {
    id: string;
  };
  count: number;
  previous: any;
  next: any;
};
const initialState: State = {
  count: 0,
  previous: null,
  next: null,
  selectedID: null,
  loading: true,
  usersLogData: [],
  sidepanel: false,
  aggregationData: {
    total_users: 0,
    monthly_active_users: 0,
    daily_active_users: 0,
    new_users: 0,
    daily_request_per_user: 0,
    monthly_cost_per_user: 0,
  },
  sortKey: "customerId",
  sortOrder: "desc",
  timeRane: "all",
  isEmpty: false,
  displayColumns: [
    "customerId",
    "lastActive",
    "activeFor",
    "requests",
    "tokens",
    "costs",
    "sentiment",
  ],
  filters: [],
  filterType: undefined,
  currentFilter: {
    id: "",
  },
};

const usersPageReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_USERLOG_FILTER_OPTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedID: action.payload,
      };
    case SET_SIDEPANEL:
      return {
        ...state,
        sidepanel: action.payload,
      };
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
        aggregationData: { ...state.aggregationData, ...action.payload },
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
    // ===================================filters=================================
    case ADD_USERLOG_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case UPDATE_USERLOG_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if (filter.id === action.payload.id) {
            return action.payload;
          }
          return filter;
        }),
      };
    case DELETE_USERLOG_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.id !== action.payload),
      };
    case SET_USERLOG_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_CURRENT_USERLOG_FILTER:
      return {
        ...state,
        currentFilter: action.payload,
      };
    case SET_USERLOG_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };
    default:
      return state;
  }
};

export default usersPageReducer;
