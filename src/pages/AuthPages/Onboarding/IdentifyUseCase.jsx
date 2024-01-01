import React, { useState, useEffect } from "react";
import { TextInput, SelectInput, CheckboxInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import { updateOrganization } from "src/store/actions";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { dispatchNotification } from "src/store/actions";

/*
@params register: the register function from react-hook-form
*/
const mapStateToProps = (state) => ({ organization: state.organization });
const mapDispatchToProps = {
  updateOrganization,
  dispatchNotification
};

export const IdentifyUseCase = connect(mapStateToProps, mapDispatchToProps)(({
  stepNumber,
  buttonAction = () => { },
  updateOrganization,
  dispatchNotification
}) => {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    if (e.target.value === "Other") {
      setIsOtherChecked(e.target.checked);
    }
  };
  const { register, handleSubmit, watch } = useForm();
  const controlSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  }
  const onSubmit = (data) => {
    if (typeof data.product_use_cases === "boolean") {
      data.product_use_cases = null;
      // Deliberately set to null, this will trigger serializer error
      // and will be handled by the backend
      dispatchNotification({
        type: "error",
        title: "Please select at least one use case"
      })
      return;
    } else if (typeof data.product_use_cases === "string") {
      data.product_use_cases = [data.product_use_cases];
    }
    if (isOtherChecked) {
      data.product_use_cases.push(data.other_use_case);
    }
    updateOrganization(data, buttonAction);
  };
  return (
    // <div className="relative">
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Identify use case"
      subtitle="Select all LLM use cases that apply."
      fields={
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <CheckboxInput
            text="Conversational AI"
            {...register("product_use_cases")}
            value="Conversational AI"
          />
          <CheckboxInput
            text="Summarization"
            {...register("product_use_cases")}
            value="Summarization"
          />
          <CheckboxInput
            text="Coding"
            {...register("product_use_cases")}
            value="Coding"
          />
          <CheckboxInput
            text="Content generation"
            {...register("product_use_cases")}
            value="Content generation"
          />
          <CheckboxInput
            text="Analytical reasoning"
            {...register("product_use_cases")}
            value="Analytical reasoning"
          />
          <CheckboxInput
            text="AI agents"
            {...register("product_use_cases")}
            value="AI agents"
          />
          <CheckboxInput
            text="Data processing"
            {...register("product_use_cases")}
            value="Data processing"
          />
          <CheckboxInput
            text="Other"
            value="Other"
            onChange={handleCheckboxChange}
          />
          {isOtherChecked && <TextInput
            placeholder="Please specify"
            required={isOtherChecked}
            {...register("other_use_case")}
          />}
        </div>
      }
      buttonText="Continue"
      buttonAction={controlSubmit}
    />

    // </div>
  );
})
