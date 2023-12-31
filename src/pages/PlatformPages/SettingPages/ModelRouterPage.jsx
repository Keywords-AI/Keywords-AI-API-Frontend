import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import { useSelector, useDispatch } from "react-redux";
import { toggleFallback } from "src/store/actions";
import { CurrentModel } from "../Playground/components";
import { models } from "src/components/Misc";

export const ModelRouterPage = ({}) => {
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
          <SwitchButton />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-sm items-start justify-between self-stretch">
        <TitleStaticSubheading
          title="Presets"
          subtitle="Use the recommended model preset or build custom presets for dynamic routing."
        />
        <div className="flex flex-col items-start gap-xs w-full">
          {/* awaiting componnets from @hendrix */}
        </div>
        <Button variant="r4-primary" text="Create custom preset" />
      </div>
    </PageContent>
  );
};
