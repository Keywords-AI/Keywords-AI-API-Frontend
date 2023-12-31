import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import { toggleFallback, updateUser } from "src/store/actions";
import { models } from "src/components/Misc";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  isFallbackEnabled: state.fallback.isFallbackEnabled,
  fallbackModels: state.user.fallback_models,
});
const mapDispatchToProps = { updateUser, toggleFallback };


const AlertsFallbackPageN = ({
  isFallbackEnabled,
  updateUser,
  toggleFallback,
  fallbackModels,
}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const handleToggle = () => {
    toggleFallback(!isFallbackEnabled);
  };
  const onSubmit = (data) => {
    console.log(data)
    const fallback_models = [];
    Object.keys(data).forEach(key => {
      if (key.includes("fall_back_model")) {
        if (data[key] !== "")
          fallback_models.push(data[key]);
      }
    })
    updateUser({ fallback_models })
  };
  return (
    <PageContent
      title="Alerts & Fallback"
      subtitle="Get notified when an LLM outage is detected and set the fallback mechanism."
    >
      <div className="flex flex-row items-start justify-between self-stretch w-full">
        <TitleStaticSubheading
          title="Subscribe to alerts"
          subtitle="Subscribe to system status and get notified via email when an LLM outage is detected."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          {/* <SwitchButton/> */}
          <span className="text-sm-regular text-gray-4 whitespace-nowrap">Coming soon</span>
        </div>
      </div>
      <Divider />
      <form className="flex flex-col gap-sm items-start justify-between self-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-start justify-between self-stretch w-full">
          <TitleStaticSubheading
            title="Model fallback"
            subtitle="Enable model fallback to boost your product’s uptime. Automatically fallback to the backup models when the preferred model is not responding."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={isFallbackEnabled}
              onCheckedChange={handleToggle}
            />
          </div>
        </div>
        {isFallbackEnabled && (
          <>
            <div className="flex flex-col items-start gap-xs">
              <SelectInput
                {...register("fall_back_model_1")}
                title="Model #1"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
                defaultValue={fallbackModels?.[0]}
              />
              <SelectInput
                {...register("fall_back_model_2")}
                title="Model #2"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
                defaultValue={fallbackModels?.[1]}
              />
              <SelectInput
                {...register("fall_back_model_3")}
                title="Model #3"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
                defaultValue={fallbackModels?.[2]}
              />
            </div>
            <Button variant="r4-primary" text="Save" />
          </>
        )}
      </form>
      <Divider />
      <div className="flex flex-row items-start justify-between self-stretch w-full">
        <TitleStaticSubheading
          title="Safety net"
          subtitle="If none of the fallback models are responding, automatically fallback to a system assigned model."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton />
        </div>
      </div>
    </PageContent>
  );
};

export const AlertsFallbackPage = connect(mapStateToProps, mapDispatchToProps)(AlertsFallbackPageN);
