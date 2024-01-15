import {
  GET_REQUEST_LOGS,
  SET_REQUEST_LOGS,
} from "src/store/actions/requestLogActions";

const initState = {
  data: [],
};

export default function requestLogReducer(state = initState, action: any) {
  switch (action.type) {
    case GET_REQUEST_LOGS:
      return {
        ...state,
        data: action.payload,
      };
    case SET_REQUEST_LOGS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
