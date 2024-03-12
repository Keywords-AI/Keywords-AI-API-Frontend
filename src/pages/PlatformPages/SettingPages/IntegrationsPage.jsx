import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { IntegrationModal } from "./components";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Button } from "src/components/Buttons";

export const IntegrationsPage = () => {
  const vendors = useSelector((state) => state.vendors);
  const [openRequest, setOpenRequest] = React.useState(false);
  const orderedVendors = [
    "OpenAI",
    "Azure OpenAI",
    "Anthropic",
    "Cohere",
    "AI21 Labs",
    "Google",
  ];

  return (
    <PageContent
      title="Integrations"
      subtitle="Securely store and manage external models and API keys. "
    >
      <PageParagraph
        heading="LLM providers"
        subheading="You can choose to add your provider API keys for direct integration, utilizing your own credits. By default, you will be using our provider API keys when calling our API."
      >
        <div className="flex-row items-start content-start gap-sm self-stretch flex-wrap">
          {orderedVendors.map((vendorName, index) => {
            const currVendors = vendors || [];
            const vendor = currVendors.find(
              (vendor) => vendor.name === vendorName
            );
            if (vendor) {
              return <IntegrationModal key={index} vendor={vendor} />;
            }
          })}
        </div>

        {/* <Button variant="r4-primary" text="Request model" onClick={() => { setOpenRequest(!openRequest); }} /> to be built later, not part of next release */}
      </PageParagraph>
    </PageContent>
  );
};
