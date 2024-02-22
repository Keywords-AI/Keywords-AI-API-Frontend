import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
  SET_SELECTED_REQUEST,
  SET_SIDE_PANEL_OPEN,
  SET_DISPLAY_COLUMNS,
  SET_FILTER_OPEN,
  SET_FILTER_TYPE,
  SET_FILTERS,
  ADD_FILTER,
  SET_PAGINATION,
  SET_PAGE_NUMBER,
  SET_API_KEY,
  SET_MODEL,
  SET_FILTER_OPTIONS,
  DELETE_FILTER,
  UPDATE_FILTER,
  SET_CURRENT_FILTER,
  SET_SELECTED_REQUEST_CONTENT,
  START_GET_REQUEST_LOGS,
  SET_JSON_MODE,
} from "src/store/actions/requestLogActions";
import { LogItem } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { LogColumnKey } from "src/types";
import { defaultRequestLogColumns } from "src/utilities/constants";
import { FilterObject, RawFilterOptions, CurrentFilterObject } from "src/types";

type StateType = {
  logs: LogItem[];
  count: number;
  totalCount: number;
  loading: boolean;
  currentPage: number;
  nextPageUrl: string | null;
  lastPageUrl: string | null;
  selectedRequest: LogItem | undefined;
  sidePanelOpen: boolean;
  jsonMode: boolean;
  displayColumns: LogColumnKey[];
  filterOpen: boolean;
  filters: FilterObject[];
  keys: any[];
  models: any[];
  filterType: keyof LogItem | undefined;
  currentFilter: CurrentFilterObject;
  filterOptions: RawFilterOptions; // Passed from backend
};

const initState: StateType = {
  logs: [],
  count: 0,
  loading: true,
  totalCount: 0,
  currentPage: 1,
  nextPageUrl: null,
  lastPageUrl: null,
  selectedRequest: undefined,
  sidePanelOpen: false,
  jsonMode: false,
  displayColumns: defaultRequestLogColumns,
  filterOpen: false,
  filterType: undefined,
  currentFilter: {
    id: "",
  },
  filters: [],
  keys: [],
  models: [],
  filterOptions: {},
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
    case START_GET_REQUEST_LOGS:
      return {
        ...state,
        loading: true,
      };
    case SET_REQUEST_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    case SET_SELECTED_REQUEST:
      return {
        ...state,
        selectedRequest: state.logs.find((log) => log.id === action.payload),
      };
    case SET_SELECTED_REQUEST_CONTENT:
      return {
        ...state,
        selectedRequest: { ...action.payload },
      };
    case SET_JSON_MODE:
      return {
        ...state,
        jsonMode: action.payload,
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
    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case SET_CURRENT_FILTER:
      return {
        ...state,
        currentFilter: action.payload,
      };
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if (filter.id === action.payload.id) {
            return action.payload;
          }
          return filter;
        }),
      };
    case DELETE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((filter) => filter.id !== action.payload),
      };
    case SET_API_KEY:
      return {
        ...state,
        keys: action.payload,
      };
    case SET_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: action.payload,
      };
    case SET_MODEL:
      return {
        ...state,
        models: action.payload,
      };
    case SET_PAGINATION:
      return {
        ...state,
        ...action.payload,
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
