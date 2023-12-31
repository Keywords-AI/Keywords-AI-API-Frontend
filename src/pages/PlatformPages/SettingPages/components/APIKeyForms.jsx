import React, { useEffect } from "react";
import usePost from "src/hooks/usePost";
import { SelectInput, TextInput, CopyInput } from "src/components/Inputs";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  setNewKeyName,
  setKeyList,
  addKey,
  deleteKey,
  updateEditingKey,
  dispatchNotification
} from "src/store/actions";

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
});

const mapDispatchToProps = {
  setNewKeyName,
  addKey,
  setKeyList,
  deleteKey,
  updateEditingKey,
  dispatchNotification
};
const expiryOptions = [
  // 'Never' represented by a far future date in the specified format
  { name: "Never", value: new Date('3000-12-31T23:59:59Z').toISOString().replace('T', ' ').replace('.000Z', '') },

  // Two weeks from now
  { name: "Two weeks", value: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').replace('.000Z', '') },

  // One month (approx 30 days) from now
  { name: "One month", value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').replace('.000Z', '') },

  // Three months (approx 90 days) from now
  { name: "Three months", value: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().replace('T', ' ').replace('.000Z', '') },
];

const CreateFormNotConnected = React.forwardRef(({
  apiKey,
  setShowForm = () => { },
  setNewKeyName,
  addKey,
  editingTrigger,
  dispatchNotification
}, ref) => {
  const { loading, error, data, postData } = usePost({ path: `api/create-api-key/` });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    if (!data.name) {
      data.name = "New Key";
    }
    setNewKeyName(data.name);
    dispatchNotification({
      title: "Key created",
      message: "Your key has been created.",
    });
    postData(data);
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])
  useEffect(() => {
    if (data && !error) {
      console.log(data);
      addKey(data, editingTrigger);
    }
  }, [data])
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowForm(false);
  }

  return (
    <form ref={ref}
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!apiKey.apiKey ? (
        <div className="grid gap-sm grid-cols-[1fr,160px]">
          <TextInput
            title={"Name (optional)"}
            width={"w-full"}
            {...register("name")}
            // onKeyDown={handleEnter}
            placeholder={"Key-1"}
          />
          <SelectInput
            title={"Expiry"}
            optionsWidth={"w-[160px]"}
            {...register("expiry_date")}
            // onKeyDown={handleEnter}
            placeholder={"Key-1"}
            defaultValue={"Never"}
            choices={expiryOptions}
          />
        </div>
      ) : (
        <CopyInput title={apiKey.newKey?.name} value={apiKey.apiKey} />
      )}
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          {apiKey.apiKey ?
            <Button variant="r4-primary" type="button"
              onClick={handleClose} text="Done" />
            :
            <>
              <Button variant="r4-black" text={"Cancel"}
                type="button"
                onClick={handleClose} />
              <Button variant="r4-primary" text="Create" />
            </>
          }
        </div>
      </div>
    </form>
  );
});
export const CreateForm = connect(mapStateToProps, mapDispatchToProps)(CreateFormNotConnected);

const DeleteFormNotConnected = React.forwardRef(({ deletingKey, setDeletingKey, deleteKey, dispatchNotification }, ref) => {
  const {
    loading,
    error,
    data,
    postData,
  } = usePost({
    path: `api/delete-key/${deletingKey?.prefix}/`,
    method: "DELETE",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("delete key");
    postData();
    deleteKey(deletingKey);
    setDeletingKey(null);
    dispatchNotification({
      title: "Key deleted",
      message: "Your key has been deleted.",
    })
  };
  const handleClose = () => {
    setDeletingKey(null);
  };
  return (
    <form ref={ref}
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit}
    >
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-black" text={"Cancel"}
            type="button"
            onClick={handleClose} />
          <Button variant="r4-red" text={"Revoke " + deletingKey?.name} />
        </div>
      </div>
    </form>
  );
});

export const DeleteForm = connect(mapStateToProps, mapDispatchToProps)(DeleteFormNotConnected);

const EditFormNotConnected = React.forwardRef(({ setEditingKey, editingKey, updateEditingKey, dispatchNotification }, ref) => {
  const [newName, setNewName] = React.useState(editingKey?.name);
  const {
    loading: editLoading,
    error: editKeyError,
    data: editKey,
    postData,
  } = usePost({
    path: `api/update-key/${editingKey?.prefix}/`,
    method: "PATCH",
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    postData(data);
    dispatchNotification({
      title: "Key updated",
      message: "Your key has been updated.",
    })
    updateEditingKey({ ...editingKey, ...data });
    setEditingKey(null);
  };
  const handleClose = (e) => {
    setEditingKey(null);
  }
  const handleChange = (e) => {
    setNewName(e.target.value);
  }
  return (
    <form ref={ref}
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-sm grid-cols-[1fr,160px]">
        <TextInput
          title={"New name"}
          width={"w-full"}
          {...register("name", { value: newName, onChange: handleChange, required: true })}
          // onKeyDown={handleEnter}
          placeholder={"Key-1"}
        />
        <SelectInput
          title={"Expiry"}
          optionsWidth={"w-[160px]"}
          {...register("expiry_date")}
          // onKeyDown={handleEnter}
          placeholder={"Key-1"}
          defaultValue={"Never"}
          choices={expiryOptions}
        />
      </div>
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-black" text={"Cancel"}
            type="button"
            onClick={handleClose} />
          <Button variant="r4-primary" text="Rename" />
        </div>
      </div>
    </form>
  );
});

export const EditForm = connect(mapStateToProps, mapDispatchToProps)(EditFormNotConnected);
