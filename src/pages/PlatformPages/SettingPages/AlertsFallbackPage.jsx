import React, { useEffect } from "react";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import { useSelector, useDispatch } from "react-redux";
import { toggleFallback } from "src/store/actions";
import { CurrentModel } from "../Playground/components";
import { models } from "src/components/Misc";

export const AlertsFallbackPage = ({}) => {
  const dispatch = useDispatch();
  const isFallbackEnabled = useSelector(
    (state) => state.fallback.isFallbackEnabled
  );

  const handleToggle = () => {
    dispatch(toggleFallback(!isFallbackEnabled));
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
          <span className="text-sm-regular text-gray-4">Coming soon</span>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-sm items-start justify-between self-stretch">
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
                title="Model #1"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
              />
              <SelectInput
                title="Model #2"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
              />
              <SelectInput
                title="Model #3"
                width="w-[248px]"
                optionsWidth="w-[248px]"
                choices={models}
              />
            </div>
            <Button variant="r4-primary" text="Save" />
          </>
        )}
      </div>
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

export default AlertsFallbackPage;
