import { envVars } from "./env_test";
// Fallbacks are all production settings, @Raymond if you want to change or accidently changed them.
export const FETCH_ENDPOINT =
  envVars.FETCH_ENDPOINT || "https://api.keywordsai.co/";
export const AUTH_ENABLED = envVars.AUTH_ENABLED || "true";
export const STRIPE_STATER_LOOKUP_KEY =
  envVars.STRIPE_STATER_LOOKUP_KEY || "keywords_ai_api_starter_plan";
export const STRIPE_TEAM_LOOKUP_KEY =
  envVars.STRIPE_TEAM_LOOKUP_KEY || "keywords_ai_api_team_plan_monthly";
export const STRIPE_TEAM_YEARLY_LOOKUP_KEY =
  envVars.STRIPE_TEAM_YEARLY_LOOKUP_KEY || "keywords_ai_api_team_plan_yearly";
export const SANITY_CHECK = envVars.SANITY_CHECK || "Fuck, not sane";
