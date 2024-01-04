import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button, DropDownMenu } from "src/components";
import { CodeViewer } from "src/components/CodeViewer";
import React from "react";

import { Modal } from "src/components/Dialogs";
import { DotsButton } from "src/components/Buttons";
import { useNavigate } from "react-router-dom";

const ViewCode = React.forwardRef((props, ref) => {
  return (
    <Modal
      ref={ref}
      trigger={<Button variant="panel" text="View code" />}
      title="View code"
      subtitle="You can use the following code to start integrating your current prompt and settings into your application."
      width="w-[864px]"
    >
      <CodeViewer />
      <p className="text-sm-regular text-gray-4">
        Your API key can be found{" "}
        <a href="www.google.com" className="text-primary">
          here
        </a>
        . You should use environment variables or a secret management tool to
        expose your key to your applications.
      </p>
    </Modal>
  );
});
export function DotsMenu({}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <DropDownMenu
      width={"w-full"}
      align="end"
      sideOffset={8}
      open={open}
      setOpen={setOpen}
      trigger={<DotsButton onClick={() => setOpen(true)} />}
      items={
        <>
          <DropdownMenuItem asChild>
            <ViewCode />
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Button variant="panel" text="Save preset" />
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild>
            <Button
              variant="panel"
              text="Clear session"
              textColor="text-error"
              onClick={() => {
                navigate(0);
              }}
            />
          </DropdownMenuItem>
        </>
      }
    />
  );
}
