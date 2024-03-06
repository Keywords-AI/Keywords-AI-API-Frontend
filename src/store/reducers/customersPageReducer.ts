import {
  SET_CUSTOMERS_LOG_DATA_SORT_ORDERING,
  SET_CUSTOMERS_LOG_DATA,
  SET_CUSTOMERS_LOG_DATA_LOADING,
  SET_CUSTOMERS_LOG_DATA_SORT,
} from "../actions/customersPageAction";
type CustomerLogData = {
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
  customersLogData: CustomerLogData[];
  filteredCustomersLogData: CustomerLogData[];
  sortKey: string;
  sortOrder: string;
};
const initialState = {
  loading: true,
  customersLogData: [],
  filteredCustomersLogData: [],
  sortKey: "customerId",
  sortOrder: "asc",
};

const customersPageReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_CUSTOMERS_LOG_DATA_SORT_ORDERING:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SET_CUSTOMERS_LOG_DATA_SORT:
      return {
        ...state,
        sortKey: action.payload,
      };
    case SET_CUSTOMERS_LOG_DATA:
      return {
        ...state,
        customersLogData: action.payload,
      };
    case SET_CUSTOMERS_LOG_DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default customersPageReducer;
