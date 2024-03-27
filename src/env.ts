let envVars;

const loadModule = async (modulePath) => {
  try {
    /* @vite-ignore */
    return await import(modulePath);
  } catch (e) {
    console.log("Failed to load module", e);
    return {
      FETCH_ENDPOINT: "https://api-test.keywordsai.co/",

    };
  }
};
envVars = (await loadModule("./branch_env"))?.envVars;
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
  envVars?.STRIPE_TEAM_YEARLY_FLAT_LOOKUP_KEY ||
  "keywords_ai_api_team_plan_yearly_flat";
export const STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_YEARLY_USAGE_LOOKUP_KEY ||
  "keywords_ai_api_team_plan_yearly_usage";
export const SANITY_CHECK =
  envVars?.SANITY_CHECK ||
  "Environmenal variable not set, using the fallback value";
export const PRODUCTION_TEST_KEY = envVars?.PRODUCTION_TEST_KEY || "";
export const LOCAL_TEST_KEY = envVars?.LOCAL_TEST_KEY || "";
export const DEMO_ENV = window.location.hostname === "demo.keywordsai.co";
export const DEMO_EMAIL = envVars?.DEMO_EMAIL || "demo@keywordsai.co";
export const DEMO_PASSWORD = envVars?.DEMO_PASSWORD || "ycw24";
export const STRIPE_PRO_MONTHLY_FLAT_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_MONTHLY_FLAT_LOOKUP_KEY ||
  "keywords_ai_api_pro_plan_monthly_flat";
export const STRIPE_PRO_MONTHLY_USAGE_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY ||
  "keywords_ai_api_pro_plan_monthly_usage";

export const STRIPE_PRO_YEARLY_FLAT_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_YEAR_FLAT_LOOKUP_KEY ||
  "keywords_ai_api_pro_plan_yearly_flat";
export const STRIPE_PRO_YEARLY_USAGE_LOOKUP_KEY =
  envVars?.STRIPE_TEAM_MONTHLY_USAGE_LOOKUP_KEY ||
  "keywords_ai_api_pro_plan_yearly_usage";
