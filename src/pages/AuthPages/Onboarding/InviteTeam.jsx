
import { logout } from "src/store/actions";
import { OnboardingFieldSet } from "./components";
import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";

export function InviteTeam({
  show = false,
  register = () => {},
  buttonAction = () => {},
}) {
  return (
    <OnboardingFieldSet
      show={show}
      title="Invite team"
      subtitle="Add members to your organization."
      fields={
        <>
          <TextInput
            {...register("email")}
            title="Email"
            placeholder="email@example.com, email2@example.com..."
          />
          <SelectInput
            {...register("role")}
            title="Role"
            width="w-full"
            placeholder="Member"
            choices={[
              { name: "Owner", value: "Owner" },
              { name: "Admin", value: "admin" },
              { name: "Member", value: "member" },
            ]}
            optionsWidth="w-[420px]"
          />
        </>
      }
      buttonText="Continue"
      buttonAction={buttonAction}
    />
  );
}
