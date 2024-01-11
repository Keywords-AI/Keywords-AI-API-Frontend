import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { updateUser, updateOrganization } from "src/store/actions";
import { connect } from "react-redux";
import { ModelPresetCard } from "src/components/Cards";
import { useForm } from "react-hook-form";
import { models } from "src/utilities/constants";
import CreatePreset from "./components/CreatePreset";

const mapStateToProps = (state) => ({
  dynamicRoutingEnabled: state.user.dynamic_routing_enabled,
  userPresetOption: state.organization?.preset_option,
  userPresetModels: state.organization?.preset_models,
  customPresetModels: state.organization?.custom_preset_models,
  customPresets: state.user.custom_presets,
});
const mapDispatchToProps = { updateUser, updateOrganization};

export const ModelRouterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    dynamicRoutingEnabled,
    updateUser,
    userPresetOption,
    customPresetModels,
    customPresets,
    updateOrganization,
  }) => {
    const [dynamicRouting, setDynamicRouting] = React.useState(
      dynamicRoutingEnabled
    );
    useEffect(() => {
      setDynamicRouting(dynamicRoutingEnabled);
    }, [dynamicRoutingEnabled]);

    const handleToggleDynamicRouting = () => {
      setDynamicRouting(!dynamicRouting);
      updateOrganization({ dynamic_routing_enabled: !dynamicRouting });
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const handleRadioChecked = (e, presetOption) => {
      console.log(e.target.value);
      if (presetOption !== "custom_models") {
        let modelList = e.target.value.split(",");
        updateOrganization({
          preset_option: presetOption,
          preset_models: modelList,
        });
      } else {
        updateOrganization({
          preset_option: presetOption,
          custom_preset_models: customPresetModels,
        });
      }
    };

    return (
      <PageContent
        title={
          <>
            <span>Model Router </span>
            <span className="caption text-primary">beta</span>
          </>
        }
        subtitle="Build model presets for dynamic routing."
      >
        {/* <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
        <TitleStaticSubheading
          title="Dynamic LLM routing"
          subtitle="Enable dynamic model routing to optimize for performance."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton
            checked={dynamicRouting}
            onCheckedChange={handleToggleDynamicRouting}
          />
        </div>
      </div> */}
        <div className="flex flex-col gap-sm items-start justify-between self-stretch">
          <TitleStaticSubheading
            title="Presets"
            subtitle="Use the recommended model preset or build custom presets for dynamic routing."
          />
          <form className="flex flex-col items-start gap-xs w-full">
            <ModelPresetCard
              title="All models"
              models={models}
              {...register("model_preset")}
              hideModels
              hasButton={false}
              onChange={(e) => {
                handleRadioChecked(e, "all_models");
              }}
              checked={userPresetOption === "all_models"}
            />
            <ModelPresetCard
              title="Recommended"
              {...register("model_preset")}
              hasButton={false}
              onChange={(e) => {
                handleRadioChecked(e, "recommended_models");
              }}
              checked={userPresetOption === "recommended_models"}
            />
            {/* <ModelPresetCard
              title="Custom"
              {...register("model_preset")}
              models={models.filter((model) =>
                customPresetModels?.includes(model.value)
              )}
              onChange={(e) => {
                handleRadioChecked(e, "custom_models");
              }}
              checked={userPresetOption === "custom_models"}
            /> */}
            {customPresets &&
              customPresets.map((preset, index) => (
                <ModelPresetCard
                  title={preset.preset_name}
                  {...register(preset.preset_name)}
                  models={models.filter((model) =>
                    preset.created_preset_models.includes(model.value)
                  )}
                  onChange={(e) => {
                    handleRadioChecked(e, preset.preset_name);
                  }}
                  checked={userPresetOption === preset.preset_name}
                />
              ))}
          </form>
        </div>
        {/* <CreatePreset /> */}
        <Divider />
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Dynamic LLM routing"
            subtitle="Enable dynamic model routing to optimize for performance."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={dynamicRouting}
              onCheckedChange={handleToggleDynamicRouting}
            />
          </div>
        </div>
      </PageContent>
    );
  }
);
