import { useNavigate } from "react-router-dom";
import { ArrowRight } from "src/components";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import React from "react";
export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" />
      <div className="flex-col w-full max-w-[420px] items-center gap-md ">
        <div
          aria-label="section title"
          className="flex-col items-center gap-xxs self-stretch "
        >
          <div className="display-lg text-gray-white">404 - Not Found</div>
          <div className="text-md-regular text-gray-4">
            Couldn’t find what you were looking for.
          </div>
        </div>
        <div className="flex justify-center items-start gap-md self-stretch">
          <Button
            text="Back to home"
            variant={"r4-white"}
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => {
              navigate("/");
            }}
          />
          <Button
            text="Bug report"
            variant="r4-black"
          />
        </div>
      </div>
    </div>
  );
}
