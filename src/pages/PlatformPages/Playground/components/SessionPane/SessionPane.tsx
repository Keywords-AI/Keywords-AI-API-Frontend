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
import _ from "lodash";
import { useDispatch } from "react-redux";
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
    const breakDownData = useTypedSelector(
      (state) => state.playground.breakdownData
    );
    const allModels = Object.values(
      useTypedSelector((state) => state.models.models)
    ).map((model: any) => {
      return {
        name: model.display_name,
        value: model.model_name,
      };
    });
    const selectChoices = [
      { name: "Router (best for prompt)", value: "router" },
      { name: "None", value: "none" },
      ...allModels,
    ];
    useEffect(() => {
      if (Object.keys(dirtyFields).length === 0) return;
      const newModelOptionsState = {
        ...UpdatedModelOptions,
        models: [UpdatedModelOptions.modela, UpdatedModelOptions.modelb],
      };

      if (!_.isEqual(newModelOptionsState, ModelOptions)) {
        debouncedDispatch(newModelOptionsState);
      }
    }, [UpdatedModelOptions]);
    return (
      <>
        <div
          className="flex-col px-lg py-md items-start gap-xs self-stretch"
          ref={ref}
        >
          <SelectInput
            //{ value: ModelOptions.model }
            {...register("modela")}
            title="Model A"
            width="w-[256px]"
            optionsWidth="w-[256px]"
            choices={selectChoices}
            placeholder="Select a model"
            defaultValue={selectChoices[0].value}
          />
          <SelectInput
            //{ value: ModelOptions.model }
            {...register("modelb")}
            title="Model B"
            width="w-[256px]"
            optionsWidth="w-[256px]"
            choices={selectChoices}
            placeholder="Select a model"
            defaultValue={
              selectChoices.find((item) => item.value === "gpt-4")?.value ||
              "none"
            }
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
            name="frequencyPenalty"
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
            <p className="text-sm-regular text-gray-4">
              {breakDownData.prompt_tokens.toLocaleString()}
            </p>
          </div>
          <div className="flex h-[24px] justify-between items-center self-stretch">
            <p className="text-sm-md text-gray-5">Completion tokens</p>
            <p className="text-sm-regular text-gray-4">
              {breakDownData.completion_tokens.toLocaleString()}
            </p>
          </div>
          <div className="flex h-[24px] justify-between items-center self-stretch">
            <p className="text-sm-md text-gray-5">Total tokens</p>
            <p className="text-sm-regular text-gray-4">
              {breakDownData.total_tokens.toLocaleString()}
            </p>
          </div>
          <div className="flex h-[24px] justify-between items-center self-stretch">
            <p className="text-sm-md text-gray-5">Cost</p>
            <p className="text-sm-regular text-gray-4">
              ${breakDownData.cost.toFixed(4)}
            </p>
          </div>
        </div>
      </>
    );
  }
);
