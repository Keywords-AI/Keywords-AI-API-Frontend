import React from "react";
import { ChatMessage } from "./chatMessage";

export type LogItem = {
    id: number;
    timestamp: string;
    cost: number;
    latency: number;
    completion_tokens: number;
    prompt_tokens: number;
    model: string;
    completion_message: ChatMessage;
    prompt_messages: ChatMessage[];
    error_message: string;
    failed: boolean;
    category: string;
    api_key: string;
};

export type DisplayLogItem = {
    id: number;
    time: React.ReactNode;
    prompt: React.ReactNode;
    response: React.ReactNode;
    cost: string;
    latency: string;
    tokens: number;
    tagGroup: React.ReactNode;
}