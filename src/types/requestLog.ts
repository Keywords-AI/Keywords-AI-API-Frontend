import React from "react";
import { ChatMessage } from "./chatMessage";
import { Choice, SelectInputProps } from "./input";

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
    sentiment_analysis: {
        sentiment_score: number,
        // sentiment_magnitude: mag,
        language: string,
    }
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
    sentimentAnalysis: any;
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
    retrievalKey: keyof DisplayLogItem;
    renderFunction: (columnValue: any) => React.ReactNode;
};

export type FilterType = LogColumnKey | LogTagKey;

export type RequestFilter = {
    [Key in FilterType]?: {
        metricSelection: (register: any)=>React.ReactNode; // <SelectInput {...params} />
        operationSelection: (register: any)=>React.ReactNode; // <SelectInput {...params} />
        changeField: (register: any, choice: string)=>React.ReactNode; // any keywords input field, for example <TextInput {...params} />
    };
};
// export const RequestFilters: RequestFilterType = {
//     failed: {
//       metricSelection: <SelectInput />, // <SelectInput {...params} />
//       operationSelection: <SelectInput />, // <SelectInput {...params} />
//       changeFiled: <SelectInput /> // <AnyInputElement {...params} />
//     }
//   }

