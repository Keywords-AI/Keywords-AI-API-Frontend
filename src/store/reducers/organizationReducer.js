import { SET_ORG, SET_ORG_NAME, UPDATE_ORGANIZATION } from "src/store/actions";

const initState = {
  id: "",
  name: "",
  organization_size: "",
  owner: {},
  users: [],
  usage: 0,
  unique_organization_id: "",
  organization_size: "",
};

export default function organizationReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORG:
      return action.payload;
    case SET_ORG_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
