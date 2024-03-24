import React, { useEffect } from "react";
import { Check, Divider, Down, Pencil } from "src/components";
import {
  Button,
  SwitchButton
} from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { format } from "date-fns";
import { set, useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import cn from "src/utilities/classMerge";
import { ModelTag, Tag } from "src/components/Misc";
import { updateCustomEval } from "src/store/actions";



export interface CustomModalEditProps {
  title: string;
  subtitle?: string;
  isEnable: boolean;
  inputText?: string;
  outputs?: any;
  metrics: any[];
  evalName: string;
  model: string;
  definition: string;
  scoringRubric: string;
  selectedMetric: string;
  updatedTime: Date;
  evalId: number;
  minScore: number;
  maxScore: number;
  threshold: number;
}
export function CustomModalEdit({
  title,
  subtitle,
  isEnable,
  definition,
  scoringRubric,
  updatedTime=new Date(),
  model,
  evalId,
  minScore,
  maxScore,
  threshold,
  // outputs,
  // metrics,
}: // evalName,
// selectedMetric,
CustomModalEditProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, //form errors
  } = useForm({defaultValues: {name: title, model: model, definition: definition, scoring_rubric: scoringRubric, enabled: isEnable, max_score: maxScore, min_score: minScore, threshold_value:threshold}});
  const dispatch = useTypedDispatch();
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [hoverTestMode, setHoverTestMode] = React.useState(false);
  const [enabledState, setEnabledState] = React.useState(isEnable);
  const onSubmit = (data: any) => {
    data.id = evalId;
    data.enabled=enabledState
    console.log(data);
    dispatch(updateCustomEval(data));
    setOpen(false);
  };
  useEffect(() => {
    setEnabledState(isEnable);
  }, [isEnable]);
  return (
    <Modal
      open={open}
      setOpen={(open) => {
        setOpen(open);
      }}
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
                  {enabledState && <ModelTag model={model} />}
                  <Tag
                    text={enabledState ? "Enabled" : "Disabled"}
                    border="border-none"
                    backgroundColor={enabledState ? "bg-success/10" : "bg-red/10"}
                    textColor={enabledState ? "text-success" : "text-red"}
                    icon={enabledState ? <Check fill="fill-success" /> : null}
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
      title={
      <div className="flex justify-between items-center self-stretch">
        <div className="flex flex-row items-center gap-xxs">
          {title}{" "}
          <Tag
            text={enabledState ? "Enabled" : "Disabled"}
            border="border-none cursor-pointer"
            backgroundColor={enabledState ? "bg-success/10" : "bg-red/10"}
            textColor={enabledState ? "text-success" : "text-red"}
            icon={enabledState ? <Check fill="fill-success" /> : null}
          />
        </div>
        <div
          className="flex flex-row gap-xxs items-center py-xxxs px-xxs rounded-sm hover:bg-gray-2 cursor-pointer"
          onMouseEnter={() => setHoverTestMode(true)}
          onMouseLeave={() => setHoverTestMode(false)}
        >
          {!hoverTestMode && (
            <span className="text-gray-4 text-sm-regular">
              {enabledState ? "On" : "Off"}{" "}
            </span>
          )}
          {hoverTestMode && (
            <span className="text-gray-5 text-sm-regular">
              {enabledState ? "On" : "Off"}
            </span>
          )}
          <SwitchButton hovered={hoverTestMode} checked={enabledState} onCheckedChange={()=>{setEnabledState(!enabledState)}}/>
      </div>
    </div>}
      subtitle={subtitle}
    >
      <div className="flex flex-row items-start gap-xs self-stretch">
        <TextInput
          {...register("name", {
            required: "Custom metric name cannot be blank."
          })}
          title="Name"
          width="w-full"
          // value={currName || ""}
          placeholder="i.e. Conciseness"
        />
        <SelectInput
          {...register("model")}
          title="Model"
          width="w-[180px]"
          placeholder="Auto-select"
          defaultValue="gpt-4-turbo-preview"
          choices={[
            { name: "GPT 4", value: "gpt-4" },
            { name: "GPT 4 Turbo", value: "gpt-4-turbo-preview" },
            { name: "Claude 3 Haiku", value: "claude-3-haiku-20240307" },
            { name: "GPT 3.5 Turbo", value: "gpt-3.5-turbo" },
          ]}
          optionsWidth="w-[180px]"
        />
      </div>
      <TextAreaInput
        title={"Definition"}
        placeholder="i.e. Conciseness in communication refers to the expression of ideas in a clear and straightforward manner, using the fewest possible words without sacrificing clarity or completeness of information. It involves eliminating redundancy, verbosity, and unnecessary details, focusing instead on delivering the essential message efficiently."
        height="h-[144px]"
        customModal={true}
        {...register("definition")}
      />
      <TextAreaInput
        title={"Scoring rubric"}
        placeholder={
          "i.e. Use the following rubric to assign a score to the answer based on its conciseness:\n- Score 1: The answer is overly verbose, containing a significant amount of unnecessary information, repetition, or redundant expressions that do not contribute to the understanding of the topic.\n- Score 2: The answer includes some unnecessary details or slightly repetitive information, but the excess does not severely hinder understanding.\n- Score 3: The answer is clear, direct, and to the point, with no unnecessary words, details, or repetition."
        }
        height="h-[244px]"
        customModal={true}
        {...register("scoring_rubric")}
      />
      <div className="flex-row self-stretch gap-xs items-center">
        <TextInput title={"Minimum score"} type={"number"} placeholder=".e.g 0" {...register("min_score")}/>
        <TextInput title={"Maximum score"} type={"number"} placeholder={".e.g 1"} {...register("max_score")}/>
      </div>
      {/* threshold_value is the actual column name on the db. Threshold is the calcualted result that passed back to the front end. */}
      <TextInput title={"Threshold"} type={"number"} placeholder={`Define a threshold for the response to be considered "good"`} {...register("threshold_value")} />
      <div className="flex justify-end items-center gap-xs self-stretch">
        <div className="flex justify-end items-center gap-xs">
          <DialogClose asChild>
            <Button variant="r4-gray-2" text="Cancel" />
          </DialogClose>

          <Button
            variant="r4-primary"
            text="Save"
            onClick={(e) => handleSubmit(onSubmit)(e)}
          />
        </div>
      </div>
    </Modal>
  );
}
