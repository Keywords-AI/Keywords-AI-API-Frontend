import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "src/components";
import { Modal } from "src/components/Dialogs";
import { CheckboxInput, TextInput } from "src/components/Inputs";
import { dispatchNotification, updateUser} from "src/store/actions";
import { models } from "src/utilities/constants";

export default function CreatePreset() {
  const [open, setOpen] = React.useState(false);
  const custom_presets =
    useSelector((state) => state.user.custom_presets) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    if (!data.created_preset_models) {
      dispatch(
        dispatchNotification({
          title: "Please select at least one model",
          type: "error",
        })
      );
      return;
    } else {
      try {
        console.log(data);
        dispatch(createPreset(data));
        // dispatch(updateUser({ custom_presets: [...custom_presets, data] }));
        dispatch(
          dispatchNotification({
            title: `Preset created successfully`,
            type: "success",
          })
        );
        setOpen(false);
        reset();
      } catch (error) {
        console.log(error);
        dispatch(
          dispatchNotification({
            title: "Failed to create preset",
            type: "error",
          })
        );
      }
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
          {...register("preset_name", { required: true })}
        />
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <div className="text-gray-4 text-sm-regular w-full">Models</div>
          {models.map((model, index) => (
            <CheckboxInput
              key={index}
              text={model.name}
              {...register("created_preset_models")}
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
