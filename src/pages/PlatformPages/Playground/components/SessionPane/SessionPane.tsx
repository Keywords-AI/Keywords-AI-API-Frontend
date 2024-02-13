import SliderInput from "src/components/Inputs/SliderInput";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { useForm, Controller } from "react-hook-form";
import { models } from "src/components/Misc";
import { Divider } from "src/components";

export interface SessionPaneProps {
  prop?: string;
}

export function SessionPane({ prop = "default value" }: SessionPaneProps) {
  const { handleSubmit, control, watch } = useForm();

  return (
    <>
      <div className="flex-col px-lg py-md items-start gap-xs self-stretch">
        <SelectInput
          // {...register("fall_back_model_1")}
          title="Model"
          width="w-[248px]"
          optionsWidth="w-[248px]"
          choices={models}
          defaultValue={models?.[0].value}
          placeholder="Select model #1"
        />
        <Controller
          control={control}
          name="temperature"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <SliderInput
              label="Temperature"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="maximumLength"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <SliderInput
              label="Maximum length"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="topP"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <SliderInput label="Top P" value={value} onValueChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name="presencePenalty"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <SliderInput
              label="Presence penalty"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </div>
      <Divider />
      <div className="flex-col px-lg py-md items-start gap-xs self-stretch">
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <p className="text-sm-md text-gray-5">Prompt tokens</p>
          <p className="text-sm-regular text-gray-4">2,312</p>
        </div>
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <p className="text-sm-md text-gray-5">Completion tokens</p>
          <p className="text-sm-regular text-gray-4">2,312</p>
        </div>
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <p className="text-sm-md text-gray-5">Total tokens</p>
          <p className="text-sm-regular text-gray-4">2,312</p>
        </div>
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <p className="text-sm-md text-gray-5">Cost</p>
          <p className="text-sm-regular text-gray-4">2,312</p>
        </div>
      </div>
    </>
  );
}
