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
  Mistral,
} from "src/components/Icons";
import {
  LogItemColumn,
  LogColumnKey,
  LogItem,
  LogItemTag,
  RequestFilter,
} from "src/types";
import { ModelTag, StatusTag } from "src/components/Misc";
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
    speed: 110,
    rate_limit: 3500,
    brand: "openai",
    icon: OpenAI,
    mmlu_score: 70,
    mt_bench_score: 7.94,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: 0.001,
    output_pricing: 0.002,
  },
  {
    name: "GPT-3.5-turbo-16k",
    value: "gpt-3.5-turbo-16k",
    rate_limit: 3500,
    speed: 100,
    brand: "openai",
    icon: OpenAI,
    mmlu_score: 70,
    mt_bench_score: 7.94,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: 0.001,
    output_pricing: 0.002,
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
    rate_limit: 500,
    speed: 14,
    brand: "openai",
    icon: OpenAI,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: 0.003,
    output_pricing: 0.06,
  },
  {
    name: "GPT-4-1106-preview",
    value: "gpt-4-1106-preview",
    rate_limit: 500,
    speed: 70,
    brand: "openai",
    icon: OpenAI,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: 0.001,
    output_pricing: 0.03,
  },
  {
    name: "Claude Instant 1",
    value: "claude-instant-1",
    brand: "anthropic",
    rate_limit: 3500,
    speed: 150,
    icon: Anthropic,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Claude Instant 1.2",
    value: "claude-instant-1.2",
    brand: "anthropic",
    rate_limit: 3500,
    speed: 150,
    icon: Anthropic,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Claude 2.1",
    value: "claude-2.1",
    brand: "anthropic",
    rate_limit: 3500,
    speed: 150,
    icon: Anthropic,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Claude 2",
    value: "claude-2",
    brand: "anthropic",
    rate_limit: 3500,
    speed: null,
    icon: Anthropic,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Claude Instant 1",
    value: "claude-instant-1",
    rate_limit: 3500,
    speed: 150,
    brand: "anthropic",
    icon: Anthropic,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "GPT-3.5-turbo-16k",
    value: "gpt-3.5-turbo-16k",
    brand: "openai",
    icon: OpenAI,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Chat Bison",
    value: "chat-bison",
    brand: "google",
    speed: null,
    rate_limit: null,
    icon: Google,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "J2 Light",
    value: "j2-light",
    brand: "labs",
    icon: Labs,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Command",
    value: "command",
    rate_limit: 500,
    speed: 150,
    brand: "cohere",
    icon: Cohere,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Command",
    value: "command-light",
    rate_limit: 500,
    speed: 150,
    brand: "cohere",
    icon: Cohere,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "J2 Mid",
    value: "j2-mid",
    brand: "labs",
    rate_limit: 500,
    speed: 65,
    icon: Labs,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "J2 Light",
    value: "j2-light",
    rate_limit: 500,
    brand: "labs",
    speed: 130,
    icon: Labs,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "J2 Ultra",
    value: "j2-ultra",
    rate_limit: 500,
    brand: "labs",
    speed: 40,
    icon: Labs,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Gemini Pro",
    value: "gemini-pro",
    brand: "google",
    speed: null,
    icon: Google,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Mistral Tiny",
    value: "mistral-tiny",
    brand: "google",
    speed: null,
    icon: Mistral,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Mistral Small",
    value: "mistral-small",
    brand: "google",
    speed: null,
    icon: Mistral,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
  },
  {
    name: "Mistral Medium",
    value: "mistral-medium",
    brand: "google",
    speed: null,
    icon: Mistral,
    mmlu_score: null,
    mt_bench_score: null,
    big_bench_score: null,
    language_support: null,
    streaming_support: "Yes",
    input_pricing: null,
    output_pricing: null,
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

export const requestLogColumns: LogItemColumn[] = [
  { name: "Time", retrievalKey: "time", width: "132px" },
  { name: "Prompt", retrievalKey: "prompt", width: "160px" },
  { name: "Response", retrievalKey: "response", width: "160px" },
  { name: "Cost", retrievalKey: "cost", width: "76px" },
  { name: "Latency", retrievalKey: "latency", width: "64px" },
  { name: "Prompt tokens", retrievalKey: "promptTokens", width: "100px" },
  { name: "Output tokens", retrievalKey: "outputTokens", width: "100px" },
  { name: "All tokens", retrievalKey: "allTokens", width: "72px" },
];

export const requestLogTagColumns: LogItemTag[] = [
  {
    name: "API key",
    retrievalKey: "apiKey",
    renderFunction: (key: string) => (
      <span className="caption text-gray-4 mr-xxxs whitespace-nowrap">
        {key}
      </span>
    ),
  },
  {
    name: "Model",
    retrievalKey: "model",
    renderFunction: (model: string) => <ModelTag model={model} />,
  },
  {
    name: "Status",
    retrievalKey: "status",
    renderFunction: ({ failed, errorCode }) => (
      <StatusTag failed={failed} errorCode={errorCode} />
    ),
  },
  {
    name: "Sentiment",
    retrievalKey: "sentimentAnalysis",
    renderFunction: (sentimental_analysis: any) => (
      <SentimentTag
        sentiment_score={sentimental_analysis?.sentiment_score}
        showScore={false}
      />
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
  "status",
];
