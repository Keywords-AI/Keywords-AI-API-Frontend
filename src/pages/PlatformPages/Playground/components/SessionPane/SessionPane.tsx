import SliderInput from "src/components/Inputs/SliderInput";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { useForm, Controller } from "react-hook-form";
import { Divider } from "src/components";
import React, {
  forwardRef,
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { models } from "src/utilities/constants";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { setModelOptions } from "src/store/actions";
import { debounce } from "lodash";
import { useCallback } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
export interface SessionPaneProps {
  isReset: boolean;
}

export const SessionPane = forwardRef(
  ({ isReset }: SessionPaneProps, ref: ForwardedRef<any>) => {
    const {
      handleSubmit,
      control,
      watch,
      reset,
      register,
      formState: { isDirty, dirtyFields },
    } = useForm();
    const dispatch = useTypedDispatch();
    const ModelOptions = useTypedSelector(
      (state) => state.playground.modelOptions
    );
    const streamingState = useTypedSelector((state) => state.streamingText);
    const isStreaming = streamingState.some((item) => item.isLoading === true);
    const breakDownData = useTypedSelector(
      (state) => state.playground.breakdownData
    );
    const allModels = useTypedSelector((state) => state.models.models);
    const modelsArray = Object.values(allModels).map((model: any) => {
      return {
        name: model.display_name,
        value: model.model_name,
      };
    });
    let [selectChoices, setSelectChoices] = React.useState<any[]>([
      // { name: "Router (best for prompt)", value: "router" },
      { name: "None", value: "none" },
    ]);
    useEffect(() => {
      setSelectChoices([
        // { name: "Router (best for prompt)", value: "router" },
        { name: "None", value: "none" },
        ...modelsArray,
      ]);
    }, [modelsArray]);
    const debouncedDispatch = useCallback(
      debounce((value) => dispatch(setModelOptions(value)), 300),
      [dispatch]
    );

    useEffect(() => {
      if (isReset) {
        reset();
      }
    }, [isReset]);

    useEffect(() => {
      watch((value, { name, type }) => {
        if (!value || value.length === 0 || Object.keys(value).length === 0)
          return;
        const newModelOptionsState = {
          temperature: value.temperature,
          maximumLength: value.maximumLength,
          topP: value.topP,
          frequencyPenalty: value.frequencyPenalty,
          presencePenalty: value.presencePenalty,
          models: [value.modela, value.modelb],
        };
        dispatch(setModelOptions(newModelOptionsState));
      });
    }, [watch]);
    return (
      <>
        <div
          className="flex-col px-lg py-md items-start gap-xs self-stretch"
          ref={ref}
        >
          <SelectInput
            //{ value: ModelOptions.model }
            {...register("modela", {
              value: ModelOptions.models[0],
            })}
            disabled={isStreaming}
            title="Model A"
            width="w-[256px]"
            optionsWidth="w-[256px]"
            choices={selectChoices}
            placeholder="Select a model"
            defaultValue={
              selectChoices.find((i) => i.value == ModelOptions.models[0])
                ?.value
            }
          />
          <SelectInput
            //{ value: ModelOptions.model }
            {...register("modelb", {
              value: ModelOptions.models[1],
            })}
            title="Model B"
            width="w-[256px]"
            optionsWidth="w-[256px]"
            disabled={isStreaming}
            choices={selectChoices}
            placeholder="Select a model"
            defaultValue={
              selectChoices.find((i) => i.value == ModelOptions.models[1])
                ?.value
            }
          />
          <Controller
            control={control}
            name="temperature"
            defaultValue={ModelOptions.temperature}
            // disabled={isStreaming}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Temperature"
                value={value}
                min={0}
                disabled={isStreaming}
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
            // disabled={isStreaming}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Maximum length"
                value={value}
                min={1}
                max={4096}
                disabled={isStreaming}
                step={1}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="topP"
            defaultValue={ModelOptions.topP}
            // disabled={isStreaming}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Top P"
                value={value}
                min={0}
                max={1}
                disabled={isStreaming}
                step={0.01}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="frequencyPenalty"
            defaultValue={ModelOptions.frequencyPenalty}
            // disabled={isStreaming}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Frequency penalty"
                value={value}
                min={0}
                max={2}
                disabled={isStreaming}
                step={0.01}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="presencePenalty"
            defaultValue={ModelOptions.presencePenalty}
            // disabled={isStreaming}
            render={({ field: { value, onChange } }) => (
              <SliderInput
                label="Presence penalty"
                value={value}
                disabled={isStreaming}
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
