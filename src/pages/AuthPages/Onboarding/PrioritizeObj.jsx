import React, { useState, useEffect } from "react";
import { TextInput, SelectInput, CheckboxInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import StepsBar from "src/components/Misc/StepsBar";
import { BackButton } from "src/components/Buttons";

/*
@params register: the register function from react-hook-form
*/
export function PrioritizeObj({ stepNumber, register = () => { }, buttonAction = () => { } }) {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    if (e.target.value === "Other") {
      setIsOtherChecked(e.target.checked);
    }
  };
  return (
    <OnboardingFieldSet
      stepNumber={stepNumber}
      title="Prioritize objectives"
      subtitle="Select all LLM use cases that apply."
      fields={
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <CheckboxInput
            text="Eliminate downtime"
            {...register("Objective")}
            value="Eliminate downtime"
          />
          <CheckboxInput
            text="Enhance output quality"
            {...register("Objective")}
            value="Enhance output quality"
          />
          <CheckboxInput
            text="Reduce costs"
            {...register("Objective")}
            value="Reduce costs"
          />
          <CheckboxInput
            text="Improve speed performance"
            {...register("Objective")}
            value="Improve speed performance"
          />
          <CheckboxInput
            text="Bypass rate limits "
            {...register("Objective")}
            value="Bypass rate limits "
          />
          <CheckboxInput
            text="Explore model diversity"
            {...register("Objective")}
            value="Explore model diversity"
          />
          <CheckboxInput
            text="Monitor LLM applications"
            {...register("Objective")}
            value="Monitor LLM applications"
          />
          <CheckboxInput
            text="Other"
            {...register("Objective")}
            value="Other"
            onChange={handleCheckboxChange}
          />
          {isOtherChecked && <TextInput
            placeholder="Please specify"
            required={isOtherChecked}
          // {...register("Objective")}  there's a bug here
          />}
        </div>
      }
      buttonText="Continue"
      buttonAction={buttonAction}
    />
    // </div>
  );
}
