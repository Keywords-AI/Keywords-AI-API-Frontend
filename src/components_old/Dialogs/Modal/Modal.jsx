import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { IconButton } from "src/components/Buttons";
import { Cross } from "src/components/Icons";
import cn from "src/utilities/classMerge";

export const Modal = React.forwardRef(
  ({ trigger, title, subtitle, children, open, setOpen, width }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.6)]" />
          <Dialog.Content
            ref={ref}
            className={cn(
              "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col p-lg justify-center items-center gap-md rounded-md bg-gray-2 shadow-modal shadow-window",
              width || "w-[600px]"
            )}
          >
            <div className="flex-col items-start gap-xs self-stretch">
              <Dialog.Title className="flex self-stretch justify-between items-center">
                <div className="display-xs text-gray-white">{title}</div>
                <Dialog.Close asChild>
                  <IconButton icon={Cross} />
                </Dialog.Close>
              </Dialog.Title>
              <Dialog.Description asChild>
                {subtitle && (
                  <p className="text-sm-regular text-gray-4">{subtitle}</p>
                )}
              </Dialog.Description>
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);
