import React, { useEffect } from "react";
import { Check, Divider, Down, Pencil } from "src/components";
import { Button, CopyButton, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { SelectInputSmall } from "src/components/Inputs";
import { Tag } from "src/components/Misc/Tag";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { updateOrgEvalOptions } from "src/store/actions";
export interface EditModalProps {
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

export function EditModal({
  title,
  subtitle,
  isEnable,
  inputText,
  outputs,
  metrics,
  trigger,
  evalName,
  model,
  selectedMetric,
}: EditModalProps) {
  const [isEnableState, setIsEnableState] = React.useState(false);
  useEffect(() => {
    setIsEnableState(isEnable);
  }, [isEnable]);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const dispatch = useTypedDispatch();
  const [currentMetric, setCurrentMetric] = React.useState(
    metrics.length > 0 ? metrics[0].value : ""
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setCurrentMetric(value.metrics);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = (data: any) => {
    dispatch(
      updateOrgEvalOptions(evalName, { ...data, enabled: isEnableState })
    );
    setOpen(false);
  };
  const models = [
    {
      name: "Auto-select",
      value: "auto",
    },
    {
      name: "GPT-4",
      value: "gpt-4",
    },
    {
      name: "GPT-3.5 Turbo",
      value: "gpt-3.5-turbo",
    },
  ];
  const handleCancel = () => {
    // Ensure setOpen is properly received from props
    setOpen(false); // Ensure setOpen function is properly called
  };
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    console.log("open", selectedMetric);
    setCurrentMetric(selectedMetric);
  }, [open]);
  return (
    <Modal
      open={open}
      setOpen={(open) => {
        setOpen(open);
      }}
      trigger={trigger}
      title={
        <div className="flex justify-between items-center self-stretch">
          {title}{" "}
          <Tag
            text={isEnableState ? "Enabled" : "Disabled"}
            border="border-none cursor-pointer"
            backgroundColor={isEnableState ? "bg-success/10" : "bg-red/10"}
            textColor={isEnableState ? "text-success" : "text-red"}
            icon={isEnableState ? <Check fill="fill-success" /> : null}
            onClick={() => setIsEnableState((p) => !p)}
          />
        </div>
      }
      subtitle={subtitle}
    >
      <Divider />
      {evalName != "sentiment_analysis_eval" &&
        evalName != "flesch_kincaid_eval" && (
          <div className="flex justify-between items-center self-stretch">
            <p className="text-sm-regular text-gray-4">Model</p>
            <SelectInputSmall
              {...register("model")}
              headLess
              choices={models}
              width="w-[200px]"
              defaultValue={model || "auto"}
              icon={Down}
            />
          </div>
        )}
      {metrics.length > 0 && (
        <div className="flex justify-between items-center self-stretch">
          <p className="text-sm-regular text-gray-4">Metric</p>
          <SelectInputSmall
            headLess
            {...register("metrics")}
            choices={metrics}
            width="w-[200px]"
            defaultValue={selectedMetric || metrics[0].value}
            icon={Down}
          />
        </div>
      )}
      <Accordion
        className="flex-col items-start gap-xs self-stretch"
        defaultOpen
        content={{
          trigger: <div className="text-sm-md text-gray-4">Example usage</div>,
          triggerClassName: "",
          content: (
            <div className="flex-col gap-xxs">
              <div className="flex-col items-start gap-xxxs self-stretch">
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-sm-md text-gray-5">Input</p>
                  <CopyButton text={inputText} />
                </div>
                <div className="flex py-xxxs px-xxs items-start gap-[10px] rounded-sm bg-gray-2 overflow-auto break-words select-text whitespace-pre-line text-sm-regular text-gray-4 w-full">
                  {inputText}
                </div>
              </div>
              <div className="flex-col items-start gap-xxxs self-stretch">
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-sm-md text-gray-5">Output</p>
                  <CopyButton
                    text={metrics.length > 0 ? outputs[currentMetric] : outputs}
                  />
                </div>
                <div className="flex py-xxxs px-xxs items-start gap-[10px] rounded-sm bg-gray-2 overflow-auto break-words select-text whitespace-pre-line  text-sm-regular text-gray-4 w-full">
                  {metrics.length > 0 ? outputs[currentMetric] : outputs}
                </div>
              </div>
            </div>
          ),
          contentClassName: "flex-col items-start gap-xxs self-stretch",
        }}
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
