import { KeywordsAIJudgements } from "./keywordsai_single_judgments";
import { GPT4Judgements } from "./gpt-4_single_judgements";
import { KeywordsAIVSGPT4 } from "./keywordsai-gpt-4_pair";

export const singleJudgements = {
    "Keywords AI": KeywordsAIJudgements,
    "GPT-4": GPT4Judgements,
};

export const pairJudgements = {
    "Keywords AI-GPT-4": KeywordsAIVSGPT4,
};