import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
  SET_SELECTED_REQUEST,
  SET_SIDE_PANEL_OPEN,
} from "src/store/actions/requestLogActions";
import { LogItem } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  logs: LogItem[];
  selectedRequest: LogItem | undefined;
  sidePanelOpen: boolean;
};

const initState: StateType = {
  logs: [],
  selectedRequest: undefined,
  sidePanelOpen: false,
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
    default:
      return state;
  }
}
