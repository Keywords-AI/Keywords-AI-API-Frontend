import React, { useEffect, useState } from "react";
import { Delete } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { DeleteInput } from "src/components/Inputs";
import useForwardRef from "src/hooks/useForwardRef";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { VendorCard } from "src/components/Cards";
import { Modal } from "src/components/Dialogs";
import { OpenAI, Anthropic, Labs, Google, Cohere } from 'src/components/Icons';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export const vendors = {
  "OpenAI": {
    models: [
      { name: "gpt-3.5-turbo" },
      { name: "gpt-3.5-turbo-16k" },
      { name: "gpt-4" },
      { name: "gpt-4-32k" },
      { name: "gpt-4-1106-preview" },

    ],
    companyLogo: <OpenAI />,
  },
  "Anthropic": {
    models: [
      { name: "claude-instant-1" },
      { name: "claude-instant-1.2" },
      { name: "claude-2.1" },
      { name: "claude-2" },
    ],
    companyLogo: <Anthropic />,
  },
  "AI21 Labs": {
    models: [
      { name: "j2-light" },
      { name: "j2-mid" },
      { name: "j2-ultra" },
    ],
    companyLogo: <Labs />,
  },
  "Cohere": {
    models: [
      { name: "command-nightly" },
    ],
    companyLogo: <Cohere />,
  },
  "Google": {
    models: [
      { name: "chat-bison" },
    ],
    companyLogo: <Google />,
  },
}

export const CheckBoxButton = React.forwardRef(({ name, register = () => { }, validationSchema, text, onChange = () => { } }, ref) => {
  const checkBoxRef = useForwardRef(ref);
  const [checked, setChecked] = React.useState(false);
  const handelChange = (e) => {
    onChange(e);
    setChecked(e.target.checked);
  }
  const handleClick = () => {
    checkBoxRef.current.click();
  };
  return (
    <Button type={"button"} variant={"r4-black"} active={checked} onClick={handleClick}>
      <span>{text}</span>
      <input
        {...register(name, validationSchema)}
        name={name}
        ref={checkBoxRef}
        type={"checkbox"}
        value={text}
        hidden
        onChange={handelChange} />
    </Button>
  );
})

const IntegrationCardNotConnected = ({
  companyName,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form className="flex-col self-stretch gap-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="flex flex-col items-start self-stretch gap-xxs">
          <span className="text-sm-regular text-gray-4">Available models</span>
          <div className="flex flex-wrap self-stretch gap-xs">
            {vendors.companyName && vendors.companyName.models.map((model, index) => (
              <CheckBoxButton
                {...register("models")}
                key={index}
                text={model.name}
              />
            ))}
          </div>
        </fieldset>
        <DeleteInput
          title={`Your ${companyName} API key (optional)`}
          width={"w-full"}
          placeholder={`Paste your ${companyName} API key here`}
        />
        <div className="flex justify-end items-center gap-xs self-stretch">
          <Button variant="r4-gray-2" text="Cancel" />
          <Button variant="r4-primary" text="Save" />
        </div>
      </form>
    </>
  );
};

export const IntegrationCard = connect(mapStateToProps, mapDispatchToProps)(IntegrationCardNotConnected);

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

export const IntegrationModal = ({ companyName }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={<TitleCard
        companyName={companyName}
        modelCount="3/5 "
        companyLogo={vendors[companyName] && vendors[companyName].companyLogo}
      />}
      subtitle="We'll get back to you within 24 hours."
      trigger={<VendorCard
        setOpen={setOpen}
        companyName={companyName}
        modelCount="3/5 "
        companyLogo={vendors[companyName] && vendors[companyName].companyLogo}
      />}
    >
      <IntegrationCard
        companyName={companyName}
        companyLogo={vendors[companyName] && vendors[companyName].companyLogo}
        modelCount="3/5"
      />
    </Modal>
  )
};