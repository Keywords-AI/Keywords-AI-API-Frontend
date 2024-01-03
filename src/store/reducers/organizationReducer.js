import {
  SET_ORG,
  SET_ORG_NAME,
  UPDATE_ORGANIZATION,
  DELETE_ROLE,
  ADD_MEMBER,
} from "src/store/actions";

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
    case ADD_MEMBER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_ROLE:
      return {
        ...state,
        users: state.users.filter((user) => user.role.id !== action.payload),
      };
    default:
      return state;
  }
}
