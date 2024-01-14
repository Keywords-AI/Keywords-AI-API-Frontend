import React, { useEffect, useState } from "react";
import usePost from "src/hooks/usePost";
import { SelectInput, TextInput, CopyInput } from "src/components/Inputs";
import { Button, IconButton, SwitchButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  setNewKeyName,
  setKeyList,
  addKey,
  deleteKey,
  createApiKey,
  updateEditingKey,
  dispatchNotification,
} from "src/store/actions";
import { Icon } from "@radix-ui/react-select";
import { Info } from "src/components";
import { HoverPopup } from "src/components/Cards";
import "./specialInput.css"

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
  loading: state.apiKey.loading,
});

const mapDispatchToProps = {
  setNewKeyName,
  addKey,
  setKeyList,
  deleteKey,
  updateEditingKey,
  createApiKey,
  dispatchNotification,
};
const expiryOptions = [
  // 'Never' represented by a far future date in the specified format
  {
    name: "Never",
    value: new Date("3000-12-31T23:59:59Z").toISOString().split("T")[0],
  },

  // Two weeks from now
  {
    name: "Two weeks",
    value: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },

  // One month (approx 30 days) from now
  {
    name: "One month",
    value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },

  // Three months (approx 90 days) from now
  {
    name: "Three months",
    value: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
];


const unitOptions = [
  // 'Never' represented by a far future date in the specified format
  {
    name: "per minute",
    value: 1,
  },

  // Two weeks from now
  {
    name: "per hour",
    value: 60,
  },

  // One month (approx 30 days) from now
  {
    name: "per day",
    value: 1440,
  },
];

const CreateFormNotConnected = React.forwardRef(
  (
    {
      apiKey,
      setShowForm = () => {},
      setNewKeyName,
      editingTrigger,
      createApiKey,
      loading,
      dispatchNotification,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log(JSON.stringify(data));
      if (!data.name) {
        data.name = "New Key";
      }
      setNewKeyName(data.name);
      console.log(data);
      createApiKey(data, editingTrigger);
  };
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowForm(false);
    };
    const [showInfo, setShowInfo] = useState(false);

    const [isRateLimitEnabled, setIsRateLimitEnabled] = useState(false);
    const [isSpendingLimitEnabled, setIsSpendingLimitEnabled] = useState(false);


    const handleRateLimitSwitch = (checked) => {
      setIsRateLimitEnabled(checked);
    };

    const handleSpendingLimitSwitch = (checked) => {
      setIsSpendingLimitEnabled(checked);
    };


    return (
      <form
        ref={ref}
        className={"flex-col gap-sm self-stretch relative"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!apiKey.apiKey ? (
          !loading ? (
            <React.Fragment>
              <div className="grid gap-sm grid-cols-[1fr,160px]">
                <TextInput
                  title={"Name"}
                  width={"w-full"}
                  {...register("name")}
                  // onKeyDown={handleEnter}
                  placeholder={"test key 1"}
                />
                <SelectInput
                  title={"Expiry"}
                  optionsWidth={"w-[160px]"}
                  {...register("expiry_date")}
                  // onKeyDown={handleEnter}
                  placeholder={"Key-1"}
                  //This corresponds to the 'Never' option
                  defaultValue={
                    new Date("3000-12-31T23:59:59Z").toISOString().split("T")[0]
                  }
                  choices={expiryOptions}
                />
              </div>
              <div className="flex flex-row items-center gap-xxs relative">
                <span className="text-sm-regular text-gray-4">
                  Has rate limit{" "}
                </span>
                <IconButton
                  icon={Info}
                  onMouseEnter={() => setShowInfo(true)}
                  onMouseLeave={() => setShowInfo(false)}
                />
                {showInfo && (
                  <HoverPopup
                    className="absolute bottom-1/2 translate-y-1/2 left-6 translate-x-32 "
                    text="rate limit"
                  />
                )}
                <SwitchButton onCheckedChange={handleRateLimitSwitch} className="absolute -top-[2px]"/>
              </div>
              {isRateLimitEnabled && <div className="grid gap-sm grid-cols-[1fr,160px]">
                <TextInput
                  title={"Rate limit"}
                  width={"w-full"}
                  {...register("rate_limit")}
                  // onKeyDown={handleEnter}
                  placeholder={"None"}
                  type="number"
                  pseudoElementClass="special-input"
                />
                <SelectInput
                  title={"Unit"}
                  optionsWidth={"w-[160px]"}
                  {...register("unit")}
                  // onKeyDown={handleEnter}
                  placeholder={"per minute"}
                  //This corresponds to the 'Never' option
                  choices={unitOptions}
                  deaultValue={1}
                />
              </div>}
              <div className="flex flex-row items-center gap-xxs relative">
                <span className="text-sm-regular text-gray-4">
                  Has spending limit{" "}
                </span>
                <SwitchButton onCheckedChange={handleSpendingLimitSwitch}/>
              </div>
           {isSpendingLimitEnabled && <div className="grid gap-sm grid-cols-1">
                <TextInput
                  title={"Spending limit"}
                  width={"w-full"}
                  {...register("spending_limit")}
                  // onKeyDown={handleEnter}
                  placeholder={"$100"}
                  type="number"
                  defaultValue={100}
                />
              </div>}

            </React.Fragment>
          ) : (
            <div className="text-sm-regular text-gray-4">
              please wait for a quick sec
            </div>
          )
        ) : (
          <CopyInput title={apiKey.newKey?.name} value={apiKey.apiKey} />
        )}
        <div className="flex-row justify-end self-stretch">
          <div className="flex-row gap-xs">
            {apiKey.apiKey ? (
              <Button
                variant="r4-primary"
                type="button"
                onClick={handleClose}
                text="Done"
              />
            ) : (
              <>
                <Button
                  variant="r4-black"
                  bgColor="transparent"
                  text={"Cancel"}
                  type="button"
                  onClick={handleClose}
                />
                <Button variant="r4-primary" text="Create" />
              </>
            )}
          </div>
        </div>
      </form>
    );
  }
);
export const CreateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFormNotConnected);

const DeleteFormNotConnected = React.forwardRef(
  ({ deletingKey, setDeletingKey, deleteKey, dispatchNotification }, ref) => {
    const { loading, error, data, postData } = usePost({
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
      });
    };
    const handleClose = () => {
      setDeletingKey(null);
    };
    return (
      <form
        ref={ref}
        className={"flex-col gap-sm self-stretch relative"}
        onSubmit={handleSubmit}
      >
        <div className="flex-row justify-end self-stretch">
          <div className="flex-row gap-xs">
            <Button
              variant="r4-black"
              bgColor="transparent"
              text={"Cancel"}
              type="button"
              onClick={handleClose}
            />
            <Button variant="r4-red" text={"Revoke " + deletingKey?.name} />
          </div>
        </div>
      </form>
    );
  }
);

export const DeleteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteFormNotConnected);

const EditFormNotConnected = React.forwardRef(
  (
    { setEditingKey, editingKey, updateEditingKey, dispatchNotification },
    ref
  ) => {
    const [newName, setNewName] = React.useState(editingKey?.name);
    const [defaultTime, setDefaultTime] = React.useState(
      editingKey?.expiry_date || new Date("3000-12-31T23:59:59Z").toISOString()
    );
    const {
      loading: editLoading,
      error: editKeyError,
      data: editKey,
      postData,
    } = usePost({
      path: `api/update-key/${editingKey?.prefix}/`,
      method: "PATCH",
    });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      postData(data);
      dispatchNotification({
        title: "Key updated",
        message: "Your key has been updated.",
      });
      updateEditingKey({ ...editingKey, ...data });
      setEditingKey(null);
    };
    const handleClose = (e) => {
      setEditingKey(null);
    };
    const handleChange = (e) => {
      setNewName(e.target.value);
    };
    return (
      <form
        ref={ref}
        className={"flex-col gap-sm self-stretch relative"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-sm grid-cols-[1fr,160px]">
          <TextInput
            title={"New name"}
            width={"w-full"}
            {...register("name", {
              value: newName,
              onChange: handleChange,
              required: true,
            })}
            placeholder={"Key-1"}
          />
          <SelectInput
            title={"Expiry"}
            optionsWidth={"w-[160px]"}
            {...register("expiry_date")}
            placeholder={"Key-1"}
            //This corresponds to the fetched expiry date
            defaultValue={new Date(defaultTime).toISOString().split("T")[0]}
            choices={expiryOptions}
          />
        </div>
        <div className="flex-row justify-end self-stretch">
          <div className="flex-row gap-xs">
            <Button
              variant="r4-black"
              text={"Cancel"}
              bgColor="transparent"
              type="button"
              onClick={handleClose}
            />
            <Button variant="r4-primary" text="Save" />
          </div>
        </div>
      </form>
    );
  }
);

export const EditForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormNotConnected);
