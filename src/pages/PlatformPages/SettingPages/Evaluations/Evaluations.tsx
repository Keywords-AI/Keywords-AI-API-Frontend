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
import { useTypedSelector } from "src/store/store";
type Props = {};

export default function Evaluations({}: Props) {
  const orgnization = useTypedSelector((state) => state.organization);
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
                model={orgnization?.context_precision_eval?.model || "auto"}
                selected={orgnization?.context_precision_eval?.metrics}
                isEnable={orgnization?.context_precision_eval?.enabled || false}
                evalName="context_precision_eval"
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
                  model={orgnization?.faithfulness_eval?.model || "auto"}
                  selected={orgnization?.faithfulness_eval?.metrics}
                  isEnable={orgnization?.faithfulness_eval?.enabled || false}
                  evalName="faithfulness_eval"
                />
                <EvalCard
                  {...(EvalData.fleschKincaidReadability as any)}
                  updatedTime={new Date()}
                  model={orgnization?.sentiment_analysis_eval?.model || "None"}
                  selected={orgnization?.flesch_kincaid_eval?.metrics}
                  isEnable={orgnization?.flesch_kincaid_eval?.enabled || false}
                  evalName="flesch_kincaid_eval"
                />

                <EvalCard
                  {...(EvalData.answerRelevance as any)}
                  updatedTime={new Date()}
                  model={orgnization?.answer_relevance_eval?.model || "auto"}
                  selected={orgnization?.answer_relevance_eval?.metrics}
                  isEnable={
                    orgnization?.answer_relevance_eval?.enabled || false
                  }
                  evalName="answer_relevance_eval"
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
                model={orgnization?.sentiment_analysis_eval?.model || "None"}
                selected={orgnization?.sentiment_analysis_eval?.metrics}
                isEnable={
                  orgnization?.sentiment_analysis_eval?.enabled || false
                }
                evalName="sentiment_analysis_eval"
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
  selected: string;
  isEnable: boolean;
  inputText?: string;
  outputs?: any;
  metrics: any[];
  evalName: string;
};
const EvalCard = ({
  title,
  subtitle,
  description,
  updatedTime,
  model,
  selected,
  isEnable,
  inputText,
  outputs,
  metrics,
  evalName,
}: EvalCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return (
    <EditModal
      evalName={evalName}
      model={model}
      selectedMetric={selected}
      trigger={
        <div
          className={cn(
            "flex-col py-xxs px-xs items-start gap-xxxs self-stretch bg-gray-1 shadow-border  rounded-sm cursor-pointer",
            "hover:bg-gray-2 hover:shadow-gray-3",
            "bg-gray-1 shadow-gray-2"
          )}
          onClick={() => {
            setOpen(true);
            setHover(false);
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
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
              <Pencil size="sm" active={hover} />
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
