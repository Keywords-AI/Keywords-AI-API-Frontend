import React from "react";
import { Button, Delete } from "src/components/Icons";
import { TextInput } from "src/components/Inputs";

export const IntegrationCard = ({
  company_name,
  model_count,
  company_logo,
}) => {
  return (
    <div className="flex-col w-[600px] p-lg justify-start items-start gap-md rounded-md border bg-gray-2 border-solid shadow-window">
      <div className="flex flex-row items-center gap-xs self-stretch">
        <div className="flex p-xxs items-center w-[40px] h-[40px] rounded-sm bg-gray-white">
          {company_logo}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-left text-md-medium ">{company_name}</span>
          <span className="text-sm-regular text-gray-4 text-center">
            {model_count} models activated
          </span>
        </div>
      </div>
      <div className="flex flex-column items-start self-stretch gap-xxs">
        <span className="text-sm-regular text-gray-4">Available models</span>
        <div className="flex flex-wrap self-stretch py-xxs px-xs">
          <Button variant="r4-black" text="gpt-3.5-turbo" />
          <Button variant="r4-black" text="gpt-3.5-turbo-16k" />
          <Button variant="r4-black" text="gpt-4" />
          <Button variant="r4-black" text="gpt-4-32k" />
          <Button variant="r4-black" text="gpt-4-1106-preview" />
        </div>
      </div>
      <TextInput
        title={"Your OpenAI API key (optional)"}
        width={"w-full"}
        placeholder={"sk-"}
        icon={<Delete />}
      />
      <div className="flex justify-end items-center gap-xs self-stretch">
        <Button variant="r4-gray2" text="Cancel" />
        <Button variant="r4-primary" text="Save" />
      </div>
    </div>
  );
};
