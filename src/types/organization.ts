export type Organization={
    id: number;
    name: string;
    organization_model_presets: any[];
    owner: any;
    users: any[];
    organization_subscription: any;
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
} | null;