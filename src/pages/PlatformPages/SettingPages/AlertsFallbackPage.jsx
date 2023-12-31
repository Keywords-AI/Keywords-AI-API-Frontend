import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Divider, PageContent, PageParagraph } from "src/components/Sections";
import { Button, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";

export const AlertsFallbackPage = ({}) => {
  return (
    <PageContent
      title="Billing"
      subtitle="Manage your billing information and invoices. For questions about billing, contact team@keywordsai.co."
    >
      <div className="flex flex-row items-start justify-between self-stretch w-full">
        <TitleStaticSubheading
          title="Subscribe to alerts"
          subtitle="Subscribe to system status and get notified via email when an LLM outage is detected."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          <SwitchButton />
        </div>
      </div>
      <Divider />
      
    </PageContent>
  );
};

//export const AlertsFallbackPage = connect(mapPropsToState, mapPropsToDispatch)(IntegrationsPageNotConnected);
