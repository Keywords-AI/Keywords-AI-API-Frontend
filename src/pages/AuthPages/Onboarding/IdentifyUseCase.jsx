import React, { useState } from "react";
import { TextInput, SelectInput, CheckboxInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";
import StepsBar from "src/components/Misc/StepsBar";
import { BackButton } from "src/components/Buttons";

/*
@params register: the register function from react-hook-form
*/
export function IdentifyUseCase({ show = false, register = () => {}, buttonAction=()=>{} }) {
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
          title="Identify use case"
          subtitle="Select all LLM use cases that apply."
          fields={
            <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
              <CheckboxInput
                text="Conversational AI"
                {...register("use_case")}
                value="Conversational AI"
              />
              <CheckboxInput
                text="Summarization"
                {...register("use_case")}
                value="Summarization"
              />
              <CheckboxInput
                text="Coding"
                {...register("use_case")}
                value="Coding"
              />
              <CheckboxInput
                text="Content generation"
                {...register("use_case")}
                value="Content generation"
              />
              <CheckboxInput
                text="Analytical reasoning"
                {...register("use_case")}
                value="Analytical reasoning"
              />
              <CheckboxInput
                text="AI agents"
                {...register("use_case")}
                value="AI agents"
              />
              <CheckboxInput
                text="Data processing"
                {...register("use_case")}
                value="Data processing"
              />
              <CheckboxInput
                text="Other"
                {...register("use_case")}
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
