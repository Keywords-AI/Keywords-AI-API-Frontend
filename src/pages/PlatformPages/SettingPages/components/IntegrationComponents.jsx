import React, { useEffect, useState } from "react";
import { Button, IconButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { Delete } from "src/components/Icons";
import useForwardRef from "src/hooks/useForwardRef";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { VendorCard } from "src/components/Cards";
import { Modal } from "src/components/Dialogs";
import { createOrUpdateIntegration } from "src/store/actions";
import { OpenAI, Anthropic, Labs, Google, Cohere } from 'src/components/Icons';

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  createOrUpdateIntegration
};

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

export const CheckBoxButton = React.forwardRef(({
  name,
  register = () => { },
  validationSchema,
  text,
  onChange = () => { },
  checked = false
},
  ref) => {
  const checkBoxRef = useForwardRef(ref);
  const [isChecked, setIsChecked] = React.useState(checked);
  const handelChange = (e) => {
    onChange(e);
    setIsChecked(e.target.checked);
  }
  const handleClick = () => {
    checkBoxRef.current.click();
  };
  return (
    <Button type={"button"} variant={"r4-black"} active={isChecked} onClick={handleClick}>
      <span>{text}</span>
      <input
        {...register(name, validationSchema)}
        name={name}
        ref={checkBoxRef}
        type={"checkbox"}
        value={text}
        hidden
        checked={isChecked}
        onChange={handelChange} />
    </Button>
  );
})

const IntegrationCardNotConnected = ({
  user,
  apiKey,
  vendorId,
  companyName,
  activatedModels,
  availableModels,
  createOrUpdateIntegration,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiKeyString, setApiKeyString] = useState(apiKey);
  const onSubmit = (data) => {
    createOrUpdateIntegration({ ...data, vendor: vendorId, user: user.id });
  };
  const onChange = (e) => {
    setApiKeyString(e.target.value);
  };
  return (
    <>
      <form className="flex-col self-stretch gap-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="flex flex-col items-start self-stretch gap-xxs">
          <span className="text-sm-regular text-gray-4">Available models</span>
          <div className="flex flex-wrap self-stretch gap-xs">
            {availableModels.map((model, index) => (
              <CheckBoxButton
                {...register("activated_models")}
                key={index}
                text={model}
                checked={activatedModels.includes(model)}
              />
            ))}
          </div>
        </fieldset>
        <TextInput
          {...register("api_key", { value: apiKeyString, onChange })}
          title={apiKey ? "API key added" : `Your ${companyName} API key (optional)`}
          width={"w-full"}
          disabled={apiKey}
          placeholder={`Paste your ${companyName} API key here`}
          action={
            <IconButton
              type="button"
              variant="r4-white"
              icon={Delete}
              onClick={() => { setApiKeyString(""); console.log("delete key")}}
            />
          }
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

export const IntegrationModal = ({ vendor }) => {
  const [open, setOpen] = React.useState(false);
  const activatedModels = vendor.integration?.activated_models || [];
  const availableModels = vendor.available_models || [];
  const propsObj = {
    vendorId: vendor.id,
    companyName: vendor.name,
    companyLogo: vendors[vendor.name] && vendors[vendor.name].companyLogo,
    modelCount: `${activatedModels.length}/${availableModels.length}`,
    activatedModels,
    availableModels,
    integration: vendor.integration,
    apiKey: vendor.integration?.api_key || "",
  };
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={<TitleCard
        {...propsObj}
      />}
      subtitle="We'll get back to you within 24 hours."
      trigger={<VendorCard
        setOpen={setOpen}
        {...propsObj}
      />}
    >
      <IntegrationCard
        {...propsObj}
      />
    </Modal>
  )
};