import {
  GET_VENDORS,
  GET_INTEGRATIONS,
  SET_API_KEY,
  SET_INTEGRATION
} from "src/store/actions/settingPagesActions";

const initState = {
    vendors: [],
};

export default function integrationReducer(state = initState, action) {
  switch (action.type) {
    case GET_VENDORS:
      return { ...state, vendors: action.payload };
    case GET_INTEGRATIONS:
      return { ...state, integrations: action.payload };
    case SET_API_KEY:
      return { ...state, apiKey: action.payload };
    case SET_INTEGRATION:
      const vendors = state.vendors.map((vendor) => {
        if (vendor.id === action.payload.vendor) {
          return { ...vendor, integration: action.payload };
        }
        return vendor;
      });
      return { ...state, vendors: vendors };
    default:
      return state;
  }
}
