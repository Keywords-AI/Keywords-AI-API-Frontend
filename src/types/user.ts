import { Choice } from "./input";
import { FilterParams } from "./requestLog";

export type OrganizationRole = {
  id: number | null;
  access_level: number;
  role: string;
  pending: boolean;
  user: any;
  organization: number;
};

export type SystemPrompt = {
  role: string;
  content: string;
};

export type User = {
  loading: boolean;
  id: number | null;
  sort_by: string;
  time_range_type: string;
  display_properties: string[];
  organization_role: OrganizationRole;
  has_product_access: boolean;
  is_organization_admin: boolean;
  time_range_types: Choice[];
  last_login: null;
  email: string;
  placeholder: boolean;
  first_name: string;
  last_name: string;
  sql_prompt_active: boolean;
  sql_schema: {};
  system_prompt_active: boolean;
  system_prompt: SystemPrompt;
  usage: number;
  is_active: boolean;
  active_subscription: boolean;
  is_admin: boolean;
  last_conversation: number;
  plans: any[];
  file_prompt: SystemPrompt;
  user_file_index: string;
  current_file: string;
  payments: any[];
  free_trial_key: string;
  free_trial_remaining: number;
  free_trial_expired: boolean;
  free_trial_started: boolean;
  free_trial_start_date: string | null;
  fallback_model_enabled: boolean;
  fallback_models: string[];
  system_fallback_enabled: boolean;
  dynamic_routing_enabled: boolean;
  custom_preset_models: any[];
  preset_models: any[];
  preset_option: string;
  theme: string;
  has_api_call: boolean;
  custom_bundle: {};
  custom_subscription: {};
  profile_color: string;
  group_by: string;
  request_log_filters: FilterParams;
};
