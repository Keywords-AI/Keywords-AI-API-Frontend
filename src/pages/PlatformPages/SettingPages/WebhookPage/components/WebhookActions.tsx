import React from "react";
import { DropDownMenu } from "src/components";
import { Button } from "src/components/Buttons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DotsButton } from "src/components/Buttons";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { setDeletingWebhook, setEditingWebhook } from "src/store/actions";

export const WebhookActions = ({
  webhook,
}: {
  webhook: any;
}) => {
  const [open, setOpen] = React.useState<boolean | undefined>(false);
  const dispatch = useTypedDispatch();

  const actionButtons = [
    // {
    //   action: setWebhook,
    //   text: "Edit webhook",
    //   minWidth: "w-full",
    // },
    {
      action: () => {
        dispatch(setDeletingWebhook(webhook));
      },
      text: "Delete webhook",
      textColor: "text-error",
    },
  ];
  return (
    <DropDownMenu
      side="bottom"
      sideOffset={4}
      alignOffset={0}
      align="end"
      trigger={
        <DotsButton onClick={() => setOpen(true)} active={open} />
      }
      width="min-w-0"
      open={open}
      setOpen={setOpen}
      items={
        <React.Fragment>
          {actionButtons.map((option, index) => (
            <DropdownMenuPrimitive.Item key={index} asChild>
              <Button
                variant="panel"
                type="button"
                text={option.text}
                textColor={option.textColor}
                onClick={() => {
                  option.action();
                }}
                iconPosition="left"
              />
            </DropdownMenuPrimitive.Item>
          ))}
        </React.Fragment>
      }
    />
  );
};