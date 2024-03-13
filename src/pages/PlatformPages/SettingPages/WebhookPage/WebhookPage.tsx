import React, { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { Button } from "src/components/Buttons";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Modal } from "src/components/Dialogs";
import {
  CreateWebhookForm,
  WebhookTable,
  DeleteWebhookForm,
} from "./components";
import { setDeletingWebhook } from "src/store/actions";

export function WebhookPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const deletingWebhook = useTypedSelector(
    (state) => state.webhook.deletingWebhook
  );
  const editingWebhook = useTypedSelector(
    (state) => state.webhook.editingWebhook
  );

  return (
    <PageContent
      title="Webhooks"
      subtitle="Subscribe to events in your organization."
    >
      <WebhookTable />
      <Modal
        trigger={<Button variant="r4-primary" text="Create new webhook" />}
        open={open}
        setOpen={setOpen}
        title="Create new webhook"
        subtitle="Define a new webhook for Keywords AI to send the request log data to."
      >
        <CreateWebhookForm
          handleClose={(e: any) => {
            setOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={Boolean(deletingWebhook)}
        setOpen={() => {
          dispatch(setDeletingWebhook(null));
        }}
        title="Delete Webhook"
        subtitle={`Are you sure you want to delete the webhook "${deletingWebhook?.name}"?`}
      >
        <DeleteWebhookForm
          handleClose={(e: any) => {
            dispatch(setDeletingWebhook(null));
          }}
        />
      </Modal>
    </PageContent>
  );
}
