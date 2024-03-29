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
import { ModelTag, RoutedModelTag, StatusTag, Tag } from "src/components/Misc";
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
export type ModelType = {
  name: string;
  value: string;
  brand: string;
  icon: any; // Replace 'any' with the actual type of 'icon'
  speed: number;
  max_context_window: number;
  model_size: number;
  mmlu_score: number;
  mt_bench_score: number;
  big_bench_score: number;
  input_cost: number;
  output_cost: number;
  rate_limit: number;
  multilingual: number;
  streaming_support: number;
  function_call: number;
  weight: number;
  prompt_cost: string;
  completion_cost: string;
  moderation: string;
};
export const models: ModelType[] = [
  {
    name: "GPT-4",
    value: "gpt-4",
    brand: "openai",
    icon: OpenAI,
    speed: 14,
    max_context_window: 8192,
    prompt_cost: "$0.0315",
    completion_cost: "$0.063",
    moderation: "Filtered",
    model_size: 170,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    big_bench_score: 40,
    input_cost: 30,
    output_cost: 60,
    rate_limit: 10000,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },

  {
    name: "GPT-3.5-turbo",
    value: "gpt-3.5-turbo",
    brand: "openai",
    icon: OpenAI,
    speed: 150,
    prompt_cost: "$0.000525",
    completion_cost: "$0.001575",
    moderation: "Filtered",
    max_context_window: 4096,
    model_size: 20,
    mmlu_score: 70,
    mt_bench_score: 7.94,
    big_bench_score: 25,
    input_cost: 0.5,
    output_cost: 0.1,
    rate_limit: 30000,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "GPT-3.5-turbo-16k",
    value: "gpt-3.5-turbo-16k",
    brand: "openai",
    icon: OpenAI,
    speed: 130,
    prompt_cost: "$0.000525",
    completion_cost: "$0.001575",
    moderation: "Filtered",
    max_context_window: 16384,
    model_size: 20,
    mmlu_score: 70,
    mt_bench_score: 7.94,
    big_bench_score: 25,
    input_cost: 0.5,
    output_cost: 1,
    rate_limit: 30000,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },

  {
    name: "GPT-4-1106-preview",
    value: "gpt-4-1106-preview",
    brand: "openai",
    icon: OpenAI,
    speed: 70,
    max_context_window: 128000,
    prompt_cost: "$0.0105",
    completion_cost: "$0.0315",
    moderation: "Filtered",
    model_size: 170,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    big_bench_score: 40,
    input_cost: 10,
    output_cost: 30,
    rate_limit: 500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Claude Instant 1.2",
    value: "claude-instant-1.2",
    brand: "anthropic",
    icon: Anthropic,
    speed: 150,
    prompt_cost: "$0.00084",
    completion_cost: "$0.00252",
    moderation: "",
    max_context_window: 100000,
    model_size: 20,
    mmlu_score: 70,
    mt_bench_score: 7.85,
    big_bench_score: 20,
    input_cost: 1,
    output_cost: 2,
    rate_limit: 3500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Claude 2.1",
    value: "claude-2.1",
    brand: "anthropic",
    icon: Anthropic,
    prompt_cost: "$0.0084",
    completion_cost: "$0.0252",
    moderation: "Filtered",
    speed: 110,
    max_context_window: 200000,
    model_size: 20,
    mmlu_score: 78.5,
    mt_bench_score: 7.9,
    big_bench_score: 20,
    input_cost: 1.63,
    output_cost: 5.51,
    rate_limit: 3500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Claude 2",
    value: "claude-2",
    brand: "anthropic",
    icon: Anthropic,
    speed: 110,
    prompt_cost: "$0.0084",
    completion_cost: "$0.0252",
    moderation: "Filtered",
    max_context_window: 100000,
    model_size: 20,
    mmlu_score: 78.5,
    mt_bench_score: 7.9,
    big_bench_score: 20,
    input_cost: 11,
    output_cost: 33,
    rate_limit: 3500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Claude Instant 1",
    value: "claude-instant-1",
    brand: "anthropic",
    icon: Anthropic,
    speed: 150,
    max_context_window: 100000,
    model_size: 20,
    mmlu_score: 70,
    mt_bench_score: 7.85,
    big_bench_score: 20,
    prompt_cost: "$0.00084",
    completion_cost: "$0.00252",
    moderation: "",
    input_cost: 1,
    output_cost: 2,
    rate_limit: 3500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Chat Bison",
    value: "palm/chat-bison",
    brand: "google",
    icon: Google,
    speed: 40,
    max_context_window: 8192,
    prompt_cost: "$0.001313",
    completion_cost: "$0.002625",
    moderation: "Filtered",
    model_size: 540,
    mmlu_score: 60,
    mt_bench_score: 6.4,
    big_bench_score: 40,
    input_cost: 0.5,
    output_cost: 0.5,
    rate_limit: 90,
    multilingual: 1,
    streaming_support: 1,
    function_call: 0,
    weight: 1,
  },
  // {
  //   name: "J2 Light",
  //   value: "j2-light",
  //   brand: "labs",
  //   icon: Labs,
  //   speed: 130,
  //   max_context_window: 8192,
  //   model_size: 178,
  //   mmlu_score: 60,
  //   mt_bench_score: 6.5,
  //   big_bench_score: 15,
  //   input_cost: 1,
  //   output_cost: 2,
  //   rate_limit: 500,
  //   multilingual: 1,
  //   streaming_support: 0,
  //   function_call: 0,
  //   weight: 1,
  // },
  // {
  //   name: "J2 Mid",
  //   value: "j2-mid",
  //   brand: "labs",
  //   icon: Labs,
  //   speed: 65,
  //   max_context_window: 8192,
  //   model_size: 178,
  //   mmlu_score: 60,
  //   mt_bench_score: 6.5,
  //   big_bench_score: 15,
  //   input_cost: 1,
  //   output_cost: 2,
  //   rate_limit: 500,
  //   multilingual: 1,
  //   streaming_support: 0,
  //   function_call: 0,
  //   weight: 1,
  // },
  // {
  //   name: "J2 Ultra",
  //   value: "j2-ultra",
  //   icon: Labs,
  //   brand: "labs",
  //   speed: 40,
  //   max_context_window: 8192,
  //   model_size: 178,
  //   mmlu_score: 60,
  //   mt_bench_score: 6.5,
  //   big_bench_score: 15,
  //   input_cost: 1,
  //   output_cost: 2,
  //   rate_limit: 500,
  //   multilingual: 1,
  //   streaming_support: 0,
  //   function_call: 0,
  //   weight: 1,
  // },
  {
    name: "Command",
    value: "command",
    brand: "cohere",
    icon: Cohere,
    speed: 150,
    max_context_window: 4000,
    prompt_cost: "$0.00105",
    completion_cost: "$0.0021",
    moderation: "",
    model_size: 52,
    mmlu_score: 60,
    mt_bench_score: 6.5,
    big_bench_score: 15,
    input_cost: 1,
    output_cost: 2,
    rate_limit: 500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 0,
    weight: 1,
  },
  {
    name: "Command Light",
    value: "command-light",
    rate_limit: 500,
    speed: 150,
    brand: "cohere",
    model_size: 6,
    icon: Cohere,
    prompt_cost: "$0.000315",
    completion_cost: "$0.00063",
    moderation: "",
    max_context_window: 4000,
    mmlu_score: 60,
    mt_bench_score: 6.5,
    big_bench_score: 15,
    input_cost: 1,
    output_cost: 2,
    multilingual: 1,
    streaming_support: 1,
    function_call: 0,
    weight: 1,
  },
  {
    name: "Gemini Pro",
    value: "gemini/gemini-pro",
    brand: "google",
    icon: Google,
    speed: 10,
    prompt_cost: "$0.001313",
    completion_cost: "$0.002625",
    moderation: "Filtered",
    max_context_window: 32000,
    model_size: 540,
    mmlu_score: 79.13,
    mt_bench_score: 6.8,
    big_bench_score: 40,
    input_cost: 1.3,
    output_cost: 2.6,
    rate_limit: 60,
    multilingual: 1,
    streaming_support: 1,
    function_call: 0,
    weight: 1,
  },
  {
    name: "Gemini Pro (Vertex AI)",
    value: "gemini-pro",
    brand: "google",
    icon: Google,
    speed: 10,
    max_context_window: 32000,
    prompt_cost: "$0.001313",
    completion_cost: "$0.002625",
    moderation: "Filtered",
    model_size: 540,
    mmlu_score: 79.13,
    mt_bench_score: 6.8,
    big_bench_score: 40,
    input_cost: 1.3,
    output_cost: 2.6,
    rate_limit: 60,
    multilingual: 1,
    streaming_support: 1,
    function_call: 0,
    weight: 1,
  },
  {
    name: "Mistral Tiny",
    value: "mistral-tiny",
    brand: "google",
    icon: Mistral,
    speed: 250,
    max_context_window: 32000,
    prompt_cost: "$0.0001575",
    completion_cost: "$0.000483",
    moderation: "Filtered",
    model_size: 7,
    mmlu_score: 63,
    mt_bench_score: 7.61,
    big_bench_score: 20,
    input_cost: 0.15,
    output_cost: 0.4,
    rate_limit: 120,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Mistral Small",
    value: "mistral-small",
    brand: "google",
    icon: Mistral,
    speed: 220,
    max_context_window: 32000,
    prompt_cost: "$0.000683",
    completion_cost: "$0.00206",
    moderation: "Filtered",
    model_size: 56,
    mmlu_score: 70.6,
    mt_bench_score: 8.3,
    big_bench_score: 20,
    input_cost: 0.68,
    output_cost: 2,
    rate_limit: 120,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "Mistral Medium",
    value: "mistral/mistral-medium",
    brand: "google",
    icon: Mistral,
    speed: 250,
    max_context_window: 32000,
    prompt_cost: "$0.00287",
    completion_cost: "$0.0086",
    moderation: "Filtered",
    model_size: 70,
    mmlu_score: 75.3,
    mt_bench_score: 8.61,
    big_bench_score: 20,
    input_cost: 2.8,
    output_cost: 8,
    rate_limit: 120,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "GPT-4 (Azure)",
    value: "azure/gpt-4",
    brand: "azure",
    icon: OpenAI,
    speed: 48,
    max_context_window: 8192,
    prompt_cost: "$0.0315",
    completion_cost: "$0.063",
    moderation: "",
    model_size: 170,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    big_bench_score: 40,
    input_cost: 30,
    output_cost: 60,
    rate_limit: 500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 0.5,
  },
  {
    name: "GPT-3.5-turbo (Azure)",
    value: "azure/gpt-35-turbo",
    brand: "azure",
    icon: OpenAI,
    speed: 150,
    max_context_window: 4096,
    model_size: 20,
    mmlu_score: 70,
    prompt_cost: "$0.000525",
    completion_cost: "0.001575",
    moderation: "",
    mt_bench_score: 7.94,
    big_bench_score: 25,
    input_cost: 0.5,
    output_cost: 0.1,
    rate_limit: 30000,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 1,
  },
  {
    name: "GPT-4-32k (Azure)",
    value: "azure/gpt-4-32k",
    brand: "azure",
    icon: OpenAI,
    speed: 48,
    max_context_window: 32768,
    model_size: 170,
    mmlu_score: 86.5,
    mt_bench_score: 8.99,
    prompt_cost: "$0.063",
    completion_cost: "0.126",
    moderation: "",
    big_bench_score: 40,
    input_cost: 30,
    output_cost: 60,
    rate_limit: 500,
    multilingual: 1,
    streaming_support: 1,
    function_call: 1,
    weight: 0.5,
  },
];
export const ChartTooltipOuterStyle =
  "flex flex-col items-start shadow-border shadow-gray-3 gap-xs py-xs px-sm bg-gray-2 rounded-sm w-[280px]";
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
export const textColorClasses = [
  "text-[#5DE6FF]",
  "text-[#DA8FFF]",
  "text-[#FF6482]",
  "text-[#B1B3BC]",
];
export const backgroundColorClasses = [
  "bg-[#5DE6FF1A]",
  "bg-[#DA8FFF1A]",
  "bg-[#FF64821A]",
  "bg-[#1E1E23]",
];
export const randomColor = () => {
  return backgroundColorClasses[Math.floor(Math.random() * colors.length)];
};

export const Metrics = {
  number_of_requests: {
    name: "Requests",
    value: "number_of_requests",
    icon: Quality,
    unit: "requests",
  },
  average_latency: {
    name: "Generation time",
    value: "average_latency",
    icon: Speed,
    unit: "s",
  },
  average_ttft: { name: "TTFT", value: "average_ttft", icon: Speed, unit: "s" },
  average_tpot: { name: "TPOT", value: "average_tpot", icon: Speed, unit: "s" },
  total_prompt_tokens: {
    name: "Prompt tokens",
    value: "total_prompt_tokens",
    icon: Tokens,
    unit: "tokens",
  },
  total_completion_tokens: {
    name: "Output tokens",
    value: "total_completion_tokens",
    icon: Tokens,
    unit: "tokens",
  },
  total_tokens: {
    name: "All tokens",
    value: "total_tokens",
    icon: Tokens,
    unit: "tokens",
  },
  average_tps: {
    name: "Speed",
    value: "average_tps",
    icon: Speed,
    unit: "tps",
  },
  tps_p_50: {
    name: "Speed p50",
    value: "tps_p_50",
    icon: Speed,
    unit: "tps",
  },
  tps_p_90: {
    name: "Speed p90",
    value: "tps_p_90",
    icon: Speed,
    unit: "tps",
  },
  tps_p_95: {
    name: "Speed p95",
    value: "tps_p_95",
    icon: Speed,
    unit: "tps",
  },
  tps_p_99: {
    name: "Speed p99",
    value: "tps_p_99",
    icon: Speed,
    unit: "tps",
  },
  total_cost: {
    name: "Cost",
    value: "total_cost",
    icon: Cost,
    unit: "$",
  },
  error_count: {
    name: "Errors",
    value: "error_count",
    icon: Warning,
    unit: "errors",
  },
  latency_p_50: {
    name: "Generation time p50",
    value: "latency_p_50",
    icon: Speed,
    unit: "s",
  },
  latency_p_90: {
    name: "Generation time p90",
    value: "latency_p_90",
    icon: Speed,
    unit: "s",
  },
  latency_p_95: {
    name: "Generation time p95",
    value: "latency_p_95",
    icon: Speed,
    unit: "s",
  },
  latency_p_99: {
    name: "Generation time p99",
    value: "latency_p_99",
    icon: Speed,
    unit: "s",
  },
  ttft_p_50: { name: "TTFT p50", value: "ttft_p_50", icon: Speed, unit: "s" },
  ttft_p_90: { name: "TTFT p90", value: "ttft_p_90", icon: Speed, unit: "s" },
  ttft_p_95: { name: "TTFT p95", value: "ttft_p_95", icon: Speed, unit: "s" },
  ttft_p_99: { name: "TTFT p99", value: "ttft_p_99", icon: Speed, unit: "s" },
  average_cost: {
    name: "Average cost",
    value: "average_cost",
    icon: Cost,
    unit: "$",
  },
  average_tokens: {
    name: "Average tokens",
    value: "average_tokens",
    icon: Tokens,
    unit: "tokens",
  },
  average_completion_tokens: {
    name: "Average output tokens",
    value: "average_completion_tokens",
    icon: Tokens,
    unit: "output tokens",
  },
  average_prompt_tokens: {
    name: "Average prompt tokens",
    value: "average_prompt_tokens",
    icon: Tokens,
    unit: "prompt tokens",
  },
};

export const requestLogColumns: LogItemColumn[] = [
  { name: "Time", retrievalKey: "time", width: "132px" },
  { name: "Prompt", retrievalKey: "prompt", width: "160px" },
  { name: "Response", retrievalKey: "response", width: "160px" },
  { name: "Cost", retrievalKey: "cost", width: "76px" },
  { name: "TTFT", retrievalKey: "time_to_first_token", width: "64px" },
  { name: "TPOT", retrievalKey: "tokens_per_output_token", width: "64px" },
  { name: "Generation time", retrievalKey: "latency", width: "100px" },
  {
    name: "Speed",
    retrievalKey: "tokens_per_second",
    width: "64px",
  },
  { name: "Input tokens", retrievalKey: "promptTokens", width: "100px" },
  { name: "Output tokens", retrievalKey: "outputTokens", width: "100px" },
  { name: "All tokens", retrievalKey: "allTokens", width: "72px" },
];

export const requestLogTagColumns: LogItemTag[] = [
  {
    name: "Organization",
    retrievalKey: "organization",
    renderFunction: (org: string) => (
      <span className="caption text-gray-4 mr-xxxs whitespace-nowrap">
        {org}
      </span>
    ),
  },
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
    renderFunction: (data: any) => {
      const { model, routed } = data;
      return routed ? (
        <RoutedModelTag model={model} />
      ) : (
        <ModelTag model={model} />
      );
    },
  },

  // {
  //   name: "Warnings",
  //   retrievalKey: "warnings",
  //   renderFunction: (warnings: any) => {
  //     if (warnings?.length > 0 && warnings != "{}") {
  //       return (
  //         <Tag
  //           icon={<Warning fill="fill-orange" size="sm" />}
  //           backgroundColor="bg-orange/10 h-[24px]"
  //           textColor="text-orange "
  //           border=""
  //         />
  //       );
  //     }
  //   },
  // },
  {
    name: "Status",
    retrievalKey: "status",
    renderFunction: ({ cached, errorCode, warnings }) => {
      return (
        <div className="flex gap-xxxs">
          {warnings?.length > 0 && warnings != "{}" && (
            <Tag
              icon={<Warning fill="fill-orange" size="sm" />}
              backgroundColor="bg-orange/10 h-[24px]"
              textColor="text-orange "
              border=""
            />
          )}
          <StatusTag statusCode={errorCode} cached={cached} table={true} />
        </div>
      );
    },
  },
  // {
  //   name: "Cached",
  //   retrievalKey: "cachedResponse",
  //   renderFunction: (cached_response) =>
  //     cached_response > 0 && (
  //       <Tag
  //         text={"Cached"}
  //         backgroundColor="bg-primary/10"
  //         textColor="text-primary"
  //         border=""
  //       />
  //     ),
  // },
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

export const userTableColumns = [
  {
    name: "Customer ID",
    value: "customerId",
  },
  {
    name: "Last active",
    value: "lastActive",
  },
  {
    name: "Active for",
    value: "activeFor",
  },

  {
    name: "requests",
    value: "requests",
  },

  {
    name: "tokens",
    value: "tokens",
  },
  {
    name: "costs",
    value: "costs",
  },
  {
    name: "Avg sentiment",
    value: "sentiment",
  },
];
