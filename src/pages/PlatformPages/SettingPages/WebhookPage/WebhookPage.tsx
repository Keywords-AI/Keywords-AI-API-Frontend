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
import { TitleStaticSubheading } from "src/components/Titles";

export function WebhookPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useTypedDispatch();
  const deletingWebhook = useTypedSelector(
    (state) => state.webhook.deletingWebhook
  );
  const editingWebhook = useTypedSelector(
    (state) => state.webhook.editingWebhook
  );
  const webhooks = useTypedSelector((state) => state.webhook.webhooks);

  return (
    <PageContent
      title="Webhooks"
      subtitle="Subscribe to events in your organization."
    >
      <div className="flex-col gap-sm items-start max-w-[800px] w-full">
        <TitleStaticSubheading
          title={"Manage webhooks"}
          subtitle={
            <span>
              Read the{" "}
              <a
                className="text-primary cursor-pointer"
                href="https://docs.keywordsai.co/"
              >
                documentation
              </a>{" "}
              on using webhooks.
            </span>
          }
        />
        {webhooks.length !==0 && <WebhookTable />}
        <Modal
          trigger={<Button variant="r4-primary" text="Create new webhook" />}
          open={open}
          setOpen={setOpen}
          title="Create Webhook"
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
      </div>
    </PageContent>
  );
}