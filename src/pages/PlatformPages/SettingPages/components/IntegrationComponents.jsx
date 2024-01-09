import React, { useEffect, useState } from "react";
import { Button, IconButton } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { Delete, Ellipse, Info } from "src/components/Icons";
import useForwardRef from "src/hooks/useForwardRef";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { HoverPopup, VendorCard } from "src/components/Cards";
import { Modal } from "src/components/Dialogs";
import {
  createIntegration,
  setIntegration,
  updateIntegration,
  verifyKey,
} from "src/store/actions";
import { OpenAI, Anthropic, Labs, Google, Cohere } from "src/components/Icons";
import { dispatchNotification } from "src/store/actions";

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  createIntegration,
  setIntegration,
  dispatchNotification,
  updateIntegration,
  verifyKey,
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
    apiPageAddress: "https://platform.openai.com/api-keys",
    companyLogo: <OpenAI />,
  },
  Anthropic: {
    models: [
      { name: "claude-instant-1" },
      { name: "claude-instant-1.2" },
      { name: "claude-2.1" },
      { name: "claude-2" },
    ],
    apiPageAddress: "https://platform.openai.com/api-keys",
    companyLogo: <Anthropic />,
  },
  "AI21 Labs": {
    models: [{ name: "j2-light" }, { name: "j2-mid" }, { name: "j2-ultra" }],
    companyLogo: <Labs />,
    apiPageAddress: "https://platform.openai.com/api-keys",
  },
  Cohere: {
    models: [{ name: "command-nightly" }],
    companyLogo: <Cohere />,
    apiPageAddress: "https://platform.openai.com/api-keys",
  },
  Google: {
    models: [{ name: "chat-bison" }],
    companyLogo: <Google />,
    apiPageAddress: "https://platform.openai.com/api-keys",
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
  createIntegration,
  updateIntegration,
  integration,
  setActivatedModels,
  verifyKey,
  vendor,
  apiPageAddress,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const activatedModelsWatch = watch("activated_models");
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
    // This currently handles update too
    // To update and clarify
    if (
      !apiKey &&
      apiKeyString // entering new key
    ) {
      verifyKey({ ...toSubmit, api_key: apiKeyString }, () => {
        setOpen(false);
      });
    } else {
      createIntegration(toSubmit, () => {
        setOpen(false);
      });
    }
  };
  useEffect(() => {
    const newModelList = validateCheckbox(activatedModelsWatch);
    setActivatedModels(newModelList);
  }, [activatedModelsWatch]);
  const onChange = (e) => {
    setApiKeyString(e.target.value);
  };
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <form
        className="flex-col self-stretch gap-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <fieldset className="flex flex-col items-start self-stretch gap-xxs">
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
        </fieldset> */}
        <TextInput
          type={apiKey ? "text" : "password"}
          {...register(apiKey ? "api_key_display" : "api_key", { onChange })}
          title={
            apiKey ? (
              "API key"
            ) : (
              <div className="flex items-center gap-xxs relative">
                API key{" "}
                <IconButton
                  icon={Info}
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setShowInfo(false), 5000)
                  }
                />
                {showInfo && (
                  <HoverPopup
                    className="absolute bottom-1/2 translate-y-1/2 left-full translate-x-xxs"
                    text={
                      <span className="caption text-gray-4">
                        Retrieve your {companyName} key at{" "}
                        <a
                          className="underline cursor-pointer"
                          href={apiPageAddress}
                        >
                          {apiPageAddress}
                        </a>
                      </span>
                    }
                  />
                )}
              </div>
            )
          }
          width={"w-full"}
          disabled={apiKey ? true : false}
          value={apiKeyString}
          placeholder={`Paste your ${companyName} API key here`}
        />
        <div className="flex justify-between items-center self-stretch">
          {apiKeyString ? (
            <div className="flex gap-xxs">
              <Button
                variant="text"
                text="Delete key"
                icon={Delete}
                type="button"
                onClick={() => {
                  if (integration?.id) {
                    updateIntegration({
                      api_key: "",
                      vendor: vendorId,
                      integration_id: integration.id,
                      user: user.id,
                    });
                  }
                  setApiKeyString("");
                }}
              />
            </div>
          ) : (
            <div></div>
          )}
          {/*Empty div to placehold*/}
          <div className="flex flex-end items-center gap-xs">
            <Button
              variant="r4-black"
              text="Cancel"
              type="button"
              onClick={() => {
                setOpen(false);
                setActivatedModels(vendor.integration?.activated_models || []);
              }}
            />
            {!apiKey && apiKeyString ? ( // new key entering
              <Button variant="r4-primary" text="Verify Key" />
            ) : (
              <Button variant="r4-primary" text="Save" />
            )}
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

export const TitleCard = ({
  companyLogo,
  companyName,
  modelCount,
  active,
  apiKey,
}) => {
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
        {/* <span className="text-sm-regular text-gray-4 text-center">
          {modelCount} models activated
        </span> */}
        {apiKey ? (
          <span className="text-sm-regular text-gray-4 text-center">
            API key added
          </span>
        ) : (
          <span className="text-sm-regular text-gray-4 text-center">
            API key not added
          </span>
        )}
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
    apiPageAddress: vendors[vendor.name] && vendors[vendor.name].apiPageAddress,
    vendor,
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
