import { OpenAI, Anthropic, Google, Labs, Cohere } from "src/components/Icons";

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
    name: "OpenAI - GPT-3.5-turbo",
    value: "gpt-3.5-turbo",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "OpenAI - GPT-4-32k",
    value: "gpt-4-32k",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "OpenAI - GPT-4",
    value: "gpt-4",
    brand: "openai",
    icon: OpenAI,
  },
  {
    name: "OpenAI - GPT-4-1106-preview",
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
    name: "OpenAI - GPT-3.5-turbo-16k",
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

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const Metrics = {
  number_of_requests: { name: "Request", value: "number_of_requests" },
  average_latency: { name: "Latency", value: "average_latency" },
  total_prompt_tokens: { name: "Prompt tokens", value: "total_prompt_tokens" },
  total_completion_tokens: {
    name: "Output tokens",
    value: "total_completion_tokens",
  },
  total_tokens: { name: "Total tokens", value: "total_tokens" },
  total_cost: { name: "Total cost", value: "total_cost" },
  error_count: { name: "Errors", value: "error_count" },
};