import React from "react";
import { Anthropic, Cohere, Google, Labs, OpenAI } from ".";

export const ModelIcon = (model) => {
  switch (model) {
    case "openai":
      return OpenAI;
    case "anthropic":
      return Anthropic;
    case "google":
      return Google;
    case "labs":
      return Labs;
    case "cohere":
      return Cohere;
    default:
      return OpenAI;
  }
};
