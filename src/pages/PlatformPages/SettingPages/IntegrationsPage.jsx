import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IntegrationModal } from "./components";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Button } from "src/components/Buttons";
import { getVendors } from "src/store/actions";
import CreatePreset from "./components/CreatePreset";

const mapPropsToState = (state) => ({
  vendors: state.integration.vendors,
});
const mapPropsToDispatch = {
  getVendors,
};

const IntegrationsPageNotConnected = ({ vendors }) => {
  const [openRequest, setOpenRequest] = React.useState(false);
  const orderedVendors = [
    "OpenAI",
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
        <CreatePreset />
        {/* <Button variant="r4-primary" text="Request model" onClick={() => { setOpenRequest(!openRequest); }} /> to be built later, not part of next release */}
      </PageParagraph>
    </PageContent>
  );
};

export const IntegrationsPage = connect(
  mapPropsToState,
  mapPropsToDispatch
)(IntegrationsPageNotConnected);
