import {
  SET_USERSLOG_DATA_SORT_ORDERING,
  SET_USERS_LOG_DATA,
  SET_USERS_LOG_DATA_LOADING,
  SET_USERS_LOG_DATA_SORT,
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
  sortKey: string;
  sortOrder: string;
};
const initialState = {
  loading: true,
  usersLogData: [],
  filteredUsersLogData: [],
  sortKey: "customerId",
  sortOrder: "asc",
};

const usersPageReducer = (state = initialState, action: any): State => {
  switch (action.type) {
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
