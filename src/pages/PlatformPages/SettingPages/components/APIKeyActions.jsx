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
            action: () => { setEditingKey(modifyingKey)},
            text: "Edit",
            minWidth: "w-full",
        },
        {
            action: () => { setDeletingKey(modifyingKey)},
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
                    bgColor="bg-gray-black"
                    bgHoverColor="bg-gray-2"
                    borderColor="border-transparent"
                    borderHoverColor="border-transparent"
                    icon={Dots}
                    onClick={() => setOpen(true)}
                />
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
                                    option.action()
                                }}
                                iconPosition="left"
                            />
                        </DropdownMenuPrimitive.Item>
                    ))}
                </React.Fragment>
            }
        />
    )
}