import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pencil } from "src/components";
import { Modal } from "src/components/Dialogs";
import { CheckboxInput } from "src/components/Inputs";
import { set, useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { updateUser } from "src/store/actions";
export default function EditPresetModal({ models }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const selectedModels = Object.keys(data).filter(
        (key) => data[key] === true
      );
      console.log(selectedModels);
      dispatch(updateUser({ preset_models: selectedModels }));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = React.useState(false);
  const previousSelectedModels =
    useSelector((state) => state.user.preset_models) || [];
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
            checked={previousSelectedModels.includes(model.name)}
            {...register(model.name)}
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
