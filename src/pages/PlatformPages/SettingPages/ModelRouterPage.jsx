import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { updateUser } from "src/store/actions";
import { connect } from "react-redux";
import { ModelPresetCard } from "src/components/Cards";
import { useForm } from "react-hook-form";

const mapStateToProps = (state) => ({
  dynamicRoutingEnabled: state.user.dynamic_routing_enabled,
});
const mapDispatchToProps = { updateUser };
const AllModels = [];

export const ModelRouterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ dynamicRoutingEnabled, updateUser }) => {
  const [dynamicRouting, setDynamicRouting] = React.useState(
    dynamicRoutingEnabled
  );
  useEffect(() => {
    setDynamicRouting(dynamicRoutingEnabled);
  }, [dynamicRoutingEnabled]);

  const handleToggleDynamicRouting = () => {
    setDynamicRouting(!dynamicRouting);
    updateUser({ dynamic_routing_enabled: !dynamicRouting });
  };
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  }
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
      <Divider />
      <div className="flex flex-col gap-sm items-start justify-between self-stretch">
        <TitleStaticSubheading
          title="Presets"
          subtitle="Use the recommended model preset or build custom presets for dynamic routing."
        />
        <form className="flex flex-col items-start gap-xs w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModelPresetCard
            title="All models"
            models={[]}
            {...register("model_preset")}
            hasButton={false}
          />
          <ModelPresetCard
            title="Recommended"
            {...register("model_preset")}

            hasButton={false}
          />
          <ModelPresetCard
            title="Custom"
            {...register("model_preset")}
          />
          {/* <Button variant="r4-primary" text="Create custom preset" />  //to be added in future, not part of current ver */} 
        </form>
      </div>
    </PageContent>
  );
});
