import React, { ReactElement } from "react";
import { OpenAI } from "src/components";
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
    moderation: string;
  }[];
}) => {
  return (
    <div className="flex-col w-[800px] items-start bg-gray-1">
      <div
        aria-label="table-header"
        className="flex py-xs items-start self-stretch shadow-border-b shadow-gray-2"
      >
        <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
          Model
        </div>
        <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
          Prompt
        </div>
        <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
          Completion
        </div>
        <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
          Context
        </div>
        <div className="flex w-[300px] items-center self-stretch text-gray-4 text-sm-md">
          Moderation
        </div>
      </div>
      {ModlItems.map((item, index) => (
        <div className="flex min-w-[200px] py-xxs items-center self-stretch shadow-border-b shadow-gray-2">
          <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
            <Tag text={item.name} icon={item.icon} />
          </div>
          <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
            <span className="text-gray-5 text-sm-regular">
              {item.promptCost}
            </span>
            <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
          </div>
          <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-md">
            <span className="text-gray-5 text-sm-regular">
              {item.completionCost}
            </span>
            <span className=" text-gray-4 text-sm-regular"> / 1K tokens</span>
          </div>
          <div className="flex w-[160px] items-center self-stretch text-gray-4 text-sm-regular">
            {item.context}
          </div>
          <div className="flex w-[300px] items-center self-stretch text-gray-4 text-sm-md">
            <Tag
              text={item.moderation}
              backgroundColor={
                item.moderation == "Filtered" ? "bg-success/10" : "bg-error/10"
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
      hi
      <ModelsTable
        ModlItems={[
          {
            name: "Davinci",
            icon: <OpenAI size="md" />,
            promptCost: "$0.06",
            completionCost: "$0.06",
            context: "8K",
            moderation: "Filtered",
          },
          {
            name: "Davinci",
            icon: <OpenAI size="md" />,
            promptCost: "$0.06",
            completionCost: "$0.06",
            context: "8K",
            moderation: "Filtered",
          },
          {
            name: "Davinci",
            icon: <OpenAI size="md" />,
            promptCost: "$0.06",
            completionCost: "$0.06",
            context: "8K",
            moderation: "Filtered",
          },
          {
            name: "Davinci",
            icon: <OpenAI size="md" />,
            promptCost: "$0.06",
            completionCost: "$0.06",
            context: "8K",
            moderation: "Filtered",
          },
          {
            name: "Davinci",
            icon: <OpenAI size="md" />,
            promptCost: "$0.06",
            completionCost: "$0.06",
            context: "8K",
            moderation: "Filtered",
          },
        ]}
      />
    </PageContent>
  );
}
