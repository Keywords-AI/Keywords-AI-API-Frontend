export type apiData = {
    id: number;
    timestamp: string;
    cost: number;
    latency: number;
    status: string;
    completion_tokens: number;
    prompt_tokens: number;
    model?: string;
    completion_message: string;
    prompt_messages: string[];
    error_message: string;
    organization_key: string;
    failed: boolean;
    category: string;
    api_key?: string;
}