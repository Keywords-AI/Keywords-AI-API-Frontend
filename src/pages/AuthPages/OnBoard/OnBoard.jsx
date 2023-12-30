import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { AuthenticationTitle } from "src/components/Titles";

import React from "react";
import { Right } from "src/components";
import { TitleStaticHeading } from "src/components/Titles";
import { TextInput } from "src/components/Inputs";

export function OnBoard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-xxxl justify-center self-stretch">
        <div className="flex flex-col items-start self-stretch gap-[10px]">
            <BackButton text="Home"/>
        </div>
      <div className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center">
        <AuthenticationTitle title="Create organization" subtitle="raymond@keywordsai.co is inviting you to join their organization. "/>
        <div className="flex flex-col items-center justify-center gap-md self-stretch">
            <TextInput title="Organization name" width="w-full" placeholder="Enter your organization name"/>
            <Button variant="r4-white" text="Create organization" className="min-w-[60px] self-stretch items-center justify-center gap-xxs"/>
        </div>
        </div>
      </div>
  );
}
