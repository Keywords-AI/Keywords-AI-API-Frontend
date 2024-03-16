import React from "react";
import { Button, Check, Pencil } from "src/components";
import { ModelTag, Tag } from "src/components/Misc";
import { PageContent, PageParagraph } from "src/components/Sections";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { format } from "date-fns";
import { DotsButton } from "src/components/Buttons";
import { EditModal } from "./components";
import cn from "src/utilities/classMerge";
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
      <PageParagraph
        heading={"Custom evaluations"}
        subheading={"Add your own custom evaluations."}
      >
        <Button variant="r4-primary" text="Add custom eval" />
      </PageParagraph>
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
            content: <div></div>,
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
                  title="Faithfulness"
                  subtitle={
                    "How grounded is the generated answer on the retrieved contexts."
                  }
                  updatedTime={new Date()}
                  model={"gpt-4"}
                  isEnable={false}
                />
                <EvalCard
                  title="Flesch–Kincaid Readability"
                  subtitle={
                    "How easy it is to understand an by considering factors like sentence length and word complexity."
                  }
                  updatedTime={new Date()}
                  model={"auto"}
                  isEnable
                />
                <EvalCard
                  title="LLM-based Faithfulness"
                  subtitle={
                    "How grounded is the generated answer on the retrieved contexts."
                  }
                  updatedTime={new Date()}
                  model={"gpt-4"}
                  isEnable={false}
                />
                <EvalCard
                  title="LLM-based Answer Relevance"
                  subtitle={
                    "Consistency of the generated answer based on the reference ground truth answers."
                  }
                  updatedTime={new Date()}
                  model={"gpt-4"}
                  isEnable={false}
                  description={
                    "Consistency of the generated answer based on the reference ground truth answers."
                  }
                  inputText={"User message"}
                  outputText={"Sentiment"}
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
                title="Sentiment"
                subtitle={"Overall emotion of user message."}
                updatedTime={new Date()}
                model={"gpt-4"}
                isEnable={false}
                description={"Overall emotion of user message."}
                inputText={"User message"}
                outputText={"Sentiment"}
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
  outputText?: string;
};
const EvalCard = ({
  title,
  subtitle,
  description,
  updatedTime,
  model,
  isEnable,
  inputText,
  outputText,
}: EvalCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className={cn(
        "flex-col py-xxs px-xs items-start gap-xxxs self-stretch bg-gray-1 shadow-border  rounded-sm cursor-pointer",
        open || hover ? "bg-gray-2 shadow-gray-3" : "bg-gray-1 shadow-gray-2"
      )}
      onClick={() => setOpen(true)}
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
          <EditModal
            open={open}
            setOpen={setOpen}
            title={title}
            subtitle={description}
            isEnable={isEnable}
            inputText={inputText}
            outputText={outputText}
          />
        </div>
      </div>
      <div aria-label="subtitle" className="max-w-[400px] caption w-full">
        {subtitle}
      </div>
    </div>
  );
};
