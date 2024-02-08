import { UPDATE_USER, SET_USER } from "src/store/actions";
import { User } from "src/types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: null,
  is_organization_admin: false,
  sort_by: "",
  display_properties: [],
  time_range_types: [],
  time_range_type: "",
  organization_role: {
    id: null,
    access_level: 0,
    role: "",
    pending: false,
    user: 0,
    organization: 0,
  },
  has_product_access: false,
  last_login: null,
  email: "",
  placeholder: false,
  first_name: "",
  last_name: "",
  sql_prompt_active: false,
  sql_schema: {},
  system_prompt_active: false,
  system_prompt: {
    role: "",
    content: "",
  },
  usage: 0,
  group_by: "",
  is_active: false,
  active_subscription: false,
  is_admin: false,
  last_conversation: -1,
  plans: [],
  file_prompt: {
    role: "",
    content: "",
  },
  user_file_index: "",
  current_file: "",
  payments: [],
  free_trial_key: "",
  free_trial_remaining: 0,
  free_trial_expired: false,
  free_trial_started: false,
  free_trial_start_date: null,
  fallback_model_enabled: false,
  fallback_models: [],
  system_fallback_enabled: false,
  dynamic_routing_enabled: false,
  custom_preset_models: [],
  preset_models: [],
  preset_option: "",
  theme: "",
  has_api_call: false,
  custom_bundle: {},
  custom_subscription: {},
  profile_color: "",
  request_log_filters: {},
};

export default function userReducer(state = initialState, action: PayloadAction<any>): User {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case SET_USER:
      return { loading: false, ...action.payload };
    default:
      return state;
  }
}
