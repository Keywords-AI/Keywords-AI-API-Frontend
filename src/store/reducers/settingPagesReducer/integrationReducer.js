import {
  GET_VENDORS,
  GET_INTEGRATIONS,
} from "src/store/actions/settingPagesActions";

const initState = {
    vendors: [],
    integrations: [],
};

export default function integrationReducer(state = initState, action) {
  switch (action.type) {
    case GET_VENDORS:
      return { ...state, vendors: action.payload };
    case GET_INTEGRATIONS:
      return { ...state, integrations: action.payload };
    default:
      return state;
  }
}
