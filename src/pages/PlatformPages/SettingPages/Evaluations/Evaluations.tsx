import React from "react";
import { Button, Check, Pencil } from "src/components";
import { ModelTag, Tag } from "src/components/Misc";
import { PageContent, PageParagraph } from "src/components/Sections";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { format } from "date-fns";
import { DotsButton } from "src/components/Buttons";
import { EditModal } from "./components";
import cn from "src/utilities/classMerge";
import { EvalData } from "./data";
type Props = {};

export default function Evaluations({}: Props) {
  return (
    <PageContent
      title={
        <div className="display-sm text-gray-5">
          Evaluations <span className="caption-cap text-primary">BETA</span>
        </div>
      }
      subtitle={"Monitor performance in production."}
    >
      {/* <PageParagraph
        heading={"Custom evaluations"}
        subheading={"Add your own custom evaluations."}
      >
        <Button variant="r4-primary" text="Add custom eval" />
      </PageParagraph> */}
      <PageParagraph
        heading={"Pre-built evaluations"}
        subheading={
          <div>
            Read the{" "}
            <a className="text-primary" href="https://docs.keywordsai.co/">
              documentation
            </a>{" "}
            on eval metrics.
          </div>
        }
      >
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          defaultOpen
          content={{
            trigger: <div className="text-sm-md text-gray-4">Retrieval</div>,
            triggerClassName: "",
            content: (
              <EvalCard
                {...(EvalData.contextPrecision as any)}
                updatedTime={new Date()}
                model={"gpt-4"}
                isEnable={false}
              />
            ),
            contentClassName: "flex-col items-start gap-xxs self-stretch",
            className: "",
          }}
        />
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          defaultOpen
          content={{
            trigger: (
              <div className="text-sm-md text-gray-4">Text generation</div>
            ),
            triggerClassName: "",
            content: (
              <div className="flex-col gap-xxs">
                <EvalCard
                  {...(EvalData.faithfulness as any)}
                  updatedTime={new Date()}
                  model={"gpt-4"}
                  isEnable={false}
                />
                <EvalCard
                  {...(EvalData.fleschKincaidReadability as any)}
                  updatedTime={new Date()}
                  model={"auto"}
                  isEnable
                />

                <EvalCard
                  {...(EvalData.answerRelevance as any)}
                  updatedTime={new Date()}
                  model={"gpt-4"}
                  isEnable={false}
                />
              </div>
            ),
            contentClassName: "flex-col items-start gap-xxs self-stretch",
          }}
        />
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          defaultOpen
          content={{
            trigger: <div className="text-sm-md text-gray-4">Other</div>,
            triggerClassName: "",
            content: (
              <EvalCard
                {...(EvalData.sentiment as any)}
                updatedTime={new Date()}
                model={"gpt-4"}
                isEnable={false}
              />
            ),
            contentClassName: "flex-col items-start gap-xxs self-stretch",
            className: "",
          }}
        />
      </PageParagraph>
    </PageContent>
  );
}
type EvalCardProps = {
  title: string;
  subtitle: string;
  description?: string;
  updatedTime: Date;
  model: string;
  isEnable: boolean;
  inputText?: string;
  outputs?: any;
  metrics: any[];
};
const EvalCard = ({
  title,
  subtitle,
  description,
  updatedTime,
  model,
  isEnable,
  inputText,
  outputs,
  metrics,
}: EvalCardProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <EditModal
      trigger={
        <div
          className={cn(
            "flex-col py-xxs px-xs items-start gap-xxxs self-stretch bg-gray-1 shadow-border  rounded-sm cursor-pointer",
            "hover:bg-gray-2 hover:shadow-gray-3",
            "bg-gray-1 shadow-gray-2"
          )}
          onClick={() => setOpen(true)}
        >
          <div
            aria-label="top row"
            className="flex justify-between items-center self-stretch"
          >
            <div className="flex items-center gap-xxs text-sm-md text-gray-5">
              {title}
            </div>
            <div className="flex items-center gap-xs">
              <div className="flex items-center gap-xxs">
                <p className=" text-gray-4 caption">
                  Updated {format(new Date(updatedTime), "M/dd/yyyy")}
                </p>
                <div className="flex items-center gap-xxxs">
                  <ModelTag model={model} />
                  <Tag
                    text={isEnable ? "Enabled" : "Disabled"}
                    border="border-none"
                    backgroundColor={isEnable ? "bg-success/10" : "bg-red/10"}
                    textColor={isEnable ? "text-success" : "text-red"}
                    icon={isEnable ? <Check fill="fill-success" /> : null}
                  />
                </div>
              </div>
              <Pencil size="sm" />
            </div>
          </div>
          <div
            aria-label="subtitle"
            className="max-w-[400px] caption w-full text-gray-4"
          >
            {subtitle}
          </div>
        </div>
      }
      title={title}
      subtitle={description}
      isEnable={isEnable}
      inputText={inputText}
      outputs={outputs}
      metrics={metrics}
    />
  );
};
