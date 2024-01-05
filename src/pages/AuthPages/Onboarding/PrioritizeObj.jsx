import React, { useState, useEffect } from "react";
import { TextInput, SelectInput, CheckboxInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import { updateOrganization, dispatchNotification } from "src/store/actions";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

/*
@params register: the register function from react-hook-form
*/
const mapStateToProps = (state) => ({ organization: state.organization });
const mapDispatchToProps = { updateOrganization, dispatchNotification };
export const PrioritizeObj = connect(mapStateToProps, mapDispatchToProps)(({
  stepNumber,
  buttonAction = () => { },
  updateOrganization
}) => {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    if (e.target.value === "Other") {
      setIsOtherChecked(e.target.checked);
    }
  };
  const { register, handleSubmit, watch } = useForm();
  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };
  const onSubmit = (data) => {
    if (typeof data.prioritize_objectives === "boolean") {
      dispatchNotification({
        type: "error",
        title: "Please select at least one use case"
      })
      return;
    } else if (typeof data.prioritize_objectives === "string") {
      data.prioritize_objectives = [data.prioritize_objectives];
    }
    if (isOtherChecked) {
      data.prioritize_objectives.push(data.prioritize_objectives);
    }
    updateOrganization(data, buttonAction);
  }
  return (
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Prioritize objectives"
      subtitle="Select all LLM use cases that apply."
      fields={
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <CheckboxInput
            text="Eliminate downtime"
            {...register("prioritize_objectives")}
            value="Eliminate downtime"
          />
          <CheckboxInput
            text="Enhance output quality"
            {...register("prioritize_objectives")}
            value="Enhance output quality"
          />
          <CheckboxInput
            text="Reduce costs"
            {...register("prioritize_objectives")}
            value="Reduce costs"
          />
          <CheckboxInput
            text="Improve speed performance"
            {...register("prioritize_objectives")}
            value="Improve speed performance"
          />
          <CheckboxInput
            text="Bypass rate limits "
            {...register("prioritize_objectives")}
            value="Bypass rate limits "
          />
          <CheckboxInput
            text="Explore model diversity"
            {...register("prioritize_objectives")}
            value="Explore model diversity"
          />
          <CheckboxInput
            text="Monitor LLM applications"
            {...register("prioritize_objectives")}
            value="Monitor LLM applications"
          />
          <CheckboxInput
            text="Other"
            value="Other"
            onChange={handleCheckboxChange}
          />
          {isOtherChecked && <TextInput
            placeholder="Please specify"
            {...register("other_objective")}
          />}
        </div>
      }
      buttonText="Continue"
      buttonAction={handleClick}
    />
    // </div>
  );
})
