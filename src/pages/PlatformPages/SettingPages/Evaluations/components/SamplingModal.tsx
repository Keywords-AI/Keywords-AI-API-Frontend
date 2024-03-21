import React from "react";
import { Button } from "src/components/Buttons";
import { TextInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { updateOrganization } from "src/store/actions";
import { useTypedDispatch } from "src/store/store";
import cn from "src/utilities/classMerge";

export function SamplingModal({handleClose}) {
  const dispatch = useTypedDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(updateOrganization(data));
    handleClose();
  };
  return (
    <form
      className={cn("flex-col self-stretch gap-sm")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        {...register("sample_percentage", {
          required: "cannot be blank.",
        })}
        type="number"
        defaultValue={10}
        placeholder="10"
      />
      <div className="flex justify-end items-center gap-xs self-stretch">
        <div className="flex justify-end items-center gap-xs">
          <Button variant="r4-primary" text="Save" />
        </div>
      </div>
    </form>
  );
}
