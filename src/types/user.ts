// {"id":81,"organization_role":{"id":207,"access_level":999,"role":"owner","pending":true,"user":81,"organization":141},"has_product_access":false,"last_login":null,"email":"demo@keywordsai.co","placeholder":false,"first_name":"YC","last_name":"W24","sql_prompt_active":false,"sql_schema":{},"system_prompt_active":false,"system_prompt":{"role":"system","content":"sytem prompt"},"usage":0,"is_active":true,"active_subscription":false,"is_admin":false,"last_conversation":-1,"plans":[],"file_prompt":{"role":"system","content":"sytem prompt"},"user_file_index":"demo@keywordsai.co_file","current_file":"","payments":[],"free_trial_key":"VQ2gP1FQ.Cks8VOqNYpY5MY5P1amK3lvoYNMqhYIP","free_trial_remaining":40000,"free_trial_expired":false,"free_trial_started":false,"free_trial_start_date":null,"fallback_model_enabled":true,"fallback_models":["gpt-4","gpt-3.5-turbo","gpt-3.5-turbo-16k"],"system_fallback_enabled":true,"dynamic_routing_enabled":true,"custom_preset_models":[],"preset_models":[],"preset_option":"","theme":"dark","has_api_call":false,"custom_bundle":{},"custom_subscription":{},"profile_color":"var(--primary)"}
export type OrganizationRole = {
  id: number | null;
  access_level: number;
  role: string;
  pending: boolean;
  user: number;
  organization: number;
};

export type SystemPrompt = {
  role: string;
  content: string;
};
    
export type User = {
  id: number | null;
  organization_role: OrganizationRole;
  has_product_access: boolean;
  is_organization_admin: boolean;
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
};