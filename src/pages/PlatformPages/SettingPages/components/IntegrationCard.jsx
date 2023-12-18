import React from "react";
import { Delete } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { DeleteInput } from "src/components/Inputs";

const modelsChoice = {
  "OpenAI": [
    {
      name: "gpt-3.5-turbo",
      description: "GPT-3.5 Turbo (1.3B)",
      price: "0.0000000001",
      priceUnit: "credits/word",
      priceDescription: "1 credit = 1 word",
    },

  ]
}

export const ModelChoices = ({ companyName }) => {
  return (
    <div className="flex flex-column items-start self-stretch gap-xxs">
      <span className="text-sm-regular text-gray-4">Available models</span>
      <div className="flex flex-wrap self-stretch py-xxs px-xs">
        {modelsChoice[companyName].map((model, index) => (
          <Button key={index} variant={"r4-black"}>
            <span>{model.name}</span>
            <input type={"checkbox"} value={model.name} hidden />
          </Button>
        ))}
      </div>
    </div>
  )
}

export const IntegrationCard = ({
  companyName,
  modelCount,
  companyLogo,
}) => {
  return (
    <>
      <form className="flex-col self-stretch gap-sm">
        <ModelChoices companyName={companyName} />
        <DeleteInput
          title={"Your OpenAI API key (optional)"}
          width={"w-full"}
          placeholder={"sk-"}
        />
        <div className="flex justify-end items-center gap-xs self-stretch">
          <Button variant="r4-gray2" text="Cancel" />
          <Button variant="r4-primary" text="Save" />
        </div>
      </form>
    </>
  );
};

export const TitleCard = ({ companyLogo, companyName, modelCount }) => {
  return (
    <div className="flex flex-row items-center gap-xs self-stretch">
      <div className="flex p-xxs items-center w-[40px] h-[40px] rounded-sm bg-gray-white">
        {companyLogo}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-left text-md-medium ">{companyName}</span>
        <span className="text-sm-regular text-gray-4 text-center">
          {modelCount} models activated
        </span>
      </div>
    </div>
  )
}