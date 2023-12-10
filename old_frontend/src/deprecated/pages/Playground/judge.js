export const judgePrompts = [
  {
    prompt_id: 1,
    system_prompt:
      "You are a helpful and precise assistant for checking the quality of the answer.",
    prompt_template:
      "[Question]\n{question}\n\n[The Start of Assistant 1's Answer]\n{answer_1}\n\n[The End of Assistant 1's Answer]\n\n[The Start of Assistant 2's Answer]\n{answer_2}\n\n[The End of Assistant 2's Answer]\n\n[System]\n{prompt}\n\n",
    defaults: {
      prompt:
        "We would like to request your feedback on the performance of two AI assistants in response to the user question displayed above.\nPlease rate the helpfulness, relevance, accuracy, level of details of their responses. Each assistant receives an overall score on a scale of 1 to 10, where a higher score indicates better overall performance.\nPlease first output a single line containing only two values indicating the scores for Assistant 1 and 2, respectively. The two scores are separated by a space. In the subsequent line, please provide a comprehensive explanation of your evaluation, avoiding any potential bias and ensuring that the order in which the responses were presented does not affect your judgment.",
    },
    description: "Prompt for general questions",
    category: "general",
  },
  {
    prompt_id: 2,
    system_prompt:
      "You are a helpful and precise assistant for checking the quality of the answer.",
    prompt_template:
      "[Question]\n{question}\n\n[The Start of Assistant 1's Answer]\n{answer_1}\n\n[The End of Assistant 1's Answer]\n\n[The Start of Assistant 2's Answer]\n{answer_2}\n\n[The End of Assistant 2's Answer]\n\n[System]\n{prompt}\n\n",
    defaults: {
      prompt:
        "Your task is to evaluate the coding abilities of the above two assistants. They have been asked to implement a program to solve a given problem. Please review their code submissions, paying close attention to their problem-solving approach, code structure, readability, and the inclusion of helpful comments.\n\nPlease ensure that the assistants' submissions:\n\n1. Correctly implement the given problem statement.\n2. Contain accurate and efficient code.\n3. Include clear and concise comments that explain the code's logic and functionality.\n4. Adhere to proper coding standards and best practices.\n\nOnce you have carefully reviewed both submissions, provide detailed feedback on their strengths and weaknesses, along with any suggestions for improvement. You should first output a single line containing two scores on the scale of 1-10 (1: no code/no sense; 10: perfect) for Assistant 1 and 2, respectively. Then give extra comments starting from the next line.",
    },
    description: "Prompt for coding questions",
    category: "coding",
  },
  {
    prompt_id: 3,
    system_prompt:
      "You are a helpful and precise assistant for checking the quality of the answer.",
    prompt_template:
      "[Question]\n{question}\n\n[The Start of Assistant 1's Answer]\n{answer_1}\n\n[The End of Assistant 1's Answer]\n\n[The Start of Assistant 2's Answer]\n{answer_2}\n\n[The End of Assistant 2's Answer]\n\n[System]\n{prompt}\n\n",
    defaults: {
      prompt:
        "We would like to request your feedback on the mathematical proficiency of two AI assistants regarding the given user question displayed above.\nFirst, please solve the problem independently, without referring to the answers provided by Assistant 1 and Assistant 2.\nAfterward, please examine the problem-solving process of Assistant 1 and Assistant 2 step-by-step to ensure their correctness, identifying any incorrect steps if present. Your evaluation should take into account not only the answer but also the problem-solving steps.\nFinally, please output a Python tuple containing two numerical scores for Assistant 1 and Assistant 2, ranging from 1 to 10, respectively. If applicable, explain the reasons for any variations in their scores and determine which assistant performed better.",
    },
    description: "Prompt for math questions",
    category: "math",
  },
];

export const reviewers = [
  {
    reviewer_id: "gpt-4-0328-default",
    prompt_id: 1,
    metadata: { temperature: 0.2, max_tokens: 1024 },
    description: "GPT-4 for general questions",
    category: "general",
  },
  {
    reviewer_id: "gpt-4-0328-coding",
    prompt_id: 2,
    metadata: { temperature: 0.2, max_tokens: 1024 },
    description: "GPT-4 for coding questions",
    category: "coding",
  },
  {
    reviewer_id: "gpt-4-0328-math",
    prompt_id: 3,
    metadata: { temperature: 0.2, max_tokens: 1024 },
    description: "GPT-4 for math questions",
    category: "math",
  },
];