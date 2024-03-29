import React from "react";
import { Button, Divider, Info, Right } from "src/components";
import { Evaluation } from "./Evaluation";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { SentimentTag, Tag } from "src/components/Misc";
import { Toolbar } from "@radix-ui/react-toolbar";
import Tooltip from "src/components/Misc/Tooltip";
import { useDispatch } from "react-redux";
import { dispatchNotification, runEvaluation } from "src/store/actions";
import {
  backgroundColorClasses,
  textColorClasses,
} from "src/utilities/constants";

export default function EvalPane({}) {
  const dispatch = useTypedDispatch();
  const [running, setRunning] = React.useState(new Set<string>());
  const logItem = useTypedSelector((state) =>
    state.requestLogs.logs.find(
      (log) => log.id === state.requestLogs?.selectedRequest?.id
    )
  );
  const contextPrecision = isNaN(
    parseFloat(
      logItem?.evaluations?.context_precision?.LLM_based_context_precision
    )
  )
    ? null
    : parseFloat(
        logItem?.evaluations?.context_precision?.LLM_based_context_precision
      );

  const faithfulness = isNaN(
    parseFloat(logItem?.evaluations?.faithfulness?.LLM_based_faithfulness)
  )
    ? null
    : parseFloat(logItem?.evaluations.faithfulness?.LLM_based_faithfulness);

  const readability = isNaN(
    parseFloat(logItem?.evaluations?.flesch_kincaid?.flesch_reading_ease)
  )
    ? null
    : parseFloat(logItem?.evaluations?.flesch_kincaid?.flesch_reading_ease);

  const relevance = isNaN(
    parseFloat(
      logItem?.evaluations?.answer_relevance?.LLM_based_answer_relevance
    )
  )
    ? null
    : parseFloat(
        logItem?.evaluations?.answer_relevance?.LLM_based_answer_relevance
      );
  const sentiment = isNaN(
    parseFloat(logItem?.evaluations?.sentiment_analysis?.sentiment_score as any)
  )
    ? null
    : parseFloat(
        logItem?.evaluations?.sentiment_analysis?.sentiment_score as any
      );
  const cost =
    logItem?.evaluations?.evaluation_cost || logItem?.evaluation_cost;
  const topics = logItem?.evaluations?.topic_analysis?.results.reduce(
    (acc, result) => {
      result.labels.forEach((label) => {
        const parts = label.split("/").filter((part) => part !== "");
        acc.push(...parts);
      });
      return acc;
    },
    []
  );
  const custom_evals = logItem?.evaluations?.custom_evals || [];
  const displayObj = [
    {
      key: "Context Precision",
      // tooltip: "Measures information density.",
      value:
        contextPrecision != null || contextPrecision != undefined ? (
          <Tag
            border=""
            text={contextPrecision.toFixed(2)}
            textColor={contextPrecision >= 0.85 ? "text-green" : "text-red"}
            backgroundColor={
              contextPrecision >= 0.85 ? "bg-green/10" : "bg-red/10"
            }
          />
        ) : (
          <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
          // <Button
          //   variant="text"
          //   text={running.has("context_precision") ? "Running" : "Run"}
          //   textColor="text-primary"
          //   textHoverColor="text-primary-2"
          //   textClickedColor="text-primary-2"
          //   onClick={(e) => handleRunEvaluation("context_precision", e)}
          // />
        ),
    },
    {
      key: "Faithfulness",
      // tooltip:
      //   "How grounded is the generated answer on the retrieved contexts.",
      value:
        faithfulness != null || faithfulness != undefined ? (
          <Tag
            border=""
            text={faithfulness.toFixed(2)}
            textColor={faithfulness >= 0.85 ? "text-green" : "text-red"}
            backgroundColor={faithfulness >= 0.85 ? "bg-green/10" : "bg-red/10"}
          />
        ) : (
          <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
          // <Button
          //   variant="text"
          //   text={running.has("faithfulness") ? "Running" : "Run"}
          //   textColor="text-primary"
          //   textHoverColor="text-primary-2"
          //   textClickedColor="text-primary-2"
          //   onClick={(e) => handleRunEvaluation("faithfulness", e)}
          // />
        ),
    },

    {
      key: "Relevance",
      // tooltip:
      //   "Consistency of the generated answer based on the reference ground truth answers.",
      value:
        relevance != null || relevance != undefined ? (
          <Tag
            border=""
            text={relevance.toFixed(2)}
            textColor={
              relevance > 0.85
                ? "text-green"
                : relevance < 0.65
                ? "text-red"
                : "text-yellow"
            }
            backgroundColor={
              relevance > 0.85
                ? "bg-green/10"
                : relevance < 0.65
                ? "bg-red/10"
                : "bg-yellow/10"
            }
          />
        ) : (
          <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
          // <Button
          //   variant="text"
          //   text={running.has("answer_relevance") ? "Running" : "Run"}
          //   textColor="text-primary"
          //   textHoverColor="text-primary-2"
          //   textClickedColor="text-primary-2"
          //   onClick={(e) => handleRunEvaluation("answer_relevance", e)}
          // />
        ),
    },
    {
      key: "Readability",
      // tooltip:
      //   "How easy it is to understand an by considering factors like sentence length and word complexity.",
      value:
        readability != null || readability != undefined ? (
          <Tag
            border=""
            text={readability >= 0 ? "Easy" : "Difficult"}
            textColor={readability >= 0 ? "text-green" : "text-red"}
            backgroundColor={readability >= 0 ? "bg-green/10" : "bg-red/10"}
          />
        ) : (
          <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
          // <Button
          //   variant="text"
          //   text={running.has("readability") ? "Running" : "Run"}
          //   textColor="text-primary"
          //   textHoverColor="text-primary-2"
          //   textClickedColor="text-primary-2"
          //   onClick={(e) => handleRunEvaluation("readability", e)}
          // />
        ),
    },
    {
      key: "Sentiment",
      value:
        sentiment != null || sentiment != undefined ? (
          <SentimentTag sentiment_score={sentiment} />
        ) : (
          <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
          // <Button
          //   variant="text"
          //   text={running.has("sentiment_analysis") ? "Running" : "Run"}
          //   textColor="text-primary"
          //   textHoverColor="text-primary-2"
          //   textClickedColor="text-primary-2"
          //   onClick={(e) => handleRunEvaluation("sentiment_analysis", e)}
          // />
        ),
    },
    // {
    //   key: "Topic",
    //   value:
    //     topics.length > 0 ? (
    //       <div className="flex items-center gap-xxxs">
    //         {topics[0] && topics[0].labels[0] && (
    //           <Tag
    //             border=""
    //             text={topics[0].labels[0].split("/")[1]}
    //             textColor={"text-mint"}
    //             backgroundColor={"bg-mint/10"}
    //           />
    //         )}

    //         {topics[1] && topics[1].labels[0] && (
    //           <Tag
    //             border=""
    //             text={topics[1].labels[0].split("/")[1]}
    //             textColor={"text-purple"}
    //             backgroundColor={"bg-purple/10"}
    //           />
    //         )}
    //       </div>
    //     ) : (
    //       <p className="text-sm-regular text-gray-4 hover:text-gray-5">N/A</p>
    //     ),
    // },
  ];
  const handleRunEvaluation = (evalType: string, e: any) => {
    e.stopPropagation();
    if (running.has(evalType)) return;
    setRunning((prev) => new Set(prev.add(evalType)));
    dispatch(runEvaluation(evalType));
  };

  const onSubmit = () => {
    dispatch(
      dispatchNotification({ title: "Copied to clickboard", type: "success" })
    );
  };
  return (
    <>
      <div className=" flex-col pt-[18px] pb-sm px-lg items-start gap-xs self-stretch outline-none">
        {displayObj.map((obj, index) => {
          return (
            <div
              className=" cursor-pointer flex h-[24px] justify-between items-center self-stretch bg-[rgb(245,86,86)/0.1] "
              onClick={() => {
                const text =
                  obj.key == "Readability"
                    ? logItem?.evaluations?.flesch_kincaid?.flesch_reading_ease
                    : obj.key == "Sentiment"
                    ? logItem?.evaluations?.sentiment_analysis?.sentiment_score
                    : obj.value.props.children;
                navigator.clipboard.writeText(text);
                onSubmit();
              }}
              key={index}
            >
              {obj["tooltip"] ? (
                <Tooltip
                  side="right"
                  sideOffset={4}
                  align="center"
                  delayDuration={1}
                  content={
                    <>
                      <p className="caption text-gray-4">{obj.tooltip}</p>
                    </>
                  }
                >
                  <div className="flex gap-xxs items-center">
                    <p className="text-sm-md text-gray-5">{obj.key}</p>
                    <Info />
                  </div>
                </Tooltip>
              ) : (
                <div className="text-sm-md text-gray-5">{obj.key}</div>
              )}
              {obj.value}
            </div>
          );
        })}
      </div>
      <Divider />
      {topics && topics.length > 0 && (
        <>
          <div className="flex-col gap-xxxs py-sm px-lg items-start self-stretch">
            <div className="flex justify-between items-center self-stretch">
              <p className="text-sm-md text-gray-5">Topics</p>
            </div>
            <div className="flex items-center content-start gap-xxxs w-full flex-wrap">
              {topics &&
                topics.length > 0 &&
                topics.map((topic, index) => (
                  <>
                    <Tag
                      key={index}
                      border=""
                      text={topic}
                      textColor={
                        textColorClasses[index % textColorClasses.length]
                      }
                      backgroundColor={
                        backgroundColorClasses[
                          index % backgroundColorClasses.length
                        ]
                      }
                    />
                    {index !== topics.length - 1 && <Right size="xxs" />}
                  </>
                ))}
            </div>
          </div>
          <Divider />
        </>
      )}
      <div className="flexcol py-sm px-lg items-start gap-xxxs self-stretch">
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <div className="text-sm-md text-gray-5">{"Eval cost"}</div>
          <p
            className="text-sm-regular text-gray-4 hover:text-gray-5 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(cost?.toFixed(4).toString());
              onSubmit();
            }}
          >
            ${cost?.toFixed(4)}
          </p>
        </div>
      </div>
    </>
  );
}
