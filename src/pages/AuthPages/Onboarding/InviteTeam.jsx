import { logout, sendInvitation } from "src/store/actions";
import { OnboardingFieldSet } from "./components";
import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export function InviteTeam({
  show = false,
  buttonAction = () => {},
  stepNumber,
}) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const onSubmit = (data) => {
    const emails = data.email.split(",").map((email) => email.trim());
    emails.forEach((email) => {
      dispatch(
        sendInvitation({
          email: email,
          role: data.role,
          organization: organization?.id,
        })
      );
    });
  };
  return (
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Invite team"
      handleSubmit={handleSubmit(onSubmit)}
      subtitle="Add members to your organization."
      fields={
        <>
          <TextInput
            {...register("email", {
              pattern: {
                value: /^\s*\S+@\S+\.\S+(?:\s*,\s*\S+@\S+\.\S+)*\s*$/,
                message: "Please enter a list of comma separated emails.",
              },
            })}
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
