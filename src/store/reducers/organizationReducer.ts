import {
  SET_ORG,
  SET_ORG_NAME,
  UPDATE_ORGANIZATION,
  DELETE_ROLE,
  ADD_MEMBER,
  ADD_PRESET,
  DELETE_PRESET,
  CHANGE_ROLE,
} from "src/store/actions";
import { Organization } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
const initState: Organization = {
  loading: true,
  id: null,
  name: "",
  organization_size: 0,
  organization_custom_evals: [],
  owner: {},
  users: [],
  unique_organization_id: "",

  organization_model_presets: [],
  active_subscription: false,
  organization_subscription: {},
  product_use_cases: [],
  prioritize_objectives: [],
  monthly_spending: 0,
  budget_goal: "",
  has_api_call: true,
  preset_models: [],
  preset_opiton: "",
  dynamic_routing_enabled: false,
  curr_onboarding_step: 1,
  onboarded: false,
  fallback_model_enabled: false,
  fallback_models: [],
  system_fallback_enabled: false,
  context_precision_eval: null,
  faithfulness_eval: null,
  flesch_kincaid_eval: null,
  answer_relevance_eval: null,
  sentiment_analysis_eval: null,
};

export default function organizationReducer(
  state: Organization = initState,
  action: PayloadAction<any>
): Organization {
  switch (action.type) {
    case SET_ORG:
      return { ..._.cloneDeep(action.payload) };

    case SET_ORG_NAME:
      return {
        ...state,
        name: action.payload,
      } as Organization;
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_MEMBER:
      return {
        ...state,
        users: [...(state?.users ?? []), action.payload],
      } as Organization;
    case DELETE_ROLE:
      return {
        ...state,
        users: state?.users.filter((user) => user.role.id !== action.payload),
      } as Organization;
    case ADD_PRESET:
      return {
        ...state,
        organization_model_presets: [
          ...(state?.organization_model_presets ?? []),
          action.payload,
        ],
      } as Organization;
    case DELETE_PRESET:
      return {
        ...state,
        organization_model_presets: state?.organization_model_presets.filter(
          (preset) => preset.id !== action.payload
        ),
      } as Organization;
    case CHANGE_ROLE:
      return {
        ...state,
        users: state?.users.map((user) =>
          user.role.id === action.payload.id
            ? {
                ...user,
                role: {
                  ...user.role,
                  name: action.payload.roleName,
                },
              }
            : user
        ),
      } as Organization;
    default:
      return state;
  }
}
