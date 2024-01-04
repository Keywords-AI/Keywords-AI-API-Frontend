import { OnboardingFieldSet } from "./components";
import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { updateOrganization, dispatchNotification } from "src/store/actions";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ organization: state.organization });
const mapDispatchToProps = { updateOrganization, dispatchNotification };

export const OptimizeCosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  stepNumber,
  buttonAction = () => { },
  updateOrganization,
  dispatchNotification
}) => {
  const { register, handleSubmit, watch } = useForm();
  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };
  const onSubmit = (data) => {
    updateOrganization(data, buttonAction);
  };
  return (
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Optimize costs"
      subtitle="Set your target budget for LLM usage." //to add user email
      fields={
        <>
          <SelectInput
            {...register("monthly_spending`")}
            title="Monthly LLM spending"
            width="w-full"
            placeholder="Please select"
            choices={[
              { name: "$10-100", value: 10 },
              { name: "$100-500", value: 100 },
              { name: "$500-1000", value: 500 },
              { name: "$1000+", value: 1000 },
            ]}
            optionsWidth="w-[420px]"
          />
          <TextInput
            {...register("budget_goal")}
            title="Spending budget goal"
            placeholder="$"
            type="number"
          />
        </>
      }
      buttonText="Continue"
      buttonAction={handleClick}
    />
  );
})
