// Fallbacks are all production settings, @Raymond if you want to change or accidently changed them.
export const FETCH_ENDPOINT=import.meta.env.VITE_FETCH_ENDPOINT || "https://api.keywordsai.co/";
export const AUTH_ENABLED=import.meta.env.VITE_AUTH_ENABLED || "true";
export const STRIPE_STATER_LOOKUP_KEY=import.meta.env.VITE_STRIPE_STATER_LOOKUP_KEY || "keywords_ai_api_starter_plan";
export const STRIPE_TEAM_LOOKUP_KEY=import.meta.env.VITE_STRIPE_TEAM_LOOKUP_KEY ||"keywords_ai_api_team_plan_monthly";
export const STRIPE_TEAM_YEARLY_LOOKUP_KEY=import.meta.env.VITE_STRIPE_TEAM_YEARLY_LOOKUP_KEY || "keywords_ai_api_team_plan_yearly";
export const SANITY_CHECK=import.meta.env.VITE_SANITY_CHECK || "Fuck, not sane";