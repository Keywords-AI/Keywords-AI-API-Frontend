import React from "react";
import { DropDownMenu } from "src/components";
import { Button, IconButton } from "src/components/Buttons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { set } from "react-hook-form";
import { Dots } from "src/components/Icons";



export const APIKeyActions = ({ setEditingKey, setDeletingKey, modifyingKey }) => {
    const [open, setOpen] = React.useState(false);
    const actionButtons = [
        {
            action: setEditingKey,
            text: "Edit",
            minWidth: "w-full",
        },
        {
            action: setDeletingKey,
            text: "Revoke key",
            textColor: "text-error",
        },

    ]
    return (
        <DropDownMenu
            side="right"
            sideOffset={0}
            align="start"
            trigger={
                <Button
                    variant="icon"
                    icon={Dots}
                    onClick={() => setOpen(true)}
                />
            }
            width="w"
            open={open}
            setOpen={setOpen}
            items={
                <React.Fragment>
                    {actionButtons.map((option) => (
                        <DropdownMenuPrimitive.Item key={modifyingKey.id} asChild>
                            <Button
                                variant="panel"
                                minWidth={option.minWidth || "w"}
                                text={option.text}
                                textColor={option.textColor}
                                onClick={() => option.action(modifyingKey)}
                                iconPosition="left"
                            />
                        </DropdownMenuPrimitive.Item>
                    ))}
                </React.Fragment>
            }
        />
    )
}