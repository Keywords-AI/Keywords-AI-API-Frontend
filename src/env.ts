import { envVars } from "src/branch_env";
// Fallbacks are all production settings, @Raymond if you want to change or accidently changed them.
// const envVars = undefined;
export const FETCH_ENDPOINT =
  envVars?.FETCH_ENDPOINT || "https://api.keywordsai.co/";
export const AUTH_ENABLED = envVars?.AUTH_ENABLED || "true";
export const STRIPE_STATER_LOOKUP_KEY =
  envVars?.STRIPE_STATER_LOOKUP_KEY || "keywords_ai_api_starter_plan";
export const STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY ||
  "keywords_ai_api_team_plan_monthly_flat";
export const STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY ||
  "keywords_ai_api_team_plan_monthly_usage";
export const STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY || "keywords_ai_api_team_plan_yearly_flat";
export const STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY || "keywords_ai_api_team_plan_yearly_usage";
export const SANITY_CHECK = envVars?.SANITY_CHECK || "Not sane";
export const PRODUCTION_TEST_KEY = envVars?.PRODUCTION_TEST_KEY || "";
export const LOCAL_TEST_KEY = envVars?.LOCAL_TEST_KEY || "";
