import React, { useEffect, useState } from "react";
import { Button, IconButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { Delete, Ellipse } from "src/components/Icons";
import useForwardRef from "src/hooks/useForwardRef";
import { set, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { VendorCard } from "src/components/Cards";
import { Modal } from "src/components/Dialogs";
import { createOrUpdateIntegration, setIntegration } from "src/store/actions";
import { OpenAI, Anthropic, Labs, Google, Cohere } from "src/components/Icons";
import { dispatchNotification } from "src/store/actions";
import cn from "src/utilities/classMerge";

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  createOrUpdateIntegration,
  setIntegration,
  dispatchNotification,
};

export const vendors = {
  OpenAI: {
    models: [
      { name: "gpt-3.5-turbo" },
      { name: "gpt-3.5-turbo-16k" },
      { name: "gpt-4" },
      { name: "gpt-4-32k" },
      { name: "gpt-4-1106-preview" },
    ],
    companyLogo: <OpenAI />,
  },
  Anthropic: {
    models: [
      { name: "claude-instant-1" },
      { name: "claude-instant-1.2" },
      { name: "claude-2.1" },
      { name: "claude-2" },
    ],
    companyLogo: <Anthropic />,
  },
  "AI21 Labs": {
    models: [{ name: "j2-light" }, { name: "j2-mid" }, { name: "j2-ultra" }],
    companyLogo: <Labs />,
  },
  Cohere: {
    models: [{ name: "command-nightly" }],
    companyLogo: <Cohere />,
  },
  Google: {
    models: [{ name: "chat-bison" }],
    companyLogo: <Google />,
  },
};

export const CheckBoxButton = React.forwardRef(
  (
    {
      name,
      register = () => {},
      validationSchema,
      text,
      onChange = () => {},
      checked = false,
    },
    ref
  ) => {
    const checkBoxRef = useForwardRef(ref);
    const [isChecked, setIsChecked] = React.useState(checked);
    const handleChange = (e) => {
      onChange(e);
      setIsChecked(e.target.checked);
    };
    const handleClick = () => {
      checkBoxRef.current.click();
    };
    return (
      <Button
        type={"button"}
        variant={"r4-black"}
        active={isChecked}
        onClick={handleClick}
      >
        <span>{text}</span>
        <input
          {...register(name, validationSchema)}
          name={name}
          ref={checkBoxRef}
          type={"checkbox"}
          value={text}
          hidden
          checked={isChecked}
          onChange={handleChange}
        />
      </Button>
    );
  }
);

const IntegrationCardNotConnected = ({
  user,
  apiKey,
  vendorId,
  companyName,
  activatedModels,
  availableModels,
  setOpen,
  createOrUpdateIntegration,
  dispatchNotification,
  setActivatedModels,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const activatedModelsWatch = watch("activated_models");
  const [hasKey, setHasKey] = useState(apiKey ? true : false);
  const [apiKeyString, setApiKeyString] = useState(apiKey || "");
  const validateCheckbox = (value) => {
    if (typeof value === "string") {
      // To account for the case where only one model is selected
      return [value];
    } else if (typeof value === "boolean") {
      // To account for the case where no model is selected
      return [];
    }
    return value || [];
  };
  const onSubmit = (data) => {
    let toSubmit = { vendor: vendorId, user: user.id, ...data };
    toSubmit.activated_models = validateCheckbox(toSubmit.activated_models);
    dispatchNotification({
      title: "Integration updated",
      message: `Your ${companyName} integration has been updated.`,
    });
    createOrUpdateIntegration(toSubmit);
    setOpen(false);
  };
  useEffect(() => {
    const newModelList = validateCheckbox(activatedModelsWatch);
    setActivatedModels(newModelList);
  }, [activatedModelsWatch]);
  const onChange = (e) => {
    setApiKeyString(e.target.value);
  };
  return (
    <>
      <form
        className="flex-col self-stretch gap-sm"
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
          type={"password"}
          {...register(hasKey ? "api_key_display" : "api_key", { onChange })}
          title={
            hasKey ? "API key added" : `Your ${companyName} API key (optional)`
          }
          width={"w-full"}
          disabled={hasKey}
          value={apiKeyString}
          placeholder={`Paste your ${companyName} API key here`}
          action={
            false && (
              <IconButton
                type="button"
                variant="r4-white"
                icon={Delete}
                onClick={() => {
                  setApiKeyString("");
                  setHasKey(false);
                }}
              />
            )
          }
        />
        <div className="flex justify-between items-center self-stretch">
          <Button variant="text" text="Delete key" icon={Delete} />
          <div className="flex flex-end items-center gap-xs">
            <Button
              variant="r4-black"
              text="Cancel"
              type="button"
              onClick={() => {
                setOpen(false);
              }}
            />
            <Button variant="r4-primary" text="Save" />
          </div>
        </div>
      </form>
    </>
  );
};

export const IntegrationCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntegrationCardNotConnected);

export const TitleCard = ({ companyLogo, companyName, modelCount, active }) => {
  return (
    <div className="flex flex-row items-center gap-xs self-stretch">
      <div className="flex p-xxs items-center w-[40px] h-[40px] rounded-sm bg-gray-5">
        <div className="flex-col relative">
          <IconButton
            className="absolute -top-3.5 -right-3.5"
            icon={Ellipse}
            iconProps={{ active }}
          />
          {companyLogo}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-left text-md-medium ">{companyName}</span>
        <span className="text-sm-regular text-gray-4 text-center">
          {modelCount} models activated
        </span>
      </div>
    </div>
  );
};

export const IntegrationModal = ({ vendor }) => {
  const [open, setOpen] = React.useState(false);
  const [activatedModels, setActivatedModels] = React.useState(
    vendor.integration?.activated_models || []
  );
  const availableModels = vendor.available_models || [];
  const propsObj = {
    vendorId: vendor.id,
    companyName: vendor.name,
    companyLogo: vendors[vendor.name] && vendors[vendor.name].companyLogo,
    modelCount: `${activatedModels.length}/${availableModels.length}`,
    activatedModels,
    availableModels,
    integration: vendor.integration,
    apiKey: vendor.integration?.api_key_display || "",
    setActivatedModels,
  };
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={
        <TitleCard
          {...propsObj}
          active={activatedModels.length > 0 ? true : false}
        />
      }
      trigger={
        <VendorCard
          setOpen={setOpen}
          {...propsObj}
          active={activatedModels.length > 0 ? true : false}
        />
      }
    >
      <IntegrationCard setOpen={setOpen} {...propsObj} />
    </Modal>
  );
};
