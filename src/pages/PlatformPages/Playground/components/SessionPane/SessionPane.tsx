import SliderInput from "src/components/Inputs/SliderInput";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { useForm, Controller } from "react-hook-form";
import { Divider } from "src/components";
import React, { forwardRef, ForwardedRef, useEffect } from "react";
import { models } from "src/utilities/constants";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { setModelOptions } from "src/store/actions";
import { debounce } from "lodash";
import { useCallback } from "react";
export interface SessionPaneProps {
  prop?: string;
}

export const SessionPane = forwardRef(
  (
    { prop = "default value" }: SessionPaneProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const {
      handleSubmit,
      control,
      watch,
      register,
      formState: { isDirty, dirtyFields },
    } = useForm();
    const dispatch = useTypedDispatch();
    const ModelOptions = useTypedSelector(
      (state) => state.playground.modelOptions
    );
    const UpdatedModelOptions = watch();
    const debouncedDispatch = useCallback(
      debounce(
        (updatedModelOptions) => dispatch(setModelOptions(updatedModelOptions)),
        300
      ),
      [dispatch]
    );
    useEffect(() => {
      if (Object.keys(dirtyFields).length === 0) return;
      if (
        JSON.stringify(ModelOptions) !== JSON.stringify(UpdatedModelOptions)
      ) {
        debouncedDispatch(UpdatedModelOptions);
      }
    }, [UpdatedModelOptions, ModelOptions]);
    return (
      <>
        <div
          className="flex-col px-lg py-md items-start gap-xs self-stretch"
          ref={ref}
        >
          <SelectInput
            //{ value: ModelOptions.model }
            {...register("model")}
            title="Model"
            width="w-[248px]"
            optionsWidth="w-[248px]"
            choices={models}
            placeholder="Select a model"
            defaultValue={ModelOptions.model}
          />
          <Controller
            control={control}
            name="temperature"
            defaultValue={ModelOptions.temperature}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Temperature"
                value={value}
                min={0}
                max={2}
                step={0.01}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="maximumLength"
            defaultValue={ModelOptions.maximumLength}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Maximum length"
                value={value}
                min={1}
                max={4096}
                step={1}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="topP"
            defaultValue={ModelOptions.topP}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Top P"
                value={value}
                min={0}
                max={1}
                step={0.01}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="Frequency Penalty"
            defaultValue={ModelOptions.frequencyPenalty}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Frequency penalty"
                value={value}
                min={0}
                max={2}
                step={0.01}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="presencePenalty"
            defaultValue={ModelOptions.presencePenalty}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Presence penalty"
                value={value}
                min={0}
                max={2}
                step={0.01}
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
);
