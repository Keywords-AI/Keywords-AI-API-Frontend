import React, { useEffect } from "react";
import { connect } from "react-redux";
import { SettingTable } from "src/components/Tables";
import { Button, IconButton } from "src/components/Buttons";
import {
  CreateForm,
  EditForm,
  DeleteForm,
  APIKeyActions,
  IntegrationModal,
} from "./components";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Modal } from "src/components/Dialogs";
import {
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  dispatchNotification,
} from "src/store/actions";
import { processKeyList } from "src/utilities/objectProcessing";
import { RootState } from "src/types";
import { Divider } from "src/components/Sections";

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  apiKey: state.apiKey,
  vendors: state.integration.vendors,
});

const mapDispatchToProps = {
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  dispatchNotification,
};

export const ApiKeyPage = ({
  apiKey,
  setEditingKey,
  setDeletingKey,
  clearPrevApiKey,
  vendors,
}) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const editingTrigger = (key) => {
    return (
      <>
        <div className="flex-row w-full justify-end">
          <APIKeyActions
            modifyingKey={key}
            setEditingKey={setEditingKey}
            setDeletingKey={setDeletingKey}
          />
        </div>
      </>
    );
  };
  const renderStatus = (status) => {
    return status === "Active" ? (
      <p className="text-sm-regular text-success">Active</p>
    ) : (
      <p className="text-sm-regular text-error">Expired</p>
    );
  };
  const handleGenerateNewKey = () => {
    setOpenCreate(!openCreate);
    clearPrevApiKey();
  };
  const [prevKey, setPrevKey] = React.useState(
    processKeyList(apiKey.keyList, editingTrigger, renderStatus) || []
  );
  useEffect(() => {
    setPrevKey(
      processKeyList(apiKey.keyList, editingTrigger, renderStatus) || []
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
          <SettingTable
            variant={"api-keys"}
            rows={prevKey}
            headers={["Name", "Key", "Created", "Last Used", "Status"]}
            columnNames={[
              "name",
              "mod_prefix",
              "created",
              "last_used",
              "Status",
              "actions",
            ]}
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
