import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import { connect } from "react-redux";
import { createOrganization } from "src/store/actions";
import { useForm } from "react-hook-form";

/*
@params register: the register function from react-hook-form
*/
const mapStateToProps = (state) => ({ user: state.user, organization: state.organization });
const mapDispatchToProps = { createOrganization };
export const CreateOrganization = connect(mapStateToProps, mapDispatchToProps)(({
  stepNumber,
  buttonAction = () => { },
  user,
  organization,
  createOrganization
}) => {
  const { register, handleSubmit } = useForm();
  const [orgName, setOrgName] = React.useState(organization.name || "");
  const onSubmit = (data) => {
    createOrganization({
      ...data,
      user: user.id
    }, buttonAction);
  }
  useEffect(() => {
    if (organization.name) {
      setOrgName(organization.name);
    }
  }, [organization])
  return (
    <OnboardingFieldSet
      handleSubmit={handleSubmit(onSubmit)}
      stepNumber={stepNumber}
      title="Create organization"
      subtitle={`${user.email} is inviting you to join their organization`} //to add user email
      fields={
        <>
          <TextInput
            {...register("name")}
            title="Organization name"
            placeholder="Enter your organization name"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
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
            defaultValue={organization?.organization_size || 1}
            optionsWidth="w-[420px]"
            required
          />
        </>
      }
      buttonText="Continue"
    />
  );
})
