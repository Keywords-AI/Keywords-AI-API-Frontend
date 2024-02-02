import React from "react";
import { ChatMessage } from "./chatMessage";
import { Choice, SelectInputProps, TextInputProps } from "./input";

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
  organization_key: string; // The ID of the key
  api_key: string;
  time_to_first_token: number;
  aggregation_data: any;
  organization_key__name: string;
  sentiment_analysis: {
    sentiment_score: number;
    // sentiment_magnitude: mag,
    language: string;
  };
  error_code: number;
};

export type DisplayLogItem = {
  id: number;
  time: React.ReactNode;
  prompt: React.ReactNode;
  response: React.ReactNode;
  cost: React.ReactNode;
  latency: React.ReactNode;
  promptTokens: number;
  outputTokens: number;
  allTokens: number;
  organizationKey: string; //ID of the key
  apiKey: string;
  model: string;
  failed: boolean;
  status: {
    failed: boolean;
    errorCode: number
  }
  sentimentAnalysis: any;
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
  renderFunction: (columnValue: any) => React.ReactNode;
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

export type FilterFieldType = "text" | "selection" | "datetime-local" | "number"

export type Operator = "gte" | "lte" | "exact" | "icontains"

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
