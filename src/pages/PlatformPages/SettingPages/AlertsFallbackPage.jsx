import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import {
  toggleFallback,
  updateUser,
  toggleSystemFallback,
} from "src/store/actions";
import { models } from "src/components/Misc";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  isFallbackEnabled: state.user.fallback_model_enabled,
  fallbackModels: state.user.fallback_models,
  systemFallbackeEnabled: state.user.system_fallback_enabled,
});
const mapDispatchToProps = {
  updateUser,
  toggleFallback,
  toggleSystemFallback,
};

const AlertsFallbackPageN = ({
  isFallbackEnabled,
  updateUser,
  systemFallbackeEnabled,
  fallbackModels,
}) => {
  const [fallbackEnabled, setFallbackEnabled] =
    React.useState(isFallbackEnabled);
  const [currentFallbackModels, setCurrentFallbackModels] = React.useState(
    fallbackModels || []
  );
  const [systemEnable, setSystemEnable] = React.useState(
    systemFallbackeEnabled
  );
  useEffect(() => {
    setFallbackEnabled(isFallbackEnabled);
    setSystemEnable(systemFallbackeEnabled);
  }, [isFallbackEnabled, systemFallbackeEnabled]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const model1 = watch("fall_back_model_1");
  const model2 = watch("fall_back_model_2");
  const model3 = watch("fall_back_model_3");
  
  const filteredModelsForModel1 = models.filter(
    (model) => model.value !== model2 && model.value !== model3
  );
  const filteredModelsForModel2 = models.filter(
    (model) => model.value !== model1 && model.value !== model3
  );
  const filteredModelsForModel3 = models.filter(
    (model) => model.value !== model1 && model.value !== model2
  );

  const handleToggle = () => {
    setFallbackEnabled(!fallbackEnabled);
  };
  const onSubmit = (data) => {
    const fallback_models = [];
    Object.keys(data).forEach((key) => {
      if (key.includes("fall_back_model")) {
        if (data[key] !== "") fallback_models.push(data[key]);
      }
    });

    updateUser({ fallback_models, fallback_model_enabled: fallbackEnabled });
  };
  const handleSystemFallbackToggle = () => {
    setSystemEnable(!systemEnable);
    updateUser({ system_fallback_enabled: !systemEnable });
  };
  return (
    <PageContent
      title="Alerts & Fallback"
      subtitle="Get notified when an LLM outage is detected and set the fallback mechanism."
    >
      <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
        <TitleStaticSubheading
          title="Subscribe to alerts"
          subtitle="Subscribe to system status and get notified via email when an LLM outage is detected."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          {/* <SwitchButton/> */}
          <span className="text-sm-regular text-gray-4 whitespace-nowrap">
            Coming soon
          </span>
        </div>
      </div>
      <Divider />
      <form
        className="flex flex-col gap-sm items-start justify-between self-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Model fallback"
            subtitle="Enable model fallback to boost your product’s uptime. Automatically fallback to the backup models when the preferred model is not responding."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={fallbackEnabled}
              onCheckedChange={handleToggle}
              {...register("enable_fallback")}
            />
          </div>
        </div>
        {fallbackEnabled && (
          <>
            <div className="flex flex-col items-start gap-xs">
              <SelectInput
                {...register("fall_back_model_1")}
                title="Model #1"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={filteredModelsForModel1}
                defaultValue={currentFallbackModels?.[0]}
                placeholder="Select model #1"
              />
              <SelectInput
                {...register("fall_back_model_2")}
                title="Model #2"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={filteredModelsForModel2}
                defaultValue={fallbackModels?.[1]}
                placeholder="Select model #2"
              />
              <SelectInput
                {...register("fall_back_model_3")}
                title="Model #3"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={filteredModelsForModel3}
                defaultValue={fallbackModels?.[2]}
                placeholder="Select model #3"
              />
            </div>
            <Button variant="r4-primary" text="Save" />
          </>
        )}
      </form>
      <Divider />
      { fallbackEnabled &&
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Safety net"
            subtitle="If none of the fallback models are responding, automatically fallback to a system assigned model."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={systemEnable}
              onCheckedChange={handleSystemFallbackToggle}
            />
          </div>
        </div>
      }
    </PageContent>
  );
};

export const AlertsFallbackPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertsFallbackPageN);
