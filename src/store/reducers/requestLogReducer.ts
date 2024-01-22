import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
} from "src/store/actions/requestLogActions";
import { LogItem } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  logs: LogItem[]
};

const initState: StateType = {
  logs: [],
};

export default function requestLogReducer(state = initState, action: PayloadAction<any>): StateType {
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
    default:
      return state;
  }
}
