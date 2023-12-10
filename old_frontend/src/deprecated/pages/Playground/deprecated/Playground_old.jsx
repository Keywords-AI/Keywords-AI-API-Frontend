import React, { useEffect } from 'react'
import KeywordsSelection from 'src/components/KeywordsSelection/KeywordsSelection'
import AutoScrollText from 'src/components/AutoScrollText/AutoScrollText'
import useStream from 'src/hooks/useStream'
import { sampleQuestions } from '../question'
import { judgePrompts } from '../judge'
import { connect } from "react-redux"
import {
    questions,
    KeywordsAIAnswers,
    KeywordsAIJudgements,
    GPT4Answers,
    GPT4Judgements,
    questionCategories,
    models,
} from '../mt_bench'

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
}





function Playground({ user }) {
    const { loading, error, response, postData } = useStream("api/playground/ask/");
    const { loading: loadingG4, error: errorG4, response: responseG4, postData: postDataG4 } = useStream("api/playground/compare/");
    const { loading: loadingJudge, error: errorJudge, response: responseJudge, postData: postDataJudge } = useStream("api/playground/compare/");
    const keywordsRef = React.useRef(null);
    const gpt4Ref = React.useRef(null);
    const judgeRef = React.useRef(null);
    const [category, setCategory] = React.useState(questionCategories[0]);
    const [selectedQuestion, setSelectedQuestion] = React.useState(questions[0]);
    const [selectedModelA, setSelectedModelA] = React.useState(models[0]);
    const [selectedModelB, setSelectedModelB] = React.useState(models[1]);
    const [firstModelChoices, setFirstModelChoices] = React.useState(models);
    const [secondModelChoices, setSecondModelChoices] = React.useState(models);

    const clearBox = () => {
        if (keywordsRef.current) {
            keywordsRef.current.value = "";
        }
        if (gpt4Ref.current) {
            gpt4Ref.current.value = "";
        }
        if (judgeRef.current) {
            judgeRef.current.value = "";
        }
    }

    const handleSend = () => {
        if (keywordsRef.current) {
            const messages = [
                {
                    role: "user",
                    content: selectedQuestion?.text || "",
                }
            ]
            postData({ messages: messages, model: "gpt-4", stream: true });
            postDataG4({ messages: messages, model: "gpt-4", stream: true });
        }
    }

    const generateJudgement = () => {
        const judgement = judgePrompts.find(judge => judge.category === selectedQuestion?.category);
        const messages = [
            {
                role: "system",
                content: judgement?.defaults?.prompt || judgePrompts[0].defaults.prompt
            },
            {
                role: "user",
                content: `Assistant1: ${keywordsRef?.current?.value}\n\n Assistant2: ${gpt4Ref?.current?.value}`
            },
        ]
        postDataJudge({ messages: messages, model: "gpt-4", stream: true });
    }
    const filterModel = (toFilter) => {
        console.log(toFilter);
        const filtered = models.filter((model) => {
            console.log(model?.text, toFilter?.text, model?.text !== toFilter?.text);
            return model?.text !== toFilter?.text;
        });
        console.log("filtered", filtered);
        return filtered;
    };

    useEffect(() => {
        if (selectedModelA)
            setSecondModelChoices(filterModel(selectedModelA));

    }, [selectedModelA]);

    useEffect(() => {
        if (selectedModelB)
            setFirstModelChoices(filterModel(selectedModelB));
    }, [selectedModelB]);

    return (
        <div className='main-section-bottom playground'>
            {user.is_admin && <div className="flex-col main-center cross-center g-md stretch">
                <div className="flex-col cross-center g-sm stretch">
                    <div className="flex-col g-xs cross-start">
                        <div className="text-md t-gray4">
                            Select a question or type your own
                        </div>
                        <div className="flex-row main-center cross-start g-xs stretch" style={{
                            width: "640px",
                        }}>
                            <KeywordsSelection choices={sampleQuestions} handleSelected={setSelectedQuestion} />
                        </div>
                    </div>
                    <div className="flex-row main-center cross-start g-xs stretch">
                        <input type="text"
                            className="text-md"
                            onChange={(e) => {
                                setSelectedQuestion
                                    ({
                                        text: e.target.value,
                                        category: "general"
                                    });
                            }}
                            value={selected?.text || ""}
                        />
                        <button className="button-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                clearBox();
                                handleSend();
                            }}
                        >
                            <span>Ask this</span>
                        </button>
                    </div>
                </div>
                <div className="flex-row main-center cross-start g-xs stretch">
                    <div className="flex-col cross-center g-lg stretch">
                        <div className="display-sm">
                            Keywords AI
                        </div>
                        <AutoScrollText ref={keywordsRef} response={response} readOnly={true} />
                    </div>
                    <div className="flex-col cross-center g-lg stretch">
                        <div className="display-sm">
                            GPT-4
                        </div>
                        <AutoScrollText ref={gpt4Ref} response={responseG4} readOnly={true} />
                    </div>
                </div>
                <button className="button-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        generateJudgement();
                    }}
                >
                    Generate Judgement
                </button>
                <div className="flex-col cross-center g-lg stretch">
                    <div className="display-sm">
                        GPT-4 Judge
                    </div>
                    <AutoScrollText ref={judgeRef} response={responseJudge} readOnly={true} />
                </div>
            </div>}
            <div className="flex-col cross-center g-lg stretch">
                <div className="display-sm">
                    MT-Bench Browser
                </div>
                <div className="text-lg">
                    {"GitHub Package "}
                    <a
                        href="https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge"
                        target="_blank"
                    >
                        {"https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge"}
                    </a>
                </div>
                <div className="flex-col g-xs cross-start">

                    <div className="flex-row main-center cross-start g-xs stretch">
                        <div className="flex-col main-start cross-start stretch g-xxs"
                            style={{
                                flex: "0 0 200px",
                            }}
                        >
                            <div className="text-md t-gray4">
                                Category
                            </div>
                            <KeywordsSelection
                                choices={questionCategories}
                                handleSelected={setCategory}
                                defaultChoice={category}
                                style={{
                                    width: "200px",
                                }}
                            />
                        </div>
                        <div className="flex-col main-start cross-start stretch g-xxs">
                            <div className="text-md t-gray4">
                                Model A
                            </div>
                            <KeywordsSelection
                                choices={firstModelChoices}
                                handleSelected={setSelectedModelA}
                                defaultChoice={selectedModelA}
                                style={{
                                    width: "200px",
                                }}
                            />
                        </div>
                        <div className="flex-col main-start cross-start stretch g-xxs">
                            <div className="text-md t-gray4">
                                Model B
                            </div>
                            <KeywordsSelection
                                choices={secondModelChoices}
                                handleSelected={setSelectedModelB}
                                defaultChoice={selectedModelB}
                                style={{
                                    width: "200px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex-col g-xs cross-start">
                        <div className="text-md t-gray4">
                            Question
                        </div>
                        <KeywordsSelection
                            choices={questions}
                            handleSelected={setSelectedQuestion}
                            defaultChoice={selectedQuestion}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Playground)