import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pencil } from "src/components";
import { Modal } from "src/components/Dialogs";
import { CheckboxInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateUser } from "src/store/actions";
import { models } from "src/utilities/constants";

export default function EditPresetModal({
  previousSelectedModels,
  presetName,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const previousCustomPresets = useSelector(
    (state) => state.user.custom_presets
  );
  const onSubmit = async (data) => {
    console.log(data);
    const newCustomPresets = previousCustomPresets.map((preset) => {
      if (preset.name === presetName) {
        return {
          ...preset,
          created_preset_models: data.custom_preset_models,
        };
      }
      return preset;
    });
    dispatch(updateUser({ custom_presets: newCustomPresets }));
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  previousSelectedModels = previousSelectedModels.map((model) => model.value);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      trigger={
        <Button
          type="button"
          variant="text"
          icon={Pencil}
          iconPosition="left"
          text="Edit"
          padding="py-[3px] hover:py-[3px]"
        />
      }
      title="Edit preset"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center content-center gap-xs self-stretch flex-wrap"
      >
        {models.map((model, index) => (
          <CheckboxInput
            key={index}
            text={model.name}
            checked={previousSelectedModels.includes(model.value)}
            {...register("custom_preset_models")}
            value={model.value}
          />
        ))}
        <div className="flex justify-end items-center gap-xs self-stretch flex-1">
          <DialogClose asChild>
            <Button text="Cancel" variant="r4-black" />
          </DialogClose>
          <Button text="Submit" variant="r4-primary" />
        </div>
      </form>
    </Modal>
  );
}
