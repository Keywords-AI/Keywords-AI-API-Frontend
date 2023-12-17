import React, { useEffect } from "react";
import usePost from "src/hooks/usePost";
import { SelectInput, TextInput, CopyInput } from "src/components/Inputs";
import { retrieveContext, retrievePlanName } from "src/utilities/stringProcessing";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  setNewKeyName,
  setKeyList,
  addKey,
  deleteKey,
  updateEditingKey,
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
};

const CreateFormNotConnected = React.forwardRef(({
  apiKey,
  setShowForm = () => { },
  setNewKeyName,
  addKey,
  editingTrigger }, ref) => {
  const { loading, error, data, postData } = usePost({ path: `api/create-api-key/` });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    if (!data.name) {
      data.name = "New Key";
    }
    setNewKeyName(data.name);
    postData(data);
  };
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
        <TextInput
          title={"Name (optional)"}
          width={"w-full"}
          {...register("name")}
          // onKeyDown={handleEnter}
          placeholder={"Key-1"}
        />
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
              <Button variant="r4-gray-2" text={"Cancel"}
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

const DeleteFormNotConnected = React.forwardRef(({ deletingKey, setDeletingKey, deleteKey }, ref) => {
  const {
    loading,
    error,
    data,
    postData,
  } = usePost({
    path: `api/delete-key/${deletingKey?.id}/`,
    method: "DELETE",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    deleteKey(deletingKey);
    setDeletingKey(null);
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
          <Button variant="r4-gray-2" text={"Cancel"}
            type="button"
            onClick={handleClose} />
          <Button variant="r4-red" text={"Revoke " + deletingKey?.name} />
        </div>
      </div>
    </form>
  );
});

export const DeleteForm = connect(mapStateToProps, mapDispatchToProps)(DeleteFormNotConnected);

const EditFormNotConnected = React.forwardRef(({ setEditingKey, editingKey, updateEditingKey }, ref) => {
  const [newName, setNewName] = React.useState(editingKey?.name);
  const {
    loading: editLoading,
    error: editKeyError,
    data: editKey,
    postData,
  } = usePost({
    path: `api/update-key/${editingKey?.id}/`,
    method: "PATCH"
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    postData(data);
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
      <TextInput
        title={"New name"}
        width={"w-full"}
        {...register("name", { value: newName, onChange: handleChange, required: true })}
        // onKeyDown={handleEnter}
        placeholder={"Key-1"}
      />
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <Button variant="r4-gray-2" text={"Cancel"}
            type="button"
            onClick={handleClose} />
          <Button variant="r4-primary" text="Rename" />
        </div>
      </div>
    </form>
  );
});

export const EditForm = connect(mapStateToProps, mapDispatchToProps)(EditFormNotConnected);
