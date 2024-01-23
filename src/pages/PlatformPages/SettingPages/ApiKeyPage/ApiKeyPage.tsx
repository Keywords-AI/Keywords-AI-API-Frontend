import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LineTable } from "src/components/Tables";
import { Button, IconButton } from "src/components/Buttons";
import {
  CreateForm,
  EditForm,
  DeleteForm,
  APIKeyActions,
  IntegrationModal,
} from "../components";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Modal } from "src/components/Dialogs";
import {
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  dispatchNotification,
  processKeyList,
} from "src/store/actions";
import { RootState, DisplayApiKey, ApiKey, ApiKeyState } from "src/types";
import { Divider } from "src/components/Sections";
import { ModelTags } from "./ApiKeyComponents";
import { StateTag } from "src/components/Misc";

const mapStateToProps = (state: RootState) => ({
  apiKey: state.apiKey,
  vendors: state.integration.vendors,
  apiKeyLimit: state.organization?.organization_subscription.api_key_limit ?? 0,
});

const mapDispatchToProps = {
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  dispatchNotification,
};

interface ApiKeyPageProps {
  apiKey: ApiKeyState;
  setEditingKey: any;
  setDeletingKey: any;
  clearPrevApiKey: any;
  vendors: any;
  apiKeyLimit: number;
};

export const ApiKeyPage = ({
  apiKey,
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  vendors,
  apiKeyLimit,
}: ApiKeyPageProps) => {

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const editingTrigger = (key: ApiKey, active: boolean) => {
    return (
        <div className="flex-row w-full justify-end">
          <StateTag
            text={active ? "Active" : "Expired"}
            ok={active}
          />
          <APIKeyActions
            modifyingKey={key}
            setEditingKey={setEditingKey}
            setDeletingKey={setDeletingKey}
          />
        </div>
    );
  };
  const handleGenerateNewKey = () => {
    setOpenCreate(!openCreate);
    clearPrevApiKey();
  };
  const [prevKey, setPrevKey] = React.useState<DisplayApiKey[]>(
    processKeyList(apiKey.keyList, editingTrigger, ModelTags) || []
  );
  useEffect(() => {
    setPrevKey(
      processKeyList(apiKey.keyList, editingTrigger, ModelTags) || []
    );
  }, [apiKey.keyList]);
  const orderedVendors = [
    "OpenAI",
    "Anthropic",
    "Cohere",
    "AI21 Labs",
    "Google",
  ];
  return (
    <PageContent
      title="API Keys"
      subtitle="Read the documentation on using our API here."
    >
      <PageParagraph
        heading="Manage proxy keys"
        subheading="Your secret Keywords AI proxy keys are listed below. Please note that we do not display your API keys again after you generate them. Do not share your API key with others, or expose it in the browser or other client-side code. "
      >
        {prevKey.length > 0 && (
          <LineTable
            variant={"api-keys"}
            rows={prevKey}
            headers={[
              "Key",
              "Last used",
              "Models",
              `${apiKey.keyList?.length}/${apiKeyLimit}`,
            ]}
            columnNames={["name", "last_used", "models", "actions"]}
          />
        )}
        <Button
          variant="r4-primary"
          text="Generate new key"
          onClick={handleGenerateNewKey}
        />
      </PageParagraph>
      <Modal
        title={apiKey.apiKey ? "Save your API Key" : "Create new API key"}
        open={openCreate}
        setOpen={setOpenCreate}
        subtitle={
          apiKey.apiKey &&
          "Please save this key somewhere safe and accessible. For security reasons, you won’t be able to view it again through your account. If you lose this secret key, you’ll need to generate a new one."
        }
      >
        <CreateForm
          setShowForm={setOpenCreate}
          editingTrigger={editingTrigger}
        />
      </Modal>
      <Modal
        title={"Edit API key"}
        open={apiKey.editingKey}
        setOpen={setEditingKey}
      >
        <EditForm
          editingKey={apiKey.editingKey}
          setEditingKey={setEditingKey}
        />
      </Modal>
      <Modal
        title={"Revoke API key"}
        subtitle="This API key will be immediately revoked and disabled. API requests made made using this key will be rejected. Once revoked, you will no longer be able to view or modify this API key."
        open={apiKey.deletingKey}
        setOpen={setDeletingKey}
      >
        <DeleteForm
          deletingKey={apiKey.deletingKey}
          setDeletingKey={setDeletingKey}
        />
      </Modal>
      <Divider />
      <PageParagraph
        heading="LLM provider keys"
        subheading="You can choose to add your provider API keys for direct integration, utilizing your own credits. By default, you will be using our provider API keys when calling our API."
      >
        <div className="flex-col items-start content-start gap-xxs self-stretch flex-1  ">
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

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyPage);
