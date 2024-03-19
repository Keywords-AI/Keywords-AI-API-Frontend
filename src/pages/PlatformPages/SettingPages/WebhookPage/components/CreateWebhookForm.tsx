import React from "react";
import { Button } from "src/components/Buttons";
import { TextInput, SelectInput } from "src/components/Inputs";
import { formProps } from "src/types/form";
import { createWebhook } from "src/store/actions";
import { useForm } from "react-hook-form";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";

export function CreateWebhookForm(
  { handleClose = () => {

  } }: formProps
) {
  const { register, handleSubmit} = useForm();
  const dispatch = useTypedDispatch();
  const organizationId = useTypedSelector((state: RootState) => state.organization?.id);
  const apiKeys = useTypedSelector((state: RootState) => state.apiKey.keyList);
  const onSubmit = (data: any) => {
    data.organization = organizationId;
    dispatch(createWebhook(data));
    handleClose();
  };
  return (
    <form
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput title="Name" placeholder="Provide a name for this webhook" {...register("name")}/>
      <TextInput title="URL" placeholder="Provide the full URL to the endpoint Keywords AI should call" {...register("url")}/>
      <SelectInput
      title="Event type" 
      width="w-full"
      align="start"
      placeholder="Select an event type"
      defaultValue={"request_log"}
      choices={[
        { value: "request_log", name: "New request log" },
      ]} 
      {...register("event_type")}
      />
      <SelectInput
      title="API Key" 
      width="w-full"
      align="start"
      placeholder="Select an API Key to associate with"
      defaultValue={undefined}
      choices={apiKeys.map((key)=>{
        return {
          name: key.name,
          value: key.id,
        }
      })} 
      {...register("organization_key")}
      />
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-black" type="button" onClick={handleClose}>Cancel</Button>
          <Button variant="r4-primary">Create</Button>
        </div>
      </div>
    </form>
  );
}
