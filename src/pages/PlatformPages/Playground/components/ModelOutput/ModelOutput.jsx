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
      value: Math.round(stateOutputs.score[currentModel] * 10) / 10 || "0",
      icon: Score,
    },
    {
      name: "Cost",
      value: (
        <>
          <span>$</span>
          <span>{stateOutputs.cost}</span>
        </>
      ),
      icon: Cost,
    },
    {
      name: "Latency",
      value: (
        <>
          <span>{Math.round(stateOutputs.latency * 100) / 100 || "0"} </span>
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
          // <div
          //   className="flex-col items-start gap-xxs px-md py-sm justify-center self-stretch rounded-sm bg-gray-2"
          //   key={index}
          // >
          //   <div className="flex items-center gap-xxs">
          //     <div className="flex items-center justify-center w-[16px] gap-[10px]">
          //       {item.icon}
          //     </div>
          //     <p className="text-sm-regular text-gray-4">{item.name}</p>
          //   </div>
          //   <p className="display-xs text-gray-white flex items-center">
          //     {item.value}
          //   </p>
          // </div>
          <MetricCard
            key={index}
            icon={item.icon}
            title={item.name}
            number={item.value}
          />
        ))}
      </div>
      {/* <Button
        variant={"small"}
        text={"Compare different models"}
        icon={Compare}
      /> */}
    </div>
  );
}
