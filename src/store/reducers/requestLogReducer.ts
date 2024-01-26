import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
  SET_SELECTED_REQUEST,
  SET_SIDE_PANEL_OPEN,
  SET_DISPLAY_COLUMNS,
  SET_FILTER_OPEN,
  SET_FILTER,
  SET_SECOND_FILTER,
} from "src/store/actions/requestLogActions";
import { LogItem } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { LogColumnKey } from "src/types";
import { defaultRequestLogColumns } from "src/utilities/constants";

type StateType = {
  logs: LogItem[];
  selectedRequest: LogItem | undefined;
  sidePanelOpen: boolean;
  displayColumns: LogColumnKey[];
  filterOpen: boolean;
  firstFilter: LogColumnKey | undefined;
  secondFilter: string | undefined;
};

const initState: StateType = {
  logs: [],
  selectedRequest: undefined,
  sidePanelOpen: false,
  displayColumns: defaultRequestLogColumns,
  firstFilter: undefined,
  secondFilter: undefined,
  filterOpen: false,
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
    case SET_FILTER:
      return {
        ...state,
        firstFilter: action.payload,
      };
    case SET_SECOND_FILTER:
      return {
        ...state,
        secondFilter: action.payload,
      };
    default:
      return state;
  }
}
