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
import { updateOrgEvalOptions } from "src/store/actions";

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

  const onSubmit = (data: any) => {

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
            { name: "1-10", value: 1 },
            { name: "11-50", value: 11 },
            { name: "51-200", value: 51 },
            { name: "200+", value: 200 },
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
        placeholder={"i.e. Use the following rubric to assign a score to the answer based on its conciseness:\n- Score 1: The answer is overly verbose, containing a significant amount of unnecessary information, repetition, or redundant expressions that do not contribute to the understanding of the topic.\n- Score 2: The answer includes some unnecessary details or slightly repetitive information, but the excess does not severely hinder understanding.\n- Score 3: The answer is clear, direct, and to the point, with no unnecessary words, details, or repetition."}
        height="h-[244px]"
        customModal={true}
        {...register("rubric")}
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
