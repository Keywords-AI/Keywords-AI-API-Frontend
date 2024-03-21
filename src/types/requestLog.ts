import React from "react";
import { ChatMessage } from "./chatMessage";
import { Choice, SelectInputProps, TextInputProps } from "./input";

export type LogItem = {
  id: number;
  sentiment_score: number;
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
  customer_identifier: string;
  category: string;
  organization_key: string; // The ID of the key
  api_key: string;
  tokens_per_second: number;
  time_to_first_token: number;
  aggregation_data: any;
  organization_key__name: string;
  sentiment_analysis: any;
  cached_responses: any[];
  error_code: number;
  routing_time: number;
  groundness: number;
  full_request: any;
  status_code: number;
  warnings: string;
  token_per_second: number;
  metadata: any;
  organization: string;
  evaluation_cost: number;
  evaluations: {
    evaluation_cost: any;
    answer_relevance?: any;
    context_precision?: any;
    faithfulness?: any;
    flesch_kincaid?: any;
    sentiment_analysis?: {
      sentiment_score: number;
      sentiment_magnitude: number;
      language: string;
    };
    topic_analysis: any;
    // sentiment_magnitude: mag,
    language: string;
  };
};

export type DisplayLogItem = {
  id: number;
  time: React.ReactNode;
  prompt: React.ReactNode;
  response: React.ReactNode;
  cost: React.ReactNode;
  latency: React.ReactNode;
  promptTokens: number;
  time_to_first_token: number;
  outputTokens: number;
  allTokens: React.ReactNode;
  tokens_per_output_token: number;
  tokens_per_second: number;
  organizationKey: string; //ID of the key
  apiKey: string;
  model: string;
  failed: boolean;
  status: {
    failed: boolean;
    errorCode: number;
  };
  organization: string;
  sentimentAnalysis: any;
  cachedResponse: number;
  warnings: string;
};

export type LogColumnKey = keyof DisplayLogItem;

export type LogTagKey = "api_key" | "model" | "status" | "sentiment";

export type LogItemColumn = {
  name: string;
  retrievalKey: LogColumnKey;
  width: string;
};

export type LogItemTag = {
  name: string;
  retrievalKey: keyof DisplayLogItem;
  renderFunction: (columnValue: any, extra?: any) => React.ReactNode;
};

export type FilterType = LogColumnKey | LogTagKey;

export type RequestFilter = {
  changeField: ({
    register,
    values,
    choices,
    onChange,
  }: {
    register?: any;
    values: (string | number | boolean)[];
    choices?: Choice[];
    onChange?: (filterValues: string[] | number[] | boolean[]) => void;
  }) => React.ReactNode; // any keywords input field, for example <TextInput {...params} />
};

export type FilterFieldType =
  | "text"
  | "selection"
  | "datetime-local"
  | "number";

export type Operator = "gte" | "lte" | "exact" | "icontains";

export type RequestFilters = {
  [type in FilterFieldType]?: RequestFilter;
};

export type RawFilterOption = {
  display_name: string;
  metric: keyof LogItem;
  operator_choices: Choice[];
  value_choices: Choice[];
  value_field_type: FilterFieldType;
};

export type FilterObject = {
  id: string;
  metric: keyof LogItem;
  value: (string | boolean | number)[];
  operator: string;
  display_name: string;
  value_field_type: FilterFieldType;
};

export type CurrentFilterObject = {
  id: string;
  metric?: keyof LogItem;
} & Partial<FilterObject>;

export type RawFilterOptions = {
  [Key in keyof LogItem]?: RawFilterOption;
};

export type FilterParam = {
  operator: string;
  value: (string | boolean | number)[];
};

export type FilterParams = {
  [K in keyof LogItem]?: FilterParam;
};
