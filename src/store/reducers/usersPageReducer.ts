import {
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
};
const initialState = {
  loading: true,
  usersLogData: [],
  filteredUsersLogData: [],
  sortKey: "customerId",
};

const usersPageReducer = (state = initialState, action: any): State => {
  switch (action.type) {
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
