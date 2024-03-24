import React, { useEffect, useState } from "react";
import usePost from "src/hooks/usePost";
import {
  SelectInput,
  TextInput,
  CopyInput,
  CheckboxInput,
} from "src/components/Inputs";
import { Button, IconButton, SwitchButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  setNewKeyName,
  setKeyList,
  deleteKey,
  createApiKey,
  updateEditingKey,
  dispatchNotification,
} from "src/store/actions";
import { ApiKey } from "src/types";
import { CodeViewer, Down, Info, Up } from "src/components";
import { HoverPopup } from "src/components/Cards";
import "./specialInput.css";
import { models } from "src/utilities/constants";
import { checkBoxFieldToList } from "src/utilities/objectProcessing";
import { useNavigate } from "react-router-dom";
import { Modal } from "src/components/Dialogs";
import cn from "src/utilities/classMerge";
import { useTypedSelector } from "src/store/store";
import Accordion from "src/components/Sections/Accordion/Accordion";

const mapStateToProps = (state) => ({
  user: state.user,
  apiKey: state.apiKey,
  loading: state.apiKey.loading,
  organization: state.organization,
});

const mapDispatchToProps = {
  setNewKeyName,
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

const EnvironmentOptions = [
  {
    name: "Test",
    value: true,
  },
  {
    name: "Prod",
    value: false,
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

interface CreateProps {
  apiKey?: ApiKey;
  setShowForm?: (show: boolean) => {};
  setNewKeyName?: (name: string) => {};
  createApiKey?: (data: any) => {};
  dispatchNotification?: (notification: any) => {};
  loading?: boolean;
  organization?: any;
}

const CreateFormNotConnected = React.forwardRef(
  (
    {
      apiKey,
      setShowForm = (show: boolean) => {},
      setNewKeyName,
      createApiKey,
      loading,
      dispatchNotification,
      organization,
    }: CreateProps,
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();
    const onSubmit = (data) => {
      const name = data.name || "New Key";
      data.name = name;
      setNewKeyName!(name);
      if (!showMore) {
        createApiKey!(data);
        return;
      }

      data.rate_limit = Math.round(data.rate_limit / parseInt(data.unit));
      if (typeof data.rate_limit !== "number") {
        data.rate_limit = 50000;
      }
      createApiKey!(data);
    };

    const handleClose = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setShowForm(false);
    };
    const [currentKeyName, setCurrentKeyName] = useState(
      organization.name + " Default"
    );
    const [currentUnit, setCurrentUnit] = useState(unitOptions[0].value);

    const [showMore, setShowMore] = useState(false);
    return (
      <form
        className={"flex-col gap-md self-stretch relative"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!apiKey?.apiKey ? (
          <React.Fragment>
            <div className="grid gap-xs grid-cols-[1fr,120px]">
              <TextInput
                title={"Name"}
                width={"w-full"}
                {...register("name", {
                  value: currentKeyName,
                  onChange: (e) => setCurrentKeyName(e.target.value),
                })}
                // onKeyDown={handleEnter}
                placeholder={"test key 1"}
              />
              {/* <SelectInput
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
              /> */}
              <SelectInput
                title={"Environment"}
                optionsWidth={"w-[120px]"}
                {...register("is_test")}
                // onKeyDown={handleEnter}
                defaultValue={false}
                //This corresponds to the 'Never' option
                // defaultValue={
                //   new Date("3000-12-31T23:59:59Z").toISOString().split("T")[0]
                // }
                choices={EnvironmentOptions}
                backgroundColor="bg-transparent"
              />
            </div>
            <Accordion
              className={
                "flex-col justify-center items-start gap-xs self-stretch"
              }
              // value={accordion2}
              // onValueChange={setAccordion2}
              content={{
                trigger: "More options",
                content: (
                  <div className="flex-col justify-center gap-md self-stretch">
                    <div className="grid gap-xs grid-cols-[1fr,120px]">
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
                        optionsWidth={"w-[120px]"}
                        {...register("unit", {
                          value: currentUnit,
                          onChange: (e) => setCurrentUnit(e.target.value),
                        })}
                        // onKeyDown={handleEnter}
                        placeholder={"per minute"}
                        width="w-[120px]"
                        backgroundColor="bg-transparent"
                        //This corresponds to the 'Never' option
                        choices={unitOptions}
                      />
                    </div>
                    <div className="grid gap-xs grid-cols-[1fr,120px]">
                      <TextInput
                        title={"Spending limit"}
                        width={"w-full"}
                        {...register("spending_limit")}
                        // onKeyDown={handleEnter}
                        placeholder={"200 by default"}
                        type="number"
                        dollarSign
                      />
                      <SelectInput
                        title={"Expiry"}
                        optionsWidth={"w-[120px]"}
                        {...register("expiry_date")}
                        // onKeyDown={handleEnter}
                        placeholder={"Key-1"}
                        //This corresponds to the 'Never' option
                        defaultValue={
                          new Date("3000-12-31T23:59:59Z")
                            .toISOString()
                            .split("T")[0]
                        }
                        choices={expiryOptions}
                        buttonPadding="py-xxs px-xxs"
                        backgroundColor="bg-transparent"
                      />
                    </div>
                  </div>
                ),
                contentClassName: "flex-col justify-center gap-md self-stretch",
              }}
            />
            <div className="flex-col justify-center items-start gap-xs self-stretch">
              {/* <Button
                icon={showMore ? Up : Down}
                variant="text"
                type="button"
                text="More options"
                justification="justify-center"
                iconSize="xxs"
                onClick={() => setShowMore((prev) => !prev)}
                padding="py-xxs"
              /> */}
              <div className="flex-col justify-center gap-md self-stretch">
                {/* {showMore && (
                  <>
                    <div className="grid gap-xs grid-cols-[1fr,120px]">
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
                        optionsWidth={"w-[120px]"}
                        {...register("unit", {
                          value: currentUnit,
                          onChange: (e) => setCurrentUnit(e.target.value),
                        })}
                        // onKeyDown={handleEnter}
                        placeholder={"per minute"}
                        width="w-[120px]"
                        //This corresponds to the 'Never' option
                        choices={unitOptions}
                      />
                    </div>
                    <div className="grid gap-xs grid-cols-[1fr,120px]">
                      <TextInput
                        title={"Spending limit"}
                        width={"w-full"}
                        {...register("spending_limit")}
                        // onKeyDown={handleEnter}
                        placeholder={"100"}
                        type="number"
                        defaultValue={200}
                        dollarSign
                      />
                      <SelectInput
                        title={"Expiry"}
                        optionsWidth={"w-[120px]"}
                        {...register("expiry_date")}
                        // onKeyDown={handleEnter}
                        placeholder={"Key-1"}
                        //This corresponds to the 'Never' option
                        defaultValue={
                          new Date("3000-12-31T23:59:59Z")
                            .toISOString()
                            .split("T")[0]
                        }
                        choices={expiryOptions}
                      />
                    </div>
                  </>
                )} */}
                <div
                  className={cn(
                    "flex-row self-stretch items-center",
                    loading ? "justify-between" : "justify-end"
                  )}
                >
                  {loading && (
                    <div className="text-sm-md text-success ">
                      Creating Key...
                    </div>
                  )}
                  <div className="flex-row gap-xs ">
                    {apiKey.apiKey ? (
                      <>
                        <ViewCode
                          apiKey={apiKey.apiKey}
                          name={apiKey.newKey?.name}
                        />
                        <Button
                          variant="r4-primary"
                          type="button"
                          onClick={handleClose}
                          text="Done"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          variant="r4-gray-2"
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
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="flex-col self-stretch flex-1 gap-md">
            <CopyInput
              title={apiKey.newKey?.name}
              value={apiKey.apiKey}
              disabled
            />
            <div
              className={cn(
                "flex-row self-stretch items-center",
                loading ? "justify-between" : "justify-end"
              )}
            >
              {loading && (
                <div className="text-sm-md text-success ">Creating Key...</div>
              )}
              <div className="flex-row gap-xs ">
                {apiKey.apiKey ? (
                  <>
                    <ViewCode
                      apiKey={apiKey.apiKey}
                      name={apiKey.newKey?.name}
                    />
                    <Button
                      variant="r4-primary"
                      type="button"
                      onClick={handleClose}
                      text="Done"
                    />
                  </>
                ) : (
                  <>
                    <Button
                      variant="r4-gray-2"
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
          </div>
        )}
      </form>
    );
  }
);
export const CreateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFormNotConnected);

const DeleteFormNotConnected = React.forwardRef(
  ({ deletingKey, setDeletingKey, deleteKey }, ref) => {
    const { loading, error, data, postData } = usePost({
      path: `api/delete-key/${deletingKey?.id}/`,
      method: "DELETE",
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("delete key");
      postData();
      deleteKey(deletingKey);
      setDeletingKey(null);
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
              variant="r4-gray-2"
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


type EditingFromProps = {
  setEditingKey: (key: ApiKey | undefined) => {};
  editingKey: ApiKey | undefined;
  updateEditingKey: (key: ApiKey) => {};
  dispatchNotification: (notification: any) => {};
};
const EditFormNotConnected = ({
  setEditingKey,
  editingKey,
  updateEditingKey,
  dispatchNotification,
}: EditingFromProps) => {
  const [currentKeyName, setCurrentKeyName] = useState(
    editingKey?.name || "New Key"
  );
  const [currentUnit, setCurrentUnit] = useState(unitOptions[0].value);
  const [currentEnv, setcurrentEnv] = useState(editingKey?.is_test ?? false);
  console.log("currentUnit", currentUnit);
  useEffect(() => {
    if (editingKey) {
      setCurrentKeyName(editingKey.name);
      setcurrentEnv(editingKey.is_test);
    }
  }, [editingKey]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    updateEditingKey({ ...editingKey, ...data });
    setEditingKey(undefined);
  };
  const handleClose = (e: any) => {
    setEditingKey(undefined);
  };

  const [showMore, setShowMore] = useState(true);
  return (
    <form
      className={"flex-col gap-md self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <React.Fragment>
        {/* <div className="grid gap-xs grid-cols-[1fr,120px]"> */}
          <TextInput
            title={"Name"}
            width={"w-full"}
            {...register("name", {
              value: currentKeyName,
              onChange: (e) => setCurrentKeyName(e.target.value),
            })}
            // onKeyDown={handleEnter}
            placeholder={"test key 1"}
          />
          {/* <SelectInput
            title={"Expiry"}
            optionsWidth={"w-[120px]"}
            {...register("expiry_date")}
            // onKeyDown={handleEnter}
            placeholder={"Key-1"}
            //This corresponds to the 'Never' option
            defaultValue={
              new Date("3000-12-31T23:59:59Z").toISOString().split("T")[0]
            }
            choices={expiryOptions}
          /> */}
          {/* <SelectInput
            title={"Environment"}
            optionsWidth={"w-[120px]"}
            {...register("is_test", {value: currentEnv, onChange: ()=>{ setcurrentEnv(!currentEnv)}})}
            choices={EnvironmentOptions}
            value={currentEnv}
            backgroundColor="bg-gray-1"
            // onKeyDown={handleEnter}
            //This corresponds to the 'Never' option
            // defaultValue={
            //   new Date("3000-12-31T23:59:59Z").toISOString().split("T")[0]
            // }
          /> */}
        {/* </div> */}
        <Accordion
          className={"flex-col justify-center items-start gap-xs self-stretch"}
          // value={accordion2}
          // onValueChange={setAccordion2}
          content={{
            trigger: "More options",
            content: (
              <div className="flex-col justify-center gap-md self-stretch">
                <div className="grid gap-xs grid-cols-[1fr,120px]">
                  <TextInput
                    title={"Rate limit"}
                    width={"w-full"}
                    {...register("rate_limit")}
                    // onKeyDown={handleEnter}
                    placeholder={"None"}
                    type="number"
                    defaultValue={editingKey?.rate_limit}
                    pseudoElementClass="special-input"
                  />
                  <SelectInput
                    title={"Unit"}
                    optionsWidth={"w-[120px]"}
                    {...register("unit", {
                      value: currentUnit,
                      onChange: (e) => setCurrentUnit(e.target.value),
                    })}
                    // onKeyDown={handleEnter}
                    placeholder={"per minute"}
                    width="w-[120px]"
                    //This corresponds to the 'Never' option
                    choices={unitOptions}
                    backgroundColor="bg-transparent"
                  />
                </div>

                <div className="grid gap-xs grid-cols-[1fr,120px]">
                  <TextInput
                    title={"Spending limit"}
                    width={"w-full"}
                    {...register("spending_limit")}
                    // onKeyDown={handleEnter}
                    placeholder={"200 by default"}
                    type="number"
                    dollarSign
                  />
                  <SelectInput
                    title={"Expiry"}
                    optionsWidth={"w-[120px]"}
                    {...register("expiry_date")}
                    // onKeyDown={handleEnter}
                    placeholder={"Key-1"}
                    //This corresponds to the 'Never' option
                    defaultValue={
                      new Date("3000-12-31T23:59:59Z")
                        .toISOString()
                        .split("T")[0]
                    }
                    choices={expiryOptions}
                    buttonPadding="py-xxs px-xxs"
                    backgroundColor="bg-transparent"
                  />
                </div>
              </div>
            ),
            contentClassName: "flex-col justify-center gap-md self-stretch",
          }}
        />
        <div className="flex-col justify-center items-start gap-xs self-stretch">
          <div className="flex-col items-start justify-center gap-md self-stretch">
            {/* {showMore && (
              <>
                <div className="flex items-center gap-xs self-stretch">
                  <TextInput
                    title={"Rate limit"}
                    width={"w-full"}
                    {...register("rate_limit")}
                    // onKeyDown={handleEnter}
                    placeholder={"None"}
                    type="number"
                    defaultValue={editingKey?.rate_limit}
                    pseudoElementClass="special-input"
                  />
                  <SelectInput
                    title={"Unit"}
                    optionsWidth={"w-[160px]"}
                    {...register("unit", {
                      value: currentUnit,
                      onChange: (e) => setCurrentUnit(e.target.value),
                    })}
                    // onKeyDown={handleEnter}
                    placeholder={"per minute"}
                    width="w-[160px]"
                    //This corresponds to the 'Never' option
                    choices={unitOptions}
                  />
                </div>
                <TextInput
                  title={"Spending limit"}
                  width={"w-full"}
                  {...register("spending_limit")}
                  // onKeyDown={handleEnter}
                  placeholder={"100"}
                  type="number"
                  dollarSign
                  defaultValue={editingKey?.spending_limit}
                />
              </>
            )} */}
            <div
              className={cn(
                "flex-row self-stretch items-center",
                "justify-end"
              )}
            >
              <div className="flex-row gap-xs ">
                <Button
                  variant="r4-gray-2"
                  bgColor="transparent"
                  text={"Cancel"}
                  type="button"
                  onClick={handleClose}
                />
                <Button variant="r4-primary" text="Save" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </form>
  );
};

export const EditForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFormNotConnected);

const ViewCode = React.forwardRef(
  ({ apiKey, name }: { apiKey: string; name: string }, ref) => {
    console.log(apiKey);
    const KeyList = useTypedSelector((state) => state.apiKey.keyList);
    const currentKey = KeyList.find((key) => key.name === name);
    const navigate = useNavigate();
    return (
      <Modal
        ref={ref}
        trigger={<Button variant="r4-gray-2" text="View code" />}
        title="View code"
        subtitle="You can use the following code to start integrating your current prompt and settings into your application."
        width="w-[864px]"
      >
        <CodeViewer
          apikey={apiKey}
          modelName={currentKey?.preset_models || []}
        />
        {/* <p className="text-sm-regular text-gray-4">
          Your API key can be found{" "}
          <a
            onClick={() => navigate("/platform/api/api-keys")}
            className="text-primary cursor-pointer"
          >
            here
          </a>
          . You should use environment variables or a secret management tool to
          expose your key to your applications.
        </p> */}
      </Modal>
    );
  }
);
