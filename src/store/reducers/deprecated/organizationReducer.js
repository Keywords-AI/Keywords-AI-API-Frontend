import { SET_ORG, SET_ORG_NAME } from "../../actions/settingPagesActions/organizationAction";

const initState = {
  id: "",
  name: "",
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
    default:
      return state;
  }
}
