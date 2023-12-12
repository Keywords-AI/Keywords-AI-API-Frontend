import { useNavigate } from "react-router-dom";

import React from "react";
import { BackButton } from "src/components/Buttons";
import { Button } from "@radix-ui/react-toolbar";

export function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" />
      <div className="flex-col w-full  max-w-[420px] items-center gap-md ">
        <div
          aria-label="section title"
          className="flex-col items-center gap-xxs self-stretch "
        >
          <div className="display-xs text-gray-white">
            Get Started with a Plan
          </div>
          <div className="text-md-regular text-gray-4">
            You have not purchased access to API keys.
          </div>
        </div>
        <div className="flex justify-center items-center gap-md self-stretch">
          <Button
            text="View pricing plans"
            variant={"secondary"}
            borderRadius="rounded-sm"
            onClick={() => {
              navigate("/pricing");
            }}
          />
        </div>
      </div>
    </div>
  );
}
