import React from "react";
import { DropDownMenu } from "src/components";
import { Button, IconButton } from "src/components/Buttons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Dots } from "src/components/Icons";
import { DotsButton } from "src/components/Buttons";

export const APIKeyActions = ({
  setEditingKey,
  setDeletingKey,
  modifyingKey,
}) => {
  const [open, setOpen] = React.useState(false);
  const actionButtons = [
    {
      action: () => {
        setEditingKey(modifyingKey);
      },
      text: "Edit key",
      minWidth: "w-full",
    },
    {
      action: () => {
        setDeletingKey(modifyingKey);
      },
      text: "Revoke key",
      textColor: "text-error",
    },
  ];
  return (
    <DropDownMenu
      side="bottom"
      sideOffset={4}
      align="end"
      alignOffset={0}
      trigger={
        // <Button
        //     variant="icon"
        //     icon={Dots}
        //     onClick={() => setOpen(true)}
        // />
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
