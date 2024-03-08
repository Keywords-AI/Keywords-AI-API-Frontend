import React, { useEffect } from "react";
import { Divider, PageContent } from "src/components/Sections";
import { Button, IconButton, SwitchButton } from "src/components/Buttons";
import { TitleStaticSubheading } from "src/components/Titles";
import { SelectInput } from "src/components/Inputs";
import {
  toggleFallback,
  updateOrganization,
  toggleSystemFallback,
  updateUser,
} from "src/store/actions";
import { RootState } from "src/types";
import { useForm } from "react-hook-form";
import { models as MODELS } from "src/utilities/constants";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { Redirect } from "src/components";
import { Tag } from "src/components/Misc";
import { useNavigate } from "react-router-dom";

export const AlertsFallbackPage = () => {
  const { isFallbackEnabled, fallbackModels, systemFallbackEnabled, orgPlan } =
    useTypedSelector((state: RootState) => ({
      isFallbackEnabled: state.organization?.fallback_model_enabled,
      fallbackModels: state.organization?.fallback_models,
      systemFallbackEnabled: state.organization?.system_fallback_enabled,
      orgPlan: state.organization?.organization_subscription?.plan,
    }));

  const dispatch = useTypedDispatch();
  const [fallbackEnabled, setFallbackEnabled] =
    React.useState(isFallbackEnabled);
  const [alertsEnabled, setAlertsEnabled] = React.useState(true);
  const [systemEnable, setSystemEnable] = React.useState(systemFallbackEnabled);
  useEffect(() => {
    setFallbackEnabled(isFallbackEnabled);
    setSystemEnable(systemFallbackEnabled);
  }, [isFallbackEnabled, systemFallbackEnabled]);
  const { register, handleSubmit, watch, formState } = useForm();
  const model1 = watch("fall_back_model_1");
  const model2 = watch("fall_back_model_2");
  const model3 = watch("fall_back_model_3");
  useEffect(() => {
    const fallback_models = [model1, model2, model3].filter(
      (item) => item !== "" && item !== undefined
    );
    if (
      fallback_models.length === 0 ||
      Object.keys(formState.dirtyFields).length === 0
    ) {
      return;
    }

    dispatch(
      updateOrganization({
        fallback_models,
        fallback_model_enabled: fallbackEnabled,
      })
    );
  }, [model1, model2, model3]);
  const isFreeUser = useTypedSelector((state: RootState) => {
    const planLevel = state.organization?.organization_subscription?.plan_level || 0;
    return planLevel < 2;
  });
  const models = MODELS.map((model) => {
    if (isFreeUser && model.brand !== "openai") {
      return { ...model, disabled: true };
    }
    return model;
  });
  const filteredModelsForModel1 = [
    {
      name: "Please select a model",
      value: "",
    },
    ...models.filter(
      (model) => model.value !== model2 && model.value !== model3
    ),
  ];

  const filteredModelsForModel2 = [
    {
      name: "Please select a model",
      value: "",
    },
    ...models.filter(
      (model) => model.value !== model1 && model.value !== model3
    ),
  ];
  const filteredModelsForModel3 = [
    {
      name: "Please select a model",
      value: "",
    },
    ...models.filter(
      (model) => model.value !== model1 && model.value !== model2
    ),
  ];

  const handleToggle = () => {
    setFallbackEnabled(!fallbackEnabled);
    dispatch(
      updateOrganization({ fallback_model_enabled: !isFallbackEnabled })
    );
  };
  const onSubmit = (data: any) => {
    // const fallback_models: any[] = [];
    // Object.keys(data).forEach((key) => {
    //   if (key.includes("fall_back_model")) {
    //     if (data[key] !== "") fallback_models.push(data[key]);
    //   }
    // });
    // dispatch(
    //   updateOrganization({
    //     fallback_models,
    //     fallback_model_enabled: fallbackEnabled,
    //   })
    // );
  };
  const handleAlertsFallbackToggle = () => {
    setAlertsEnabled(!alertsEnabled);
    dispatch(
      updateOrganization({ fallback_model_enabled: !isFallbackEnabled })
    );
  };
  const handleSystemFallbackToggle = () => {
    setSystemEnable(!systemEnable);
    dispatch(
      updateOrganization({ system_fallback_enabled: !systemFallbackEnabled })
    );
  };
  const navigate = useNavigate();
  return (
    <PageContent
      title="Alerts & Fallback"
      subtitle="Get notified when an LLM outage is detected and set the fallback mechanism."
    >
      <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
        <TitleStaticSubheading
          title="Subscribe to alerts"
          subtitle="Subscribe to system status and get notified via email when an LLM outage is detected."
        />
        <div className="flex flex-row items-start justify-center pt-[3px]">
          {/* <IconButton
            icon={Redirect}
            onClick={() =>
              window.open("https://status.keywordsai.co", "_blank")
            }
          /> */}
          <SwitchButton 
            checked={alertsEnabled}
            onCheckedChange={handleAlertsFallbackToggle}
          />
        </div>
      </div>
      <Divider />
      {/* <form
        className="flex flex-col gap-sm items-start justify-between self-stretch w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Model fallback"
            subtitle="Enable model fallback to boost your uptime. Automatically fallback to the backup models when the preferred model is not responding."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={isFallbackEnabled || false}
              onCheckedChange={handleToggle}
              {...register("enable_fallback")}
            />
          </div>
        </div> */}
      {/* {fallbackEnabled && (
          // <>
          //   <div className="flex flex-col items-start gap-xs">
          //     <SelectInput
          //       {...register("fall_back_model_1")}
          //       title="Model #1"
          //       width="w-[248px]"
          //       optionsWidth="w-[248px]"
          //       choices={filteredModelsForModel1}
          //       defaultValue={fallbackModels?.[0]}
          //       placeholder="Select model #1"
          //     />
          //     <SelectInput
          //       {...register("fall_back_model_2")}
          //       title="Model #2"
          //       width="w-[248px]"
          //       optionsWidth="w-[248px]"
          //       choices={filteredModelsForModel2}
          //       defaultValue={fallbackModels?.[1]}
          //       placeholder="Select model #2"
          //     />
          //     <SelectInput
          //       {...register("fall_back_model_3")}
          //       title="Model #3"
          //       width="w-[248px]"
          //       optionsWidth="w-[248px]"
          //       choices={filteredModelsForModel3}
          //       defaultValue={fallbackModels?.[2]}
          //       placeholder="Select model #3"
          //     />
          //   </div>
          // </>
        )} */}
      {/* </form> */}
      {/* <Divider /> */}
      {!isFreeUser && (
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Safety net"
            subtitle="Automatically fallback to a system assigned model if fallback models are not responding or specified."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <SwitchButton
              checked={systemEnable}
              onCheckedChange={handleSystemFallbackToggle}
            />
          </div>
        </div>
      )}
      {isFreeUser && (
        <div className="flex flex-row items-start justify-between self-stretch w-full gap-md">
          <TitleStaticSubheading
            title="Safety net"
            subtitle="Automatically fallback to a system assigned model if fallback models are not responding or specified."
          />
          <div className="flex flex-row items-start justify-center pt-[3px]">
            <Tag
              text="Upgrade"
              backgroundColor="bg-primary/10"
              textColor="text-primary"
              border="shadow-transparent"
              onClick={() => {
                navigate("/platform/api/plans");
              }}
            />
          </div>
        </div>
      )}
    </PageContent>
  );
};
