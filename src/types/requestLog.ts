import { ChatMessage } from "./chatMessage";

export type LogItem = {
    timestamp: string;
    cost: number;
    latency: number;
    status: string;
    completion_tokens: number;
    prompt_tokens: number;
    model: string;
    id: number;
    completion_message: ChatMessage;
    prompt_messages: ChatMessage[];
    error_message: string;
    organization_key: string;
    failed: boolean;
    category: string;
}