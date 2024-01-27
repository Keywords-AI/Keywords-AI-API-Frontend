import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
  SET_SELECTED_REQUEST,
  SET_SIDE_PANEL_OPEN,
  SET_DISPLAY_COLUMNS,
  SET_FILTER_OPEN,
  SET_FIRST_FILTER ,
  SET_SECOND_FILTER,
  SET_FILTERS,
  SET_CURRENT_FILTER,
  SET_PAGINATION,
  SET_PAGE_NUMBER,
  SET_API_KEY,
  SET_MODEL,
} from "src/store/actions/requestLogActions";
import { LogItem } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { LogColumnKey } from "src/types";
import { defaultRequestLogColumns } from "src/utilities/constants";

type StateType = {
  logs: LogItem[];
  count: number;
  currentPage: number;
  nextPageUrl: string | null;
  lastPageUrl: string | null;
  selectedRequest: LogItem | undefined;
  sidePanelOpen: boolean;
  displayColumns: LogColumnKey[];
  filterOpen: boolean;
  firstFilter: LogColumnKey | undefined;
  secondFilter: string | undefined;
  filters: any[];
  currentFilter: any;
  keys: any[];
  models: any[];
};

const initState: StateType = {
  logs: [],
  count: 0,
  currentPage: 1,
  nextPageUrl: null,
  lastPageUrl: null,
  selectedRequest: undefined,
  sidePanelOpen: false,
  displayColumns: defaultRequestLogColumns,
  firstFilter: undefined,
  secondFilter: undefined,
  filterOpen: false,
  filters: [],
  currentFilter: {},
  keys: [],
  models: [],
};


export default function requestLogReducer(
  state = initState,
  action: PayloadAction<any>
): StateType {
  switch (action.type) {
    case GET_REQUEST_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case SET_REQUEST_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case SET_SELECTED_REQUEST:
      return {
        ...state,
        selectedRequest: state.logs.find((log) => log.id === action.payload),
      };
    case SET_SIDE_PANEL_OPEN:
      return {
        ...state,
        sidePanelOpen: action.payload,
      };
    case SET_DISPLAY_COLUMNS:
      return {
        ...state,
        displayColumns: action.payload,
      };
    case SET_FILTER_OPEN:
      return {
        ...state,
        filterOpen: action.payload,
      };
    case SET_FIRST_FILTER:
      return {
        ...state,
        firstFilter: action.payload,
      };
    case SET_SECOND_FILTER:
      return {
        ...state,
        secondFilter: action.payload,
      };
    case SET_CURRENT_FILTER:
      const filters = state.filters.map((filter)=> {
        if (filter.id === action.payload.id) {
          filter = action.payload;
        }
        return filter;
      })
      return {
        ...state,
        currentFilter: action.payload,
        filters: filters
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_API_KEY:
      return {
        ...state,
        keys: action.payload,
      };
    case SET_MODEL:
      return {
        ...state,
        models: action.payload,
      };
    case SET_PAGINATION:
      return {
        ...state,
        count: action.payload.count,
        nextPageUrl: action.payload.nextPageUrl,
        lastPageUrl: action.payload.lastPageUrl,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}
