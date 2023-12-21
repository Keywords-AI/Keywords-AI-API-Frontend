import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import cn from "src/utilities/classMerge";

export const DropDownMenu = ({
  trigger, // The trigger elements, the buttons
  items, // The items to be displayed in the dropdown
  open, // The state of the dropdown
  setOpen, // The function to change the state of the dropdown
  side = "bottom",
  sideOffset = 10,
  align = "center",
  alignOffset = 0,
  width,
  className,
}) => {
  return (
    <DropdownMenuPrimitive.Root
      modal={true}
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={cn(
            "flex-col items-start rounded-md p-xxxs bg-gray-2 border border-solid border-gray-3 ",
            width || "w-[240px]",
            className
          )}
          sideOffset={sideOffset}
          align={align}
          side={side}
          alignOffset={alignOffset}
        >
          {items}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
