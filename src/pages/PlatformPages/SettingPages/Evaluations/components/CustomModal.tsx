import React, { useEffect } from "react";
import { Check, Divider, Down, Pencil } from "src/components";
import {
  Button,
  CopyButton,
  DotsButton,
  SwitchButton,
} from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import {
  SelectInput,
  SelectInputSmall,
  TextAreaInput,
  TextInput,
} from "src/components/Inputs";
import { Tag } from "src/components/Misc/Tag";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { set, useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { createCustomEval } from "src/store/actions";

export interface customModalProps {
  title: string;
  subtitle?: string;
  isEnable: boolean;
  inputText?: string;
  outputs?: any;
  metrics: any[];
  trigger: any;
  evalName: string;
  model: string;
  selectedMetric: string;
}
export function CustomModal({
  title,
  subtitle,
  // isEnable,
  // inputText,
  // outputs,
  // metrics,
  trigger,
}: // evalName,
// model,
// selectedMetric,
customModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }, //form errors
  } = useForm();
  const dispatch = useTypedDispatch();
  const onSubmit = (data: any) => {
    dispatch(createCustomEval(data));
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      open={open}
      setOpen={(open) => {
        setOpen(open);
      }}
      trigger={trigger}
      title={<span className="display-xs text-gray-5">{title}</span>}
      subtitle={subtitle}
    >
      <div className="flex flex-row items-start gap-xs self-stretch">
        <TextInput
          {...register("name", {
            required: "Custom metric name cannot be blank.",
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
          defaultValue="Auto-select"
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
        <TextInput
          title={"Minimum score"}
          type={"number"}
          placeholder=".e.g 0"
          {...register("min_score")}
        />
        <TextInput
          title={"Maximum score"}
          type={"number"}
          placeholder={".e.g 1"}
          {...register("max_score")}
        />
      </div>
      {/* threshold_value is the actual column name on the db. Threshold is the calcualted result that passed back to the front end. */}
      <TextInput
        title={"Threshold"}
        type={"number"}
        placeholder={`Define a threshold for the response to be considered "good"`}
        {...register("threshold_value")}
      />
      <div className="flex justify-end items-center gap-xs self-stretch">
        <div className="flex justify-end items-center gap-xs">
          <DialogClose asChild>
            <Button variant="r4-black" text="Cancel" />
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
