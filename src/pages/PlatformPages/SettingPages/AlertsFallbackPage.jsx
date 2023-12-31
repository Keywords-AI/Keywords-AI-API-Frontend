import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";

export const AlertsFallbackPage = ({}) => {
  return (
    <PageContent
      title="Alerts & Fallback"
      subtitle="Get notified when an LLM outage is detected and set the fallback mechanism."
    >
      {/* <div className="flex flex-row items-start justify-between self-stretch w-full"> //to be added once alerts are setup
        <TitleStaticSubheading
          title="Subscribe to alerts"
          subtitle="Subscribe to system status and get notified via email when an LLM outage is detected."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton />
        </div>
      </div>
      <Divider /> */}
        <div className="flex flex-row items-start justify-between self-stretch w-full">
        <TitleStaticSubheading
          title="Model fallback"
          subtitle="Enable model fallback to boost your product’s uptime. Automatically fallback to the backup models when the preferred model is not responding."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton />
        </div>
      </div>
    </PageContent>
  );
};

//export const AlertsFallbackPage = connect(mapPropsToState, mapPropsToDispatch)(IntegrationsPageNotConnected);
