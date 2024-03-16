import React from "react";
import { Check, Divider, Down, Pencil } from "src/components";
import { CopyButton, DotsButton } from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import { SelectInputSmall } from "src/components/Inputs";
import { Tag } from "src/components/Misc/Tag";
import Accordion from "src/components/Sections/Accordion/Accordion";
import { useTypedSelector } from "src/store/store";

export interface EditModalProps {
  title: string;
  subtitle?: string;
  isEnable: boolean;
  inputText?: string;
  outputText?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditModal({
  title,
  subtitle,
  isEnable,
  inputText,
  outputText,
  open,
  setOpen,
}: EditModalProps) {
  const models = useTypedSelector((state) =>
    Object.values(state.models.models).map((model: any) => ({
      name: model.display_name,
      value: model.model_name,
    }))
  );
  const [isEnableState, setIsEnableState] = React.useState(isEnable);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
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
      <div className="flex justify-between items-center self-stretch">
        <p className="text-sm-regular text-gray-4">Model</p>
        <SelectInputSmall
          headLess
          choices={[{ name: "Auto-select", value: "auto" }, ...models]}
          width="w-[200px]"
          defaultValue={"auto"}
          height="h-[500px]"
          icon={Down}
        />
      </div>
      <Accordion
        className="flex-col items-start gap-xxs self-stretch"
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
                <div className="flex py-xxxs px-xxs items-start gap-[10px] overflow-auto break-words select-text whitespace-pre-line">
                  {inputText}
                </div>
              </div>
              <div className="flex-col items-start gap-xxxs self-stretch">
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-sm-md text-gray-5">Output</p>
                  <CopyButton text={outputText} />
                </div>
                <div className="flex py-xxxs px-xxs items-start gap-[10px] overflow-auto break-words select-text whitespace-pre-line">
                  {outputText}
                </div>
              </div>
            </div>
          ),
          contentClassName: "flex-col items-start gap-xxs self-stretch",
        }}
      />
    </Modal>
  );
}
