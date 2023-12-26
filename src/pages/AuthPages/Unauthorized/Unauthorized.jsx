import { useNavigate } from "react-router-dom";

import React from "react";
import { Button, BackButton } from "src/components/Buttons";
import { Right } from "src/components";
import { AuthenticationTitle } from "src/components/Titles";

export function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-center gap-xxxl self-stretch">
      <div className="flex-col items-start gap-[10px] self-stretch">
        <BackButton text="Home" link="/"/>
      </div>
      <div className="flex flex-col w-full max-w-[420px] items-center gap-[20px] justify-center">
        <AuthenticationTitle title="Get started with a plan" subtitle="You have not purchased access to API keys." align="items-center"/>
        <Button variant="r4-white" text="View pricing plans" className="min-w-[60px] items-center justify-center gap-xxs" onClick={() => {navigate("/pricing");}}/>
      </div>
    </div>
  );
}
