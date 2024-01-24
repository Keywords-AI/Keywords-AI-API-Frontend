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
    promptTokens: number;
    outputTokens: number;
    allTokens: number;
    apiKey: string;
    model: string;
    failed: boolean;
}
export type LogColumnKey = "time" | "prompt" | "response" | "cost" | "promptTokens" 
| "outputTokens" | "allTokens" | "latency" | "tagGroup"| "apiKey" | "model" | "failed" | "sentiment"; //not status, should be failed

export type LogTagKey = "api_key" | "model" | "status" | "sentiment";

export type LogItemColumn = {
    name: string;
    retrievalKey: LogColumnKey;
    width: string;
};

export type LogItemTag = {
    name: string;
    rawDataKey: string;
    retrievalKey: LogColumnKey;
    renderFunction: (columnValue: any) => React.ReactNode;
};

