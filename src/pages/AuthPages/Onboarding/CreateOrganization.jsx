import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";
import { OnboardingFieldSet } from "./components";



export function CreateOrganization({ show = false }) {

  return (
    <OnboardingFieldSet
      show={show}
      title="Create organization"
      subtitle="raymond@keywordsai.co is inviting you to join their organization. " //to add user email
      fields={
        <>
          <TextInput
            title="Organization name"
            placeholder="Enter your organization name"
          />
          <SelectInput
            title="Organization size"
            width="w-full"
            placeholder="Please select"
            choices={[
              { name: "1-10", value: "1-10" },
              { name: "11-50", value: "11-50" },
              { name: "51-200", value: "51-200" },
              { name: "200+", value: "200+" },
            ]}
            optionsWidth="w-[420px]"
          />
        </>
      }
      buttonText="Create organization"
      buttonAction={() => { }}
    />
  );
}
