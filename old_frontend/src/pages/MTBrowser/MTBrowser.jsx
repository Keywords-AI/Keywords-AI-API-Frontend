import React, { useEffect } from "react";
import KeywordsSelection from "src/components/KeywordsSelection/KeywordsSelection";
import { connect } from "react-redux";
import {
  questions,
  modelAnswers,
  questionCategories,
  models,
  pairJudgements,
} from "./mt_bench";
import "./static/css/style.css";
import { KeywordsInputWrapper } from "../../components/KeywordsInputWrapper/KeywordsInputWrapper";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

function MTBrowser({ user }) {
  const [category, setCategory] = React.useState(questionCategories[0]);
  const [selectedModelA, setSelectedModelA] = React.useState({
    text: "Keywords AI",
  });
  const [selectedModelB, setSelectedModelB] = React.useState({ text: "GPT-4" });
  // const [firstModelChoices, setFirstModelChoices] = React.useState(models.filter(model => model?.text === "Keywords AI"));
  const [secondModelChoices, setSecondModelChoices] = React.useState(models);
  const [browserQuestions, setBrowserQuestions] = React.useState(questions);
  const [browserQuestion, setBrowserQuestion] = React.useState(null);

  const filterModel = (toFilter) => {
    const filtered = models.filter((model) => {
      return model?.text !== toFilter?.text;
    });
    return filtered;
  };

  const retrieveQuestion = (choice, turn = 0) => {
    const turnChoices = choice?.turns;
    const questionId = choice?.question_id;
    if (turnChoices && questionId) {
      const text = questionId + ": " + turnChoices[turn];
      return text;
    } else {
      return "";
    }
  };

  const retrieveAnswer = (modelAnswersList, id, turn = 0) => {
    const answer = modelAnswersList?.find(
      (answer) => answer.question_id === id
    );
    const choice = answer?.choices[0];
    const text = choice?.turns[turn];
    return text || "";
  };

  const retrieveJudgement = (question, modelA, modelB) => {
    const file = pairJudgements[`${modelA?.text}-${modelB?.text}`];
    const judgement = file?.find(
      (judge) => judge.question_id === question?.question_id
    );
    const game1 = judgement?.g1_judgment;
    const game2 = judgement?.g2_judgment;
    const model1 = judgement?.model_1;
    const model2 = judgement?.model_2;
    const text = `A: ${model1 || "Please Choose"}, B: ${
      model2 || "Please Choose"
    }
Judgement: ${game1 || ""}
`;
    return text;
  };

  useEffect(() => {
    if (selectedModelA) setSecondModelChoices(filterModel(selectedModelA));
  }, [selectedModelA]);

  useEffect(() => {
    if (category) {
      const filtered = questions.filter((question) => {
        return question?.category === category?.text;
      });
      setBrowserQuestions(filtered);
      setBrowserQuestion(filtered[0]);
    }
  }, [category]);

  return (
    <div
      className="platform-right-container playground bg-white px-lg pb-xxxxl"
      style={{
        marginLeft: "0px",
      }}
    >
      <div className="flex-col items-start gap-lg self-stretch">
        <div className="display-sm">MT-Bench Browser</div>
        <div className="flex-col gap-xs items-start self-stretch">
          <div className="flex-row justify-start items-start gap-xs self-stretch">
            <div
              className="flex-col justify-start items-start self-stretch gap-xxs"
              style={{
                flex: "0 0 200px",
              }}
            >
              <KeywordsInputWrapper title={"Category"}>
                <KeywordsSelection
                  choices={questionCategories}
                  handleSelected={setCategory}
                  style={{
                    width: "200px",
                  }}
                />
              </KeywordsInputWrapper>
            </div>
            {/* <div className="flex-col justify-start items-start self-stretch gap-xxs flex-1   >
                            <div className="text-md text-gray4">
                                Model B
                            </div>
                            <KeywordsSelection
                                choices={secondModelChoices}
                                handleSelected={setSelectedModelB}
                                style={{
                                    width: "200px",
                                }}
                            />
                        </div> */}
            <div className="flex-col gap-xxs items-start flex-1  ">
              <div className="text-sm text-gray4">Question</div>
              <KeywordsInputWrapper title={"Question"}>
                <KeywordsSelection
                  choices={browserQuestions}
                  retrieveText={retrieveQuestion}
                  handleSelected={setBrowserQuestion}
                />
              </KeywordsInputWrapper>
            </div>
          </div>
        </div>
        {selectedModelA && selectedModelB && browserQuestion && (
          <>
            <div className="flex-col justify-start items-start self-stretch gap-xxs bg-gray2 user-question">
              <div className="text-md t-medium">User</div>
              <div className="text-md text-black">
                {retrieveQuestion(browserQuestion).split(":")[1]}
              </div>
            </div>
            <div className="grid-xl">
              <div className="flex-col gap-xxs items-start">
                <div className="text-md t-medium">
                  {selectedModelA?.text || "Select a model A"}
                </div>
                <div className="text-md text-black">
                  {retrieveAnswer(
                    modelAnswers[selectedModelA?.text],
                    browserQuestion?.question_id,
                    0
                  )}
                </div>
              </div>
              <div className="flex-col gap-xxs items-start">
                <div className="text-md t-medium">
                  {selectedModelB?.text || "Select a model B"}
                </div>
                <div className="text-md text-black">
                  {retrieveAnswer(
                    modelAnswers[selectedModelB?.text],
                    browserQuestion?.question_id,
                    0
                  )}
                </div>
              </div>
            </div>
            {browserQuestion?.turns?.length > 1 && (
              <>
                <div className="flex-col justify-start items-start self-stretch gap-xxs bg-gray2">
                  <div className="text-md t-medium user-question">
                    {"User’s Follow-up Question"}
                  </div>
                  <div className="text-md text-black">
                    {retrieveQuestion(browserQuestion, 1).split(":")[1]}
                  </div>
                </div>
                <div className="grid-xl">
                  <div className="flex-col-8-l">
                    <div className="text-md t-medium">
                      {selectedModelA?.text}
                    </div>
                    <div className="text-md text-black">
                      {retrieveAnswer(
                        modelAnswers[selectedModelA?.text],
                        browserQuestion?.question_id,
                        1
                      )}
                    </div>
                  </div>
                  <div className="flex-col-8-l">
                    <div className="text-md t-medium">
                      {selectedModelB?.text}
                    </div>
                    <div className="text-md text-black">
                      {retrieveAnswer(
                        modelAnswers[selectedModelB?.text],
                        browserQuestion?.question_id,
                        1
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex-col justify-start items-start self-stretch gap-xxs bg-gray2">
              <div className="text-md t-medium">GPT-4 as Judge</div>
              <div
                className="text-md text-black"
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {retrieveJudgement(
                  browserQuestion,
                  selectedModelA,
                  selectedModelB
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MTBrowser);
