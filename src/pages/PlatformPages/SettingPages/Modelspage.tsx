import { Button } from "@radix-ui/react-toolbar";
import React, { ReactElement } from "react";
import {
  Anthropic,
  Cohere,
  Google,
  Labs,
  Mistral,
  ModelIcon,
  OpenAI,
} from "src/components";
import { ModelTag, Tag } from "src/components/Misc";
import { PageContent } from "src/components/Sections";
import { ModelType, models } from "src/utilities/constants";
import cn from "src/utilities/classMerge";
import { Drawer } from "src/components/Dialogs/Drawer";
import { useTypedSelector } from "src/store/store";

const RightDrawerContent = ({
  model_name,
  speed,
  max_context_window,
  model_size,
  mmlu_score,

  mt_bench_score,
  big_bench_score,
  input_cost,
  output_cost,
  rate_limit,
  multilingual,
  streaming_support,
  function_call,
  weight,
}) => {
  const DisplayObj = [
    {
      label: "Model",
      value: (
        <span className="text-sm-regular text-gray-4">{model_name || "-"}</span>
      ),
    },
    {
      label: "Speed",
      value: (
        <span className="text-sm-regular text-gray-4">{speed || "Fast"}</span>
      ),
    },
    {
      label: "Mmlu score",
      //TODO: remove the default value for the props in tag for it to work properly
      value: (
        <span className="text-sm-regular text-gray-4">
          {(mmlu_score || 4220).toLocaleString()}
        </span>
      ),
    },
    {
      label: "Mt bench score",
      value: (
        <span className="text-sm-regular text-gray-4">
          {(mt_bench_score || 4220).toLocaleString()}
        </span>
      ),
    },
    {
      label: "Big Bench score",
      value: (
        <span className="text-sm-regular text-gray-4">
          {(big_bench_score || 4220).toLocaleString()}
        </span>
      ),
    },
    {
      label: "Language support",
      value: (
        <span className="text-sm-regular text-gray-4">
          {multilingual || "language support"}
        </span>
      ),
    },
    {
      label: "Streaming support",
      value: (
        <span className="text-sm-regular text-gray-4">
          {streaming_support || "Yes"}
        </span>
      ),
    },
    {
      label: "Prompt pricing",
      value: (
        <span className="text-sm-regular text-gray-5">
          ${(input_cost / 1000) || 0.2134}
          <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
        </span>
      ),
    },
    {
      label: "Completion pricing",
      value: (
        <span className="text-sm-regular text-gray-5">
          ${output_cost / 1000 || 0.2134}
          <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
        </span>
      ),
    },
    {
      label: "Rate limit",
      value: (
        <span className="text-sm-regular text-gray-4">
          {rate_limit.toLocaleString() || "10K"} RPM
        </span>
      ),
    },
  ];
  return (
    <div className="flex-col px-lg py-md items-start gap-xs self-stretch">
      {DisplayObj.map((item, index) => {
        return (
          <div
            key={index}
            className="flex h-[24px] justify-between items-center self-stretch"
          >
            <span className="text-sm-md text-gray-5">{item.label}</span>
            {item.value}
          </div>
        );
      })}
    </div>
  );
};

const ModelsTable = ({ ModelItems }: { ModelItems: any }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);
  const [clickedIndex, setClickedIndex] = React.useState(-1);
  const isRowHighlighted = (index) => {
    return index === hoveredIndex || index === clickedIndex;
  };

  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);
  const handleRowClick = (index) => {
    setClickedIndex(index);
    setIsSidePanelOpen(true); // Open the side panel
  };
  // const activated = hover;
  const templateString = "320px 180px 180px 80px 80px ";
  const activated = hoveredIndex >= 0;
  return (
    <div className="flex flex-row w-full">
      <div className={cn("flex-col w-[800px] items-start bg-gray-1")}>
        <div
          aria-label="table-header"
          className="grid py-xs shadow-border-b shadow-gray-2"
          style={{
            gridTemplateColumns: templateString,
          }}
        >
          <div className="items-center self-stretch text-gray-4 text-sm-md">
            Model
          </div>
          <div className="items-center self-stretch text-gray-4 text-sm-md">
            Prompt
          </div>
          <div className="items-center self-stretch text-gray-4 text-sm-md">
            Completion
          </div>
          <div className="items-center self-stretch text-gray-4 text-sm-md">
            Context
          </div>
          <div className="items-center self-stretch text-gray-4 text-sm-md">
            Rate limit
          </div>
          {/* <div className="items-center self-stretch text-gray-4 text-sm-md">
            Moderation
          </div> */}
        </div>
        {ModelItems.map((item, index) => (
          <Drawer
            key={index}
            open={false}
            trigger={
              <div
                key={index}
                className={cn(
                  "grid  py-xxs  shadow-border-b shadow-gray-2",
                  // index === hoveredIndex && "bg-gray-2"
                  isRowHighlighted(index) && "bg-gray-2"
                )}
                style={{
                  gridTemplateColumns: templateString,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => handleRowClick(index)}
              >
                <div className="flex w-[210px] items-center self-stretch text-gray-4 text-sm-md">
                  <ModelTag model={item.model_name} />
                </div>
                <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
                  <span className="text-gray-5 text-sm-regular">
                    ${(item.input_cost).toFixed(6)}
                  </span>
                  <span className=" text-gray-4 text-sm-regular">
                    {" "}
                    / 1M tokens
                  </span>
                </div>
                <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
                  <span className="text-gray-5 text-sm-regular">
                    ${(item.output_cost).toFixed(6)}
                  </span>
                  <span className=" text-gray-4 text-sm-regular">
                    {" "}
                    / 1M tokens
                  </span>
                </div>
                <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-regular">
                  {item.max_context_window}
                </div>
                <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-regular">
                  {item.rate_limit.toLocaleString()}
                </div>
                {/* <div className="flex w-fit items-center self-stretch text-gray-4 text-sm-md">
                  <Tag
                    text={item.company.moderation}
                    textColor={
                      item.company.moderation == "Filtered"
                        ? "text-success"
                        : "text-error"
                    }
                    backgroundColor={
                      item.company.moderation == "Filtered"
                        ? "bg-success/10"
                        : ""
                    }
                    border=""
                  />
                </div> */}
              </div>
            }
          >
            <RightDrawerContent {...item} />
          </Drawer>
        ))}
      </div>
    </div>
  );
};
export default function ModelsPage() {
  const a = [
    {
      name: "gpt-4",
      icon: <OpenAI size="sm" />,
      promptCost: "$0.0315",
      completionCost: "$0.063",
      context: "8K",
      ratelimit: "10K RPM",
      moderation: "Filtered",
    },
    {
      name: "azure/gpt-4-32k",
      icon: <OpenAI size="sm" />,
      promptCost: "$0.063",
      completionCost: "$0.126",
      context: "32K",
      ratelimit: "10K RPM",
      moderation: "Filtered",
    },
    {
      name: "gpt-4-1106-preview",
      icon: <OpenAI size="sm" />,
      promptCost: "$0.0105",
      completionCost: "$0.0315",
      context: "128K",
      ratelimit: "10K RPM",
      moderation: "Filtered",
    },
    {
      name: "gpt-3.5-turbo",
      icon: <OpenAI size="sm" />,
      promptCost: "$0.000525",
      completionCost: "$0.0315",
      context: "32K",
      ratelimit: "10K RPM",
      moderation: "Filtered",
    },
    {
      name: "claude-2.0",
      icon: <Anthropic size="sm" />,
      promptCost: "$0.0084",
      completionCost: "$0.0252",
      context: "100K",
      ratelimit: "-",
      moderation: "Filtered",
    },
    {
      name: "claude-2.1",
      icon: <Anthropic size="sm" />,
      promptCost: "$0.0084",
      completionCost: "$0.0252",
      context: "100K",
      ratelimit: "-",
      moderation: "Filtered",
    },
    {
      name: "claude-instant-1.2",
      icon: <Anthropic size="sm" />,
      promptCost: "$0.00084",
      completionCost: "$0.00252",
      context: "100K",
      ratelimit: "-",
      moderation: "",
    },
    {
      name: "j2-ultra",
      icon: <Labs size="sm" />,
      promptCost: "$0.01575",
      completionCost: "$0.01575",
      context: "8K",
      ratelimit: "180 RPM",
      moderation: "",
    },
    {
      name: "j2-mid",
      icon: <Labs size="sm" />,
      promptCost: "$0.0105",
      completionCost: "$0.0105",
      context: "8K",
      ratelimit: "480 RPM",
      moderation: "",
    },
    {
      name: "j2-light",
      icon: <Labs size="sm" />,
      promptCost: "$0.00315",
      completionCost: "$0.00315",
      context: "8K",
      ratelimit: "480 RPM",
      moderation: "",
    },
    {
      name: "command",
      icon: <Cohere size="sm" />,
      promptCost: "$0.00105",
      completionCost: "$0.0021",
      context: "4K",
      ratelimit: "10K RPM",
      moderation: "",
    },
    {
      name: "command-light",
      icon: <Cohere size="sm" />,
      promptCost: "$0.000315",
      completionCost: "$0.00063",
      context: "4K",
      ratelimit: "10K RPM",
      moderation: "",
    },
    {
      name: "text-bison-32k",
      icon: <Google size="sm" />,
      promptCost: "$0.001313",
      completionCost: "$0.002625",
      context: "32K",
      ratelimit: "300 RPM",
      moderation: "Filtered",
    },
    {
      name: "gemini/gemini-pro",
      icon: <Google size="sm" />,
      promptCost: "$0.001313",
      completionCost: "$0.002625",
      context: "32K",
      ratelimit: "300 RPM",
      moderation: "Filtered",
    },
    {
      name: "mistral/mistral-tiny",
      icon: <Mistral size="sm" />,
      promptCost: "$0.0001575",
      completionCost: "$0.000483",
      context: "32K",
      ratelimit: "120 RPM",
      moderation: "Filtered",
    },
    {
      name: "mistral/mistral-small",
      icon: <Mistral size="sm" />,
      promptCost: "$0.000683",
      completionCost: "$0.00206",
      context: "32K",
      ratelimit: "120 RPM",
      moderation: "Filtered",
    },
    {
      name: "mistral/mistral-medium",
      icon: <Mistral size="sm" />,
      promptCost: "$0.00287",
      completionCost: "$0.0086",
      context: "32K",
      ratelimit: "120 RPM",
      moderation: "Filtered",
    },
  ];
  const models = Object.values(
    useTypedSelector((state) => state.models.models)
  );
  return (
    <PageContent
      title="Models"
      subtitle="Browse models currently supported by Keywords AI. "
    >
      <span className="text-md-medium">Supported models</span>
      <ModelsTable ModelItems={models} />
    </PageContent>
  );
}
