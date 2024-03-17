import React from "react";
import { Divider } from "src/components";
import { Evaluation } from "./Evaluation";
import { useTypedSelector } from "src/store/store";
import { Tag } from "src/components/Misc";

type Props = {};

export default function EvalPane({}: Props) {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const displayObj = [
    {
      key: "Context Precision",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
    {
      key: "Faithfulness",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
    {
      key: "Readability",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
    {
      key: "Relevance",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
    {
      key: "Sentiment",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
    {
      key: "Topics",
      tooltip: "The percentage of correct context in the response.",
      value: "",
    },
  ];
  return (
    <>
      <div className=" flex-col py-sm px-lg items-start gap-xs self-stretch"></div>
    </>
  );
}
