import React from "react";
import { Divider, Info } from "src/components";
import { Evaluation } from "./Evaluation";
import { useTypedSelector } from "src/store/store";
import { SentimentTag, Tag } from "src/components/Misc";
import { Toolbar } from "@radix-ui/react-toolbar";
import Tooltip from "src/components/Misc/Tooltip";
import {
  backgroundColorClasses,
  textColorClasses,
} from "src/utilities/constants";

type Props = {};

export default function EvalPane({}: Props) {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const contextPrecision = isNaN(
    parseFloat(
      logItem?.evaluations.context_precision?.LLM_based_context_precision
    )
  )
    ? null
    : parseFloat(
        logItem?.evaluations.context_precision?.LLM_based_context_precision
      );

  const faithfulness = isNaN(
    parseFloat(logItem?.evaluations.faithfulness?.LLM_based_faithfulness)
  )
    ? null
    : parseFloat(logItem?.evaluations.faithfulness?.LLM_based_faithfulness);

  const readability = isNaN(
    parseFloat(logItem?.evaluations.flesch_kincaid?.flesch_reading_ease)
  )
    ? null
    : parseFloat(logItem?.evaluations.flesch_kincaid?.flesch_reading_ease);

  const relevance = isNaN(
    parseFloat(
      logItem?.evaluations.answer_relevance?.LLM_based_answer_relevance
    )
  )
    ? null
    : parseFloat(
        logItem?.evaluations.answer_relevance?.LLM_based_answer_relevance
      );
  const sentiment = isNaN(
    parseFloat(logItem?.evaluations.sentiment_analysis.sentiment_score)
  )
    ? null
    : parseFloat(logItem?.evaluations.sentiment_analysis.sentiment_score);

  const topics = ["topic1", "topic2"];
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
          <p className="text-sm-regular text-gray-4">N/A</p>
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
          <p className="text-sm-regular text-gray-4">N/A</p>
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
          <p className="text-sm-regular text-gray-4">N/A</p>
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
            textColor={"text-yellow"}
            backgroundColor={"bg-yellow/10"}
          />
        ) : (
          <p className="text-sm-regular text-gray-4">N/A</p>
        ),
    },
    {
      key: "Sentiment",
      // tooltip: "Overall emotion of user message.",
      value:
        sentiment != null || sentiment != undefined ? (
          <SentimentTag sentiment_score={sentiment} />
        ) : (
          <p className="text-sm-regular text-gray-4">N/A</p>
        ),
    },
    // {
    //   key: "Topics",
    //   value:
    //     topics.length > 0 ? (
    //       <div className="flex items-center gap-xxxs">
    //         <Tag
    //           border=""
    //           text={topics[0].toString()}
    //           textColor={"text-mint"}
    //           backgroundColor={"bg-mint/10"}
    //         />
    //         <Tag
    //           border=""
    //           text={topics[1].toString()}
    //           textColor={"text-purple"}
    //           backgroundColor={"bg-purple/10"}
    //         />
    //       </div>
    //     ) : (
    //       <p className="text-sm-regular text-gray-4">N/A</p>
    //     ),
    // },
  ];
  return (
    <>
      <div className=" flex-col py-sm px-lg items-start gap-xs self-stretch">
        {displayObj.map((obj, index) => {
          return (
            <div
              className="flex h-[24px] justify-between items-center self-stretch bg-[rgb(245,86,86)/0.1] "
              key={index}
            >
              {obj["tooltip"] ? (
                <Tooltip
                  side="right"
                  sideOffset={8}
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
    </>
  );
}
