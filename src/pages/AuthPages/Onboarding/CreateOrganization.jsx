import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { AuthenticationTitle } from "src/components/Titles";
import { useDispatch } from "react-redux";
import { logout } from "src/store/actions";

import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";

export function CreateOrganization() {
  const dispatch = useDispatch(); // Get the dispatch function

  const handleBackButtonClick = () => {
    dispatch(logout()); // Dispatch the logout action
    console.log("User logged out");
    window.location.href = "https://keywordsai.co";
  };

  return (
    <div className="flex flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <BackButton text="Log out" onClick={handleBackButtonClick} />
      </div>
      <div className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center">
        <AuthenticationTitle
          title="Create organization"
          subtitle="raymond@keywordsai.co is inviting you to join their organization. " //to add user email
        />
        <div className="flex flex-col items-center justify-center gap-md self-stretch">
          <div className="flex flex-col justify-start gap-sm self-stretch ">
            <TextInput
              title="Organization name"
              placeholder="Enter your organization name"
            />
            <SelectInput
              title="Organization size"
              width="w-full"
              placeholder="Please select"
              choices={[
                { name: "1-10", value: "1-10" },
                { name: "11-50", value: "11-50" },
                { name: "51-200", value: "51-200" },
                { name: "200+", value: "200+" },
              ]}
              optionsWidth="w-[420px]"
            />
          </div>
          <Button
            variant="r4-primary"
            text="Create organization"
            className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
          />
        </div>
      </div>
    </div>
  );
}
