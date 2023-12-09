import { Button } from "src/components";
import { useSelector } from "react-redux";
import { Cost, Latency, Score, Tokens } from "./icons";
import { Compare } from "src/components";
import React from "react";
export function ModelOutput({}) {
  const stateOutputs = useSelector((state) => state.playground.outputs);
  const outputs = [
    { name: "Score", value: stateOutputs.score, icon: <Score /> },
    {
      name: "Cost",
      value: (
        <>
          <span>$</span>
          <span>{stateOutputs.cost}</span>
        </>
      ),
      icon: <Cost />,
    },
    {
      name: "Latency",
      value: (
        <>
          <span>{stateOutputs.latency}</span>
          <span>s</span>
        </>
      ),
      icon: <Latency />,
    },
    {
      name: "Tokens",
      value: stateOutputs.tokens,
      icon: <Tokens />,
    },
  ];
  return (
    <div className="flex-col items-start gap-xxs self-stretch">
      <p className="text-center text-gray-4 text-sm-regulat">Output</p>
      <div className="flex-col items-start gap-xxs self-stretch">
        {outputs.map((item, index) => (
          <div
            className="flex-col items-start gap-xxs px-md py-sm justify-center self-stretch rounded-sm bg-gray-2"
            key={index}
          >
            <div className="flex items-center gap-xxs">
              <div className="flex items-center justify-center w-[16px] gap-[10px]">
                {item.icon}
              </div>
              <p className="text-sm-regular text-gray-4">{item.name}</p>
            </div>
            <p className="display-xs text-gray-white flex items-center">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <Button
        variant={"standard"}
        text={"Compare different models"}
        icon={Compare}
        padding="py-xxxs px-xxs"
      />
    </div>
  );
}
