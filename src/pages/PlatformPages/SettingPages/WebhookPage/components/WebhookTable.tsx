import React, { useEffect, useState } from "react";
import { LineTable } from "src/components/Tables";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { processWebhooks } from "src/store/actions";
import { WebhookActions } from "./WebhookActions";

export function WebhookTable() {
  const webhooks = useTypedSelector((state) => state.webhook.webhooks);
  const renderActions = (webhook: any) => {

    return <WebhookActions webhook={webhook} />;
  };
  const [processedWebhooks, setProcessedWebhooks] = useState(processWebhooks(webhooks, renderActions));

  useEffect(() => {
    setProcessedWebhooks(processWebhooks(webhooks, renderActions));
  }, [webhooks]);

  return (
    <LineTable
      rows={processedWebhooks}
      headers={["Label", "URL", "Event Type", ""]}
      columnNames={["name", "url", "event_type", "actions"]}
      headerLayout="grid-cols-[120px,1fr,120px,56px]"
      rowLayout="grid-cols-[120px,1fr,120px,56px]"
    />
  );
}
