import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
  SET_SELECTED_REQUEST,
  SET_SIDE_PANEL_OPEN,
  SET_DISPLAY_COLUMNS,
  SET_PAGINATION,
  SET_PAGE_NUMBER,
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
