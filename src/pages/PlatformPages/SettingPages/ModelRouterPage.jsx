import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { updateUser } from "src/store/actions";
import { connect } from "react-redux";
import { ModelPresetCard } from "src/components/Cards";

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
      <div className="flex flex-row items-start justify-between self-stretch w-full">
        <TitleStaticSubheading
          title="Dynamic LLM routing"
          subtitle="Enable dynamic model routing to optimize for performance."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton
            checked={dynamicRouting}
            onCheckedChang={handleToggleDynamicRouting}
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-sm items-start justify-between self-stretch">
        <TitleStaticSubheading
          title="Presets"
          subtitle="Use the recommended model preset or build custom presets for dynamic routing."
        />
        <form className="flex flex-col items-start gap-xs w-full">
          <ModelPresetCard
            title="All models"
            models={[]}
          />
          <ModelPresetCard
            title="Recommended"
          />
          <ModelPresetCard
            title="Custom"
          />
        </form>
        <Button variant="r4-primary" text="Create custom preset" />
      </div>
    </PageContent>
  );
});
