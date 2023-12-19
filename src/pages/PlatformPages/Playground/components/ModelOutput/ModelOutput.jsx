import { Button } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { useSelector } from "react-redux";
import { Cost, Latency, Score, Tokens } from "./icons";
import { Compare } from "src/components";
import React from "react";
import { TextInput } from "src/components/Inputs";
import MetricCard from "src/components/Cards/MetricCard";
export function ModelOutput({}) {
  const stateOutputs = useSelector((state) => state.playground.outputs);
  const currentModel = useSelector((state) => state.playground.currentModel);
  const outputs = [
    {
      name: "Score",
      value: stateOutputs.score[currentModel]?.toFixed(4) || "0",
      icon: Score,
    },
    {
      name: "Cost",
      value: (
        <>
          <span>$</span>
          <span>{stateOutputs.cost.toFixed(10) || "0"}</span>
        </>
      ),
      icon: Cost,
    },
    {
      name: "Latency",
      value: (
        <>
          <span>{stateOutputs.latency.toFixed(4) || "0"}</span>
          <span>s</span>
        </>
      ),
      icon: Latency,
    },
    {
      name: "Tokens",
      value: stateOutputs.tokens || "0",
      icon: Tokens,
    },
  ];
  const firstTime = useSelector((state) => state.playground.firstTime);
  if (firstTime) {
    return null;
  }
  return (
    <div className="flex-col items-start gap-xxs self-stretch">
      <p className="text-center text-gray-4 text-sm-regular">Output</p>
      <div className="flex-col items-start gap-xxs self-stretch">
        {outputs.map((item, index) => (
          <MetricCard
            key={index}
            icon={item.icon}
            title={item.name}
            number={item.value}
          />
        ))}
      </div>
    </div>
  );
}
