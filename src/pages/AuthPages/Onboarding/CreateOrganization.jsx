import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import { connect } from "react-redux";
import { createOrganization, dispatchNotification } from "src/store/actions";

/*
@params register: the register function from react-hook-form
*/
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = { createOrganization };
export const CreateOrganization = connect(mapStateToProps, mapDispatchToProps)(({
  stepNumber,
  register = () => { },
  buttonAction = () => { },
  user,
  watch,
}) => {
  const handleClick = () => {
    const organization_name = watch("organization_name");
    const organization_size = watch("organization_size");
    createOrganization({ name: organization_name, organization_size });
    buttonAction();
  }
  return (
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Create organization"
      subtitle={`${user.email} is inviting you to join their organization`} //to add user email
      fields={
        <>
          <TextInput
            {...register("organization_name")}
            title="Organization name"
            placeholder="Enter your organization name"
            required
          />
          <SelectInput
            {...register("organization_size")}
            title="Organization size"
            width="w-full"
            placeholder="Please select"
            choices={[
              { name: "1-10", value: 1 },
              { name: "11-50", value: 11 },
              { name: "51-200", value: 51 },
              { name: "200+", value: 200 },
            ]}
            optionsWidth="w-[420px]"
            required
          />
        </>
      }
      buttonText="Continue"
      buttonAction={handleClick}
    />
  );
})
