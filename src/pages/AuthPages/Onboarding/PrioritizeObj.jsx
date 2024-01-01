import React, { useState } from "react";
import { TextInput, SelectInput, CheckboxInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import StepsBar from "src/components/Misc/StepsBar";
import { BackButton } from "src/components/Buttons";

/*
@params register: the register function from react-hook-form
*/
export function PrioritizeObj({ show = false, register = () => {}, buttonAction=()=>{}}) {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    if (e.target.value === "Other") {
      setIsOtherChecked(e.target.checked);
    }
  };

  return (
    // <div className="relative">

        <OnboardingFieldSet
          show={show}
          title="Prioritize objectives"
          subtitle="Select all LLM use cases that apply."
          fields={
            <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
              <CheckboxInput
                text="Eliminate downtime"
                {...register("objective")}
                value="Eliminate downtime"
              />
              <CheckboxInput
                text="Enhance output quality"
                {...register("objective")}
                value="Enhance output quality"
              />
              <CheckboxInput
                text="Reduce costs"
                {...register("objective")}
                value="Reduce costs"
              />
              <CheckboxInput
                text="Improve speed performance"
                {...register("objective")}
                value="Improve speed performance"
              />
              <CheckboxInput
                text="Bypass rate limits "
                {...register("objective")}
                value="Bypass rate limits "
              />
              <CheckboxInput
                text="Explore model diversity"
                {...register("objective")}
                value="Explore model diversity"
              />
              <CheckboxInput
                text="Monitor LLM applications"
                {...register("objective")}
                value="Monitor LLM applications"
              />
              <CheckboxInput
                text="Other"
                {...register("objective")}
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
