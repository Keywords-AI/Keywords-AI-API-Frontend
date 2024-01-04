import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { updateUser } from "src/store/actions";
import { connect } from "react-redux";
import { ModelPresetCard } from "src/components/Cards";
import { useForm } from "react-hook-form";
import { models } from "src/utilities/constants";

const mapStateToProps = (state) => ({
  dynamicRoutingEnabled: state.user.dynamic_routing_enabled,
  customPresetModels: state.user.custom_preset_models,
  userPresetOption: state.user.preset_option,
});
const mapDispatchToProps = { updateUser };

export const ModelRouterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    dynamicRoutingEnabled,
    updateUser,
    customPresetModels,
    userPresetOption,
  }) => {
    console.log(userPresetOption);
    const [presetOption, setPresetOption] = React.useState(userPresetOption);
    const [dynamicRouting, setDynamicRouting] = React.useState(
      dynamicRoutingEnabled
    );
    useEffect(() => {
      setDynamicRouting(dynamicRoutingEnabled);
    }, [dynamicRoutingEnabled]);
    useEffect(() => {
      if (userPresetOption) {
        setPresetOption(userPresetOption);
      }
    }, [userPresetOption]);
    const handleToggleDynamicRouting = () => {
      setDynamicRouting(!dynamicRouting);
      updateUser({ dynamic_routing_enabled: !dynamicRouting });
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      console.log(data);
    };
    const handleRadioChecked = (e) => {
      const presetModelsString = e.target.value;
      const presetModels = presetModelsString.split(",");
      const preset_models = models
        .filter((model) => {
          return presetModels.includes(model.value);
        })
        .map((model) => model.value);
      console.log(presetOption);
      updateUser({ preset_models });
    };
    const customDisplayModels = models.filter((model) => {
      const filterList = customPresetModels || [];
      return filterList.includes(model.value);
    });
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
          <form
            className="flex flex-col items-start gap-xs w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ModelPresetCard
              title="All models"
              models={models}
              hideModels={true}
              {...register("model_preset")}
              hasButton={false}
              onChange={(e) => {
                handleRadioChecked(e);
                setPresetOption("all_models");
                updateUser({ preset_option: "all_models" });
              }}
              checked={presetOption === "all_models"}
            />
            <ModelPresetCard
              title="Recommended"
              {...register("model_preset")}
              hasButton={false}
              onChange={(e) => {
                handleRadioChecked(e);
                setPresetOption("recommended_models");
                updateUser({ preset_option: "recommended_models" });
              }}
              checked={presetOption === "recommended_models"}
            />
            <ModelPresetCard
              title="Custom"
              {...register("model_preset")}
              onChange={(e) => {
                handleRadioChecked(e);
                setPresetOption("custom_models");
                updateUser({ preset_option: "custom_models" });
              }}
              models={customDisplayModels}
              checked={presetOption === "custom_models"}
            />
            {/* <Button variant="r4-primary" text="Create custom preset" />  //to be added in future, not part of current ver */}
          </form>
        </div>
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
