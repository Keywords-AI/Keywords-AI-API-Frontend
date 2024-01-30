import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "src/components";
import { Modal } from "src/components/Dialogs";
import { CheckboxInput, TextInput } from "src/components/Inputs";
import { dispatchNotification, createPreset} from "src/store/actions";
import { models } from "src/utilities/constants";

export default function CreatePreset() {
  const [open, setOpen] = React.useState(false);
  const organization = useSelector((state) => state.organization);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    if (!data.preset_models) {
    dispatch(
        dispatchNotification({
          title: "Please select at least one model",
          type: "error",
        })
      );
      return;
    } else {
        console.log({...data, organization: organization.id});
        dispatch(createPreset({...data, organization: organization.id}));
        setOpen(false);
        reset();
    }
  };
  return (
    <Modal
      trigger={<Button text="Create custom preset" variant="r4-primary" />}
      title={"Create new preset"}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col gap-md">
        <TextInput
          title="Name"
          placeholder="Preset 1"
          {...register("name", { required: true })}
        />
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <div className="text-gray-4 text-sm-regular w-full">Models</div>
          {models.map((model, index) => (
            <CheckboxInput
              key={index}
              text={model.name}
              {...register("preset_models")}
              value={model.value}
            />
          ))}
        </div>

        <div className="flex justify-end items-center gap-xs self-stretch flex-1">
          <DialogClose asChild>
            <Button text="Cancel" variant="r4-black" />
          </DialogClose>
          <Button text="Create" variant="r4-primary" />
        </div>
      </form>
    </Modal>
  );
}
