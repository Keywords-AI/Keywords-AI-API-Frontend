import {
  OpenAI,
  Anthropic,
  Google,
  Labs,
  Cohere,
  Quality,
  Warning,
  Speed,
  Tokens,
  Cost,
} from "src/components/Icons";
import {
  LogItemColumn,
  LogColumnKey,
  LogItem,
  LogItemTag,
  RequestFilter,
} from "src/types";
import { ModelTag, StatusTag } from "src/components/Misc";
import { SelectInput } from "src/components/Inputs";
import { SentimentTag } from "src/components/Misc";
import React from "react";

const colors = [
  "var(--primary)",
  "var(--primary100)",
  "var(--primary500)",
  "var(--gray2)",
  "var(--gray3)",
  "var(--gray4)",
  "var(--black)",
  "var(--error)",
  "var(--red-light)",
  "var(--red-dark)",
  "var(--success)",
  "var(--orange-light)",
  "var(--orange-dark)",
  "var(--purple-dark)",
  "var(--purple-light)",
  "var(--teal-light)",
  "var(--teal-dark)",
  "var(--green-light)",
  "var(--green-dark)",
];

export const models = [
  {
    name: "GPT-3.5-turbo",
    value: "gpt-3.5-turbo",
    brand: "openai",
    icon: OpenAI,
  },
  // {
  //   name: "GPT-4-32k",
  //   value: "gpt-4-32k",
  //   brand: "openai",
  //   icon: OpenAI,
  // },
  {
    name: "GPT-4",
    value: "gpt-4",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "GPT-4-1106-preview",
    value: "gpt-4-1106-preview",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "Claude Instant 1",
    value: "claude-instant-1",
    brand: "anthropic",
    icon: Anthropic,
  },
  {
    name: "Claude Instant 1.2",
    value: "claude-instant-1.2",
    brand: "anthropic",
    icon: Anthropic,
  },
  {
    name: "Claude 2.1",
    value: "claude-2.1",
    brand: "anthropic",
    icon: Anthropic,
  },
  {
    name: "Claude 2",
    value: "claude-2",
    brand: "anthropic",
    icon: Anthropic,
  },

  // {
  //   name: "Claude Instant 1",
  //   value: "claude-instant-1",
  //   brand: "anthropic",
  //   icon: Anthropic,
  // },
  // {
  //   name: "Claude Instant 1.2",
  //   value: "claude-instant-1.2",
  //   brand: "anthropic",
  //   icon: Anthropic,
  // },

  {
    name: "GPT-3.5-turbo-16k",
    value: "gpt-3.5-turbo-16k",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "Chat Bison",
    value: "chat-bison",
    brand: "google",
    icon: Google,
  },
  {
    name: "J2 Light",
    value: "j2-light",
    brand: "labs",
    icon: Labs,
  },
  {
    name: "Command Nightly",
    value: "command-nightly",
    brand: "cohere",
    icon: Cohere,
  },
  {
    name: "J2 Mid",
    value: "j2-mid",
    brand: "labs",
    icon: Labs,
  },
  {
    name: "J2 Ultra",
    value: "j2-ultra",
    brand: "labs",
    icon: Labs,
  },
];

export const colorTagsClasses = [
  "#F55656",
  "#FFB340",
  "#FFD426",
  "#31DE4B",
  "#66D4CF",
  "#5DE6FF",
  "#DA8FFF",
  "#FF6482",
  "#B59469",
];
export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const Metrics = {
  number_of_requests: {
    name: "Request",
    value: "number_of_requests",
    icon: Quality,
  },
  average_latency: { name: "Latency", value: "average_latency", icon: Speed },
  total_prompt_tokens: {
    name: "Prompt tokens",
    value: "total_prompt_tokens",
    icon: Tokens,
  },
  total_completion_tokens: {
    name: "Output tokens",
    value: "total_completion_tokens",
    icon: Tokens,
  },
  total_tokens: { name: "All tokens", value: "total_tokens", icon: Tokens },
  total_cost: { name: "Total cost", value: "total_cost", icon: Cost },
  error_count: { name: "Errors", value: "error_count", icon: Warning },
};

export const dummyLogItem: LogItem = {
  id: -1,
  timestamp: "",
  cost: -1,
  latency: 0,
  completion_tokens: 0,
  prompt_tokens: 0,
  model: "",
  completion_message: { role: "", content: "" },
  prompt_messages: [],
  error_message: "",
  failed: false,
  category: "",
  api_key: "",
};

export const requestLogColumns: LogItemColumn[] = [
  { name: "Time", retrievalKey: "time", width: "120px" },
  { name: "Prompt", retrievalKey: "prompt", width: "160px" },
  { name: "Response", retrievalKey: "response", width: "160px" },
  { name: "Cost", retrievalKey: "cost", width: "76px" },
  { name: "Latency", retrievalKey: "latency", width: "64px" },
  { name: "Prompt tokens", retrievalKey: "promptTokens", width: "120px" },
  { name: "Output tokens", retrievalKey: "outputTokens", width: "120px" },
  { name: "All tokens", retrievalKey: "allTokens", width: "72px" },
];

export const requestLogTagColumns: LogItemTag[] = [
  {
    name: "API key",
    retrievalKey: "apiKey",
    renderFunction: (key: string) => (
      <span className="caption text-gray-4 mr-xxxs">{key}</span>
    ),
  },
  {
    name: "Model",
    retrievalKey: "model",
    renderFunction: (model: string) => <ModelTag model={model} />,
  },
  {
    name: "Status",
    retrievalKey: "failed",
    renderFunction: (failed: boolean) => <StatusTag failed={failed} />,
  },
  {
    name: "sentiment",
    retrievalKey: "sentimentAnalysis",
    renderFunction: (sentimental_analysis: any) => (
      <SentimentTag sentiment_score={sentimental_analysis?.sentiment_score} showScore={false}/>
    ),
  },
];

export const defaultRequestLogColumns: LogColumnKey[] = [
  "time",
  "prompt",
  "response",
  "cost",
  "latency",
  "allTokens",
  "apiKey",
  "model",
  "failed",
];
