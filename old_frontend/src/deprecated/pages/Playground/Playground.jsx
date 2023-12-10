import React, { useEffect } from "react";
import KeywordsSelection from "src/components/KeywordsSelection/KeywordsSelection";
import AutoScrollText from "src/components/AutoScrollText/AutoScrollText";
import useStream from "src/hooks/useStream";
import KeywordsInput from "src/components/KeywordsInput/KeywordsInput";
import { sampleQuestions } from "./question";
import { judgePrompts } from "./judge";
import { connect } from "react-redux";
import readStream from "src/services/readStream";
import {
  questions,
  modelAnswers,
  questionCategories,
  models,
  pairJudgements,
} from "./mt_bench";
import "./static/css/style.css";
import { KeywordsInputWrapper } from "../../../components/KeywordsInputWrapper/KeywordsInputWrapper";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {};

function Playground({ user }) {
  const { loading, error, response, postData } = useStream(
    "api/playground/ask/"
  );
  const {
    loading: loadingG4,
    error: errorG4,
    response: responseG4,
    postData: postDataG4,
  } = useStream("api/playground/compare/");
  const {
    loading: loadingJudge,
    error: errorJudge,
    response: responseJudge,
    postData: postDataJudge,
  } = useStream("api/playground/compare/");
  const keywordsRef = React.useRef(null);
  const gpt4Ref = React.useRef(null);
  const judgeRef = React.useRef(null);
  const [selectedQuestion, setSelectedQuestion] = React.useState(questions[0]);
  const [streaming, setStreaming] = React.useState(false);
  const [abortController, setAbortController] = React.useState(null);

  const handleStream = (ref, text) => {
    const conversationBox = ref?.current;
    if (conversationBox) {
      try {
        const contentChunk = JSON.parse(text);
        const content = contentChunk.choices[0].delta.content;
        if (content) {
          conversationBox.innerText += content;
        }
      } catch (error) {
        // Handle JSON parsing error here
      }
    }
  };

  const handleInput = (e) => {
    setSelectedQuestion({ text: e.target.value });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      e.target.innerText = "";
    }
  };

  const clearBox = () => {
    if (keywordsRef.current) {
      keywordsRef.current.innerText = "";
    }
    if (gpt4Ref.current) {
      gpt4Ref.current.innerText = "";
    }
    if (judgeRef.current) {
      judgeRef.current.innerText = "";
    }
  };

  const handleSend = () => {
    if (keywordsRef.current) {
      const messages = [
        {
          role: "user",
          content: selectedQuestion?.text || "",
        },
      ];
      clearBox();
      postData({ messages: messages, model: "gpt-4", stream: true });
      postDataG4({ messages: messages, model: "gpt-4", stream: true });
    }
  };

  const generateJudgement = () => {
    const judgement = judgePrompts.find(
      (judge) => judge.category === selectedQuestion?.category
    );
    const messages = [
      {
        role: "system",
        content: judgement?.defaults?.prompt || judgePrompts[0].defaults.prompt,
      },
      {
        role: "user",
        content: `Assistant1: ${keywordsRef?.current?.value}\n\n Assistant2: ${gpt4Ref?.current?.value}`,
      },
    ];
    postDataJudge({ messages: messages, model: "gpt-4", stream: true });
  };

  useEffect(() => {
    if (response) {
      const callBack = (text) => handleStream(keywordsRef, text);
      readStream(response, callBack);
    }
  }, [response]);
  useEffect(() => {
    if (responseG4) {
      const callBack = (text) => handleStream(gpt4Ref, text);
      readStream(responseG4, callBack);
    }
  }, [responseG4]);
  useEffect(() => {
    if (responseJudge) {
      const callBack = (text) => handleStream(judgeRef, text);
      readStream(responseJudge, callBack);
    }
  }, [responseJudge]);

  return (
    <div className="main-section-bottom playground bg-white">
      <div className="flex-col cross-center g-lg stretch">
        <div className="flex-col cross-start g-sm stretch">
          <div className="display-sm">Playground</div>
          <div className="text-lg">Test out our API here!</div>
        </div>
        {user.is_admin && (
          <div className="flex-col main-center cross-center g-md stretch">
            <div className="flex-col g-xs cross-start">
              <div className="text-md t-gray4">User Prompt</div>
              <div className="grid-input">
                <div className="flex-row main-center cross-start g-xs stretch">
                  <KeywordsInput
                    placeholder={"or send a message..."}
                    streaming={streaming}
                    handleInput={handleInput}
                    handleKeyDown={handleKeyDown}
                    handleSend={handleSend}
                    abortController={abortController}
                    value={selectedQuestion?.text || ""}
                  />
                </div>

                <KeywordsSelection
                  defaultChoice={{ text: "Select from a sample prompt" }}
                  choices={sampleQuestions}
                  handleSelected={setSelectedQuestion}
                />
              </div>
            </div>
            <div className="flex-col g-xs cross-start bg-gray2">
              <div className="text-md t-medium">User</div>
              <div className="text-md t-black">{"Placeholder question"}</div>
            </div>
            <div className="grid-xl">
              <div
                className="flex-col g-xs cross-start"
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <div className="text-md t-medium">Keywords AI</div>
                <div className="text-md t-pre-wrap" ref={keywordsRef}></div>
              </div>
              <div
                className="flex-col g-xs cross-start"
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <div className="text-md t-medium t-pre-wrap">GPT-4</div>
                <div className="text-md" ref={gpt4Ref}>
                  {"Place holder response"}
                </div>
              </div>
            </div>
            <button
              className="button-primary"
              onClick={(e) => {
                e.preventDefault();
                generateJudgement();
              }}
            >
              Generate Judgement
            </button>
            <div className="flex-col g-xs cross-start bg-gray2">
              <div className="text-md t-medium">GPT-4 as Judge</div>
              <div className="text-md" ref={judgeRef}>
                {"Place holder response"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
