import { OnboardingFieldSet } from "./components";
import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";

export function OptimizeCosts({ show = false, register=()=>{}, buttonAction=()=>{} }) {

  return (
    <OnboardingFieldSet
    show={show}
    title="Optimize costs"
    subtitle="Set your target budget for LLM usage." //to add user email
    fields={
      <>
          <SelectInput
            {...register("LLM_spending`")}
            title="Monthly LLM spending"
            width="w-full"
            placeholder="Please select"
            choices={[
              { name: "$10-100", value: "$10-100" },
              { name: "$100-500", value: "$100-500" },
              { name: "$500-1000", value: "$500-1000" },
              { name: "$1000+", value: "$1000+" },
            ]}
            optionsWidth="w-[420px]"
            required
          />
        <TextInput
          {...register("spending_budget_goal")}
          title="Spending budget goal"
          placeholder="$200"
          required
        />
      </>
    }
    buttonText="Get started"
    buttonAction={buttonAction}
  />
  );
}
