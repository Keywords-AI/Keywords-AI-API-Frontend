import React from "react";
import { Button, Check, Custom, Divider, Down, Pencil, Rocket } from "src/components";
import { ModelTag, Tag } from "src/components/Misc";
import { PageContent, PageParagraph } from "src/components/Sections";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { format } from "date-fns";
import { DotsButton } from "src/components/Buttons";
import { EditModal, CustomModal, CustomModalEdit } from "./components";
import cn from "src/utilities/classMerge";
import { EvalData } from "./data";
import { useTypedSelector } from "src/store/store";
import { Modal } from "src/components/Dialogs";
import { TextInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { SamplingModal } from "./components";
import { EvalTrigger} from "./components";
type Props = {};

export default function Evaluations({}: Props) {
  const organization = useTypedSelector((state) => state.organization);
  const [isHoverRandom, setIsHoverRandom] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }, //form errors
  } = useForm();
  return (
    <PageContent
      title={
        <div className="display-sm text-gray-5">
          Evaluations <span className="caption-cap text-primary">BETA</span>
        </div>
      }
      subtitle={"Monitor model performance in production."}
    >
      <PageParagraph
        heading={"Random sampling"}
        subheading={"Evaluations will run on 10% of your requests."}
      >
        <Modal
          title={"Random sampling"}
          open={open}
          setOpen={setOpen}
          trigger={
            // <Button variant={'r4-gray-2'} 
            // borderColor="shadow-transparent" borderHoverColor="shadow-transparent"
            // iconPosition="right" icon={Pencil} iconHoverFill="fill-gray-5" text={organization?.sample_percentage + "%"}/>
            <div
              className="flex flex-row py-xxs px-xs gap-xxs items-center rounded-sm bg-gray-2 cursor-pointer"
              onMouseEnter={() => setIsHoverRandom(true)}
              onMouseLeave={() => setIsHoverRandom(false)}
            >
              <span
                className={cn(
                  "text-sm-md",
                  isHoverRandom ? "text-gray-5" : "text-gray-4"
                )}
              >
                {organization.sample_percentage}%
              </span>
              <Pencil size="sm" active={isHoverRandom} />
            </div>
          }
        >
          <SamplingModal handleClose={()=>{setOpen(false)}}/>
        </Modal>
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading={"Custom evaluations"}
        subheading={"Add your own custom evaluations."}
      >
        <React.Fragment>
          {organization?.organization_custom_evals?.map((customEval, i) => (
            <CustomModalEdit 
              key={i}
              title={customEval.name}
              subtitle={"Custom evalutaion metric"}
              isEnable={customEval.enabled}
              evalId={customEval.id}
              definition={customEval.definition}
              scoringRubric={customEval.scoring_rubric}
              metrics={customEval.metrics}
              evalName={customEval.name}
              model={customEval.model}
              selectedMetric={customEval.metric}
              minScore={customEval.min_score}
              maxScore={customEval.max_score}
              threshold={customEval.threshold_value}
              updatedTime={new Date()}
            />
          ))}
        </React.Fragment>
        <CustomModal 
          title="Create custom metric"
          subtitle="Create a custom metric based on your definition and scoring rubric."
          trigger={<Button variant="r4-primary" text="Add custom eval" />}
        />
      </PageParagraph>
      <Divider />
      <PageParagraph
        heading={"Pre-built evaluations"}
        // subheading={
        //   <div>
        //     Read the{" "}
        //     <a className="text-primary hover:text-primary-2 cursor-pointer" href="https://docs.keywordsai.co/">
        //       documentation
        //     </a>{" "}
        //     on eval metrics.
        //   </div>
        // }
      >
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          content={{
            trigger: "Retrieval",
            content: (
              <EvalCard
                {...(EvalData.contextPrecision as any)}
                updatedTime={new Date()}
                model={organization?.context_precision_eval?.model || "auto"}
                selected={organization?.context_precision_eval?.metric}
                isEnable={organization?.context_precision_eval?.enabled || false}
                evalName="context_precision_eval"
              />
            ),
            contentClassName: "flex-col items-start gap-xxs self-stretch",
            className: "",
          }}
        />
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          content={{
            trigger: "Text generation",
            content: (
              <div className="flex-col gap-xxs">
                <EvalCard
                  {...(EvalData.faithfulness as any)}
                  updatedTime={new Date()}
                  model={organization?.faithfulness_eval?.model || "auto"}
                  selected={organization?.faithfulness_eval?.metric}
                  isEnable={organization?.faithfulness_eval?.enabled || false}
                  evalName="faithfulness_eval"
                />

                <EvalCard
                  {...(EvalData.answerRelevance as any)}
                  updatedTime={new Date()}
                  model={organization?.answer_relevance_eval?.model || "auto"}
                  selected={organization?.answer_relevance_eval?.metric}
                  isEnable={
                    organization?.answer_relevance_eval?.enabled || false
                  }
                  evalName="answer_relevance_eval"
                />
                <EvalCard
                  {...(EvalData.fleschKincaidReadability as any)}
                  updatedTime={new Date()}
                  model={organization?.sentiment_analysis_eval?.model || "None"}
                  selected={organization?.flesch_kincaid_eval?.metric}
                  isEnable={organization?.flesch_kincaid_eval?.enabled || false}
                  evalName="flesch_kincaid_eval"
                />
              </div>
            ),
            contentClassName: "flex-col items-start gap-xxs self-stretch",
          }}
        />
        <Accordion
          className="flex-col items-start gap-xxs self-stretch"
          content={{
            trigger: "Other",
            content: (
              <EvalCard
                {...(EvalData.sentiment as any)}
                updatedTime={new Date()}
                model={organization?.sentiment_analysis_eval?.model || "None"}
                selected={organization?.sentiment_analysis_eval?.metric}
                isEnable={
                  organization?.sentiment_analysis_eval?.enabled || false
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
              {isEnable && <ModelTag model={model} />}
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
