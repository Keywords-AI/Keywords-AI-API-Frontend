import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { Close } from "../Icons";

/**
 * Renders a modal dialog using Radix UI's Dialog component.
 * @example
 *
 * <Modal
 *   trigger={
 *     <Button
 *       variant={"small"}
 *       text={"Compare different models"}
 *       icon={Compare}
 *     />
 *   }
 *   title="Modal Title"
 *   subtitle="Modal Subtitle"
 * >
 *   <p>Model content</p>
 *   <TextInput name="field1" placeholder="Enter a message..." />
 * </Modal>
 * 
 * @param {Object} props - The properties passed to the Modal component.
 * @param {React.ReactNode} props.trigger - The element that triggers the modal.
 *     Typically, this should be a React element like a button that the user can interact with to open the modal.
 * @param {string} props.title - The title text of the modal. This will be displayed prominently at the top of the modal.
 * @param {string} props.subtitle - A subtitle or descriptive text shown below the title in the modal.
 * @param {React.ReactNode} props.children - The content of the modal. This can be any JSX elements or components that
 *     you want to render inside the modal, forming the main body content.
 *
 * The Modal component uses a state `open` to track whether the modal is open or closed. `Dialog.Root` from Radix UI
 * manages this state internally. `Dialog.Trigger` is used as a wrapper for the `trigger` prop, and `Dialog.Content`
 * contains the actual content of the modal, including the title, subtitle, and *children.
 *
 */
export function Modal({ trigger, title, subtitle, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col w-[600px] p-lg justify-center items-center gap-md rounded-md border border-solid border-gray-3 bg-gray-2 shadow-window">
          <div className="flex-col items-start gap-xs self-stretch">
            <Dialog.Title className="flex self-stretch justify-between items-center">
              <p className="display-xs text-gray-white">{title}</p>
              <Dialog.Close asChild>
                <button>
                  <Close />
                </button>
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="text-sm-regular text-gray-4">{subtitle}</p>
            </Dialog.Description>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
