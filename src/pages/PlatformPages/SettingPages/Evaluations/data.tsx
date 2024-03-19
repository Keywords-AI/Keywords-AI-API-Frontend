export const EvalData = {
  contextPrecision: {
    title: "Context Precision",
    subtitle: "Measures information density.",
    description: (
      <div className="text-sm-regular text-gray-4">
        Context Precision is used to measure information density, calculated by
        # of relevant chunks in retrieved sentences / total # of sentences in
        retrieved contexts.
      </div>
    ),
    metrics: [],
    inputText: (
      <div className="text-sm-regular text-gray-4">
        <p className="text-sm-md text-gray-4">Question:</p>
        <p className="text-sm-regular text-gray-4">
          What is the capital of France?
        </p>
        <br />
        <p className="text-sm-md text-gray-4">Retrieved context:</p>
        <p className="text-sm-regular text-gray-4">
          {`Paris is the capital of France and also the largest city in the country.
          Lyon is a major city in France.`}
        </p>
      </div>
    ),
    outputs: "LLM_based_context_precision: 0.5",
  },
  faithfulness: {
    title: "Faithfulness",
    subtitle: "How grounded is the generated answer on the retrieved contexts.",
    description: (
      <div className="text-sm-regular text-gray-4">
        <p>
          Faithfulness measures how grounded is the generated answer on the
          retrieved contexts.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">
            LLM-based Faithfulness
          </strong>{" "}
          is where LLM is prompted to evaluate the whole Generated Answer and
          outputs a judgement of 1.0 or 0.0.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">ROUGE-L Precision</strong>{" "}
          measures the longest common subsequence between the generated answer
          and the retrieved contexts.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">
            Token Overlap Precision
          </strong>{" "}
          calculates the precision of token overlap between the generated answer
          and the retrieved contexts.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">
            BLEU (Bilingual Evaluation Understudy)
          </strong>{" "}
          calculates the n-gram precision.
        </p>
      </div>
    ),
    metrics: [
      {
        name: "LLM-based Faithfulness",
        value: "llm",
      },
      {
        name: "ROUGE-L Precision",
        value: "rouge",
      },
      {
        name: "Token Overlap Precision",
        value: "token",
      },
      {
        name: "BLEU",
        value: "bleu",
      },
    ],
    inputText: (
      <div>
        <p className="text-sm-md text-gray-4">Question:</p>
        <p className="text-sm-regular text-gray-4">
          Who wrote 'Romeo and Juliet'?
        </p>
        <br />
        <p className="text-sm-md text-gray-4">Retrieved context:</p>
        <p className="text-sm-regular text-gray-4">
          William Shakespeare is the author of 'Romeo and Juliet'.
        </p>
        <br />
        <p className="text-sm-md text-gray-4">Answer:</p>
        <p className="text-sm-regular text-gray-4">
          William Shakespeare wrote 'Romeo and Juliet'. He is born in Ireland.
        </p>
      </div>
    ),
    outputs: {
      llm: `LLM_based_faithfulness: 0.0
        LLM_based_faithfulness_reasoning: The statement that William Shakespeare wrote 'Romeo and Juliet' is supported by the context. However, the context does not provide information about his birthplace, and it is a well-known fact that William Shakespeare was born in Stratford-upon-Avon, England, not Ireland.`,
      rouge: `rouge_faithfulness: 0.5`,
      token: `token_overlap_faithfulness: 0.5`,
      bleu: `bleu_faithfulness': 0.37`,
    },
  },
  fleschKincaidReadability: {
    title: "Flesch-Kincaid Readability",
    subtitle:
      "How easy it is to understand an by considering factors like sentence length and word complexity. ",
    description: (
      <div className="text-sm-regular text-gray-4">
        <p>
          The Flesch–Kincaid measures how easy it is to understand an by
          considering factors like sentence length and word complexity.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">
            Flesch Reading Ease:
          </strong>{" "}
          rates texts on a scale from easy to difficult.
        </p>
        <br />
        <p>
          <strong className="text-sm-md text-gray-5">
            Flesch–Kincaid Grade Level
          </strong>{" "}
          estimates the U.S. school grade level needed to comprehend the text.
        </p>
      </div>
    ),
    metrics: [
      {
        name: "Flesch Reading Ease",
        value: "flesch_reading_ease",
      },
      {
        name: "Flesch-Kincaid Grade Level",
        value: "flesch_kincaid_grade_level",
      },
    ],
    inputText: (
      <div>
        <p className="text-sm-md text-gray-4">Answer:</p>
        <p className="text-sm-regular text-gray-4">The cat sat on the mat.</p>
      </div>
    ),
    outputs: {
      flesch_reading_ease: `flesch_reading_ease: 100`,
      flesch_kincaid_grade_level: `flesch_kincaid_grade_level: 0`,
    },
  },
  answerRelevance: {
    title: "Answer Relevance",
    subtitle:
      "Consistency of the generated answer based on the reference ground truth answers.",
    description: (
      <div className="text-sm-regular text-gray-4">
        <p>
          LLM-based Answer Relevance outputs a score between 0.0 and 1.0
          assessing the consistency of the generated answer based on the
          reference ground truth answers.
        </p>
        <br />
        <p>Scoring rubric in LLM Prompt:</p>
        <ul className=" list-disc">
          <li className="ml-[25px]">
            0.0 means that the answer is completely irrelevant to the question.
          </li>
          <li className="ml-[25px]">
            0.5 means that the answer is partially relevant to the question or
            it only partially answers the question.
          </li>
          <li className="ml-[25px]">
            1.0 means that the answer is relevant to the question and completely
            answers the question.
          </li>
        </ul>
      </div>
    ),
    metrics: [],
    inputText: (
      <div>
        <p className="text-sm-md text-gray-4">Question:</p>
        <p className="text-sm-regular text-gray-4">
          Who wrote 'Romeo and Juliet'?
        </p>
        <br />
        <p className="text-sm-md text-gray-4">Retrieved context:</p>
        <p className="text-sm-regular text-gray-4">
          William Shakespeare is the author of 'Romeo and Juliet'.
        </p>
      </div>
    ),
    outputs: `LLM_based_answer_relevance: 1.0
    LLM_based_answer_relevance_reasoning: The answer is relevant to the question and completely answers the question by correctly identifying Shakespeare as the author of 'Romeo and Juliet'`,
  },
  sentiment: {
    title: "Sentiment",
    subtitle: "Overall emotion of user message.",
    description: (
      <div className="text-sm-regular text-gray-4">
        <p>
          Sentiment Analysis inspects the given text and identifies the
          prevailing emotional opinion within the text, especially to determine
          a writer's attitude as positive, negative, or neutral.
        </p>
        <br />
        <p>
          Sentiment contains the sentence level sentiment values attached to
          each sentence, which contain score between -1.0 (negative) and 1.0
          (positive).
        </p>
      </div>
    ),
    metrics: [],
    inputText: (
      <div>
        <p className="text-sm-md text-gray-4">Text:</p>
        <p className="text-sm-regular text-gray-4">
          Four score and seven years ago our fathers brought forth on this
          continent a new nation, conceived in liberty and dedicated to the
          proposition that all men are created equal.
        </p>
      </div>
    ),
    outputs: `sentiment_score: 0.2 
      sentiment: positive`,
  },
};
