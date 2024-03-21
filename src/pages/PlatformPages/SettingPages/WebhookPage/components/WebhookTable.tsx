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


  useEffect(() => {
    setProcessedWebhooks(processWebhooks(webhooks, renderActions, renderWebhook));
  }, [webhooks]);

  const renderWebhook = (webhookName: string, webhookUrl: string) => {
    return (
      <div className="flex-col items-start gap-xxxs">
        <span className="text-sm-md text-gray-5">{webhookName}</span>
        <span className="caption text-gray-4">{webhookUrl}</span>
      </div>
    );
  };
  const [processedWebhooks, setProcessedWebhooks] = useState(
    processWebhooks(webhooks, renderActions, renderWebhook)
  );
    console.log("processedWebhooks", processedWebhooks);
  return (
    <LineTable
      // rows={processedWebhooks}

      // headers={["Label", "URL", "Event Type", ""]}
      // columnNames={["name", "url", "event_type", "actions"]}

      // headerLayout="grid-cols-[120px,1fr,120px,56px]"
      // rowLayout="grid-cols-[120px,1fr,120px,56px]"
      rows={processedWebhooks}
      variant="webhooks"
      columnNames={["name", "event_type", "created", "actions"]}
    />
  );
}
