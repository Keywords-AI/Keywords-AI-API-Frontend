import {
  SET_ORG,
  SET_ORG_NAME,
  UPDATE_ORGANIZATION,
  DELETE_ROLE,
  ADD_MEMBER,
  ADD_PRESET,
  DELETE_PRESET
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
  organization_model_presets: [],
};

export default function organizationReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORG:
      if (action.payload)
        return action.payload;
      return initState
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
    case ADD_PRESET:
      return {
        ...state,
        organization_model_presets: [
          ...state.organization_model_presets,
          action.payload,
        ],
      };
    case DELETE_PRESET:
      return {
        ...state,
        organization_model_presets: state.organization_model_presets.filter(
          (preset) => preset.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
