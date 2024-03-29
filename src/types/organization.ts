export type OrgUser = {
    id: number;
    role: string;
    pending: boolean;
    organization: number;
    user: {
        email: string;
        first_name: string;
        last_name: string;
        id: number;
    };
};

export type Organization = {
    id: number | null;
    name: string;
    organization_custom_evals: any[];
    organization_model_presets: any[];
    sample_percentage: number;
    owner: any;
    users: OrgUser[];
    organization_subscription: {
        id: number;
        subscription_bool: boolean;
        plan_level: number;
        plan: string;
        [key: string]: any;
    } | null;
    active_subscription: boolean;
    unique_organization_id: string;
    organization_size: number; // From the survey
    product_use_cases: string[];
    prioritize_objectives: string[];
    monthly_spending: number;
    budget_goal: string;
    has_api_call: boolean;
    preset_models: any[];
    preset_opiton: string;
    dynamic_routing_enabled: boolean;
    curr_onboarding_step: number;
    onboarded: boolean;
    fallback_model_enabled: boolean;
    fallback_models: string[];
    system_fallback_enabled: boolean;
    api_key_limit: number;
    context_precision_eval: any;
    faithfulness_eval: any;
    flesch_kincaid_eval: any;
    answer_relevance_eval: any;
    sentiment_analysis_eval: any;
    
} | null;