import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { AuthenticationTitle } from "src/components/Titles";
import { useDispatch } from "react-redux";
import { logout } from "src/store/actions";

import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";

export function InviteTeam() {
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
          title="Invite team"
          subtitle="Add members to your organization."
        />
        <div className="flex flex-col items-center justify-center gap-md self-stretch">
          <div className="flex flex-col justify-start gap-sm self-stretch ">
            <TextInput
              title="Email"
              placeholder="email@example.com, email2@example.com..."
            />
            <SelectInput
              title="Role"
              width="w-full"
              placeholder={<span>Member <span className="text-gray-4/40">- full access with limited permissions</span></span>}
              choices={[
                { name: <span>Member <span className="text-gray-4/40 text-sm-regular">- full access with limited permissions</span></span>, value: "member" },
                { name: <span>Admin <span className="text-gray-4/40 text-sm-regular">- full adminstrative access</span></span>, value: "admin" },
              ]}
              optionsWidth="w-[420px]"
            />
          </div>
          <Button
            variant="r4-primary"
            text="Continue"
            className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
          />
        </div>
      </div>
    </div>
  );
}
