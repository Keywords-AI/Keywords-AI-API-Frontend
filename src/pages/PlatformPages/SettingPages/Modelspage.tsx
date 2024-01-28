import React, { ReactElement } from "react";
import { Anthropic, Cohere, Google, Labs, OpenAI } from "src/components";
import { Tag } from "src/components/Misc";
import { PageContent } from "src/components/Sections";

const ModelsTable = ({
  ModlItems,
}: {
  ModlItems: {
    name: string;
    icon: ReactElement;
    promptCost: string;
    completionCost: string;
    context: string;
    ratelimit: string;
    moderation: string;
  }[];
}) => {
  return (
    <div className="flex-col w-[800px] items-start bg-gray-1">
      <div
        aria-label="table-header"
        className="flex flex-row py-xs items-start self-stretch shadow-border-b shadow-gray-2"
      >
        <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
          Model
        </div>
        <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
          Prompt
        </div>
        <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
          Completion
        </div>
        <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-md">
          Context
        </div>
        <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-md">
          Rate limit
        </div>
        <div className="flex w-[100px] items-center self-stretch text-gray-4 text-sm-md">
          Moderation
        </div>
      </div>
      {ModlItems.map((item, index) => (
        <div className="flex min-w-[200px] py-xxs items-center self-stretch shadow-border-b shadow-gray-2">
          <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
            <Tag text={item.name} icon={item.icon} />
          </div>
          <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
            <span className="text-gray-5 text-sm-regular">
              {item.promptCost}
            </span>
            <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
          </div>
          <div className="flex w-[180px] items-center self-stretch text-gray-4 text-sm-md">
            <span className="text-gray-5 text-sm-regular">
              {item.completionCost}
            </span>
            <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
          </div>
          <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-regular">
            {item.context}
          </div>
          <div className="flex w-[80px] items-center self-stretch text-gray-4 text-sm-regular">
            {item.ratelimit}
          </div>
          <div className="flex w-fit items-center self-stretch text-gray-4 text-sm-md">
            <Tag
              text={item.moderation}
              textColor={item.moderation == "Filtered" ?"text-success" : "text-error"}
              backgroundColor={
                item.moderation == "Filtered" ? "bg-success/10" : ""
              }
              border=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default function Modelspage() {
  return (
    <PageContent title="Models" subtitle="">
      <span className="text-md-medium">Supported models</span>
      <ModelsTable
        ModlItems={[
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
            name: "azure-gpt-4-32k",
            icon: <OpenAI size="sm" />,
            promptCost: "$0.0315",
            completionCost: "$0.063",
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
            name: "gpt-3.5-turbo-1106",
            icon: <OpenAI size="sm" />,
            promptCost: "$0.00105",
            completionCost: "$0.063",
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
            name: "gemini-pro",
            icon: <Google size="sm" />,
            promptCost: "$0.001313",
            completionCost: "$0.002625",
            context: "32K",
            ratelimit: "300 RPM",
            moderation: "Filtered",
          },
          {
            name: "mistral-tiny",
            icon: <Google size="sm" />,
            promptCost: "$0.0001575",
            completionCost: "$0.000483",
            context: "32K",
            ratelimit: "120 RPM",
            moderation: "Filtered",
          },
          {
            name: "mistral-small",
            icon: <Google size="sm" />,
            promptCost: "$0.000683",
            completionCost: "$0.00206",
            context: "32K",
            ratelimit: "120 RPM",
            moderation: "Filtered",
          },
          {
            name: "mistral-medium",
            icon: <Google size="sm" />,
            promptCost: "$0.00287",
            completionCost: "$0.0086",
            context: "32K",
            ratelimit: "120 RPM",
            moderation: "Filtered",
          },
        ]}
      />
    </PageContent>
  );
}
