import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import React from "react";
import { Right } from "src/components/Icons/iconsDS";
import { TitleAuth } from "src/components/Titles";
export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-center gap-xxxl  self-stretch">
      <div className="flex-col items-start gap-xxs self-stretch">
        <BackButton text="Home" link={"/"} />
      </div>
      <div className="flex-col w-full max-w-[1000px] items-center gap-md ">
        {/* <TitleAuth title="404 - Not Found" subtitle={"Couldn’t find what you were looking for."} textAlign="text-center"/> */}
        <div className=" pl-xxl display-xl text-gray-5 text-center items-center">
          404.
          <span className="text-gray-4 text-center"> Not found.</span>
        </div>
        <div className="flex items-center justify-center gap-xs ">
          <Button
            text="Back to home"
            variant={"r18-white"}
            icon={Right}
            iconSize="xs"
            iconPosition="right"
            onClick={() => {
              navigate("/");
            }}
          />
          <Button
            text="Bug report"
            variant="header"
            iconSize="xs"
            icon={Right}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
}
