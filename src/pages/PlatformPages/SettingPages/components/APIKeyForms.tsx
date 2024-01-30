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
import { CodeViewer, Info } from "src/components";
import { HoverPopup } from "src/components/Cards";
import "./specialInput.css";
import { models } from "src/utilities/constants";
import { checkBoxFieldToList } from "src/utilities/objectProcessing";
import { useNavigate } from "react-router-dom";
import { Modal } from "src/components/Dialogs";
import cn from "src/utilities/classMerge";
import { useTypedSelector } from "src/store/store";

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
      if (!data.name) {
        data.name = "New Key";
      }
      setNewKeyName(data.name);
      data.rate_limit = Math.round(data.rate_limit / parseInt(data.unit));
      if (typeof data.rate_limit !== "number") {
        data.rate_limit = 100;
      }
      data.preset_models = checkBoxFieldToList(data.preset_models);
      if (data.preset_models.length === 0) {
        dispatchNotification({
          type: "error",
          title: "Please select at least one model",
        });
        return;
      }
      createApiKey(data);
    };
    const handleClose = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setShowForm(false);
    };
    const [showInfo, setShowInfo] = useState(false);
    const [currentKeyName, setCurrentKeyName] = useState("New Key");
    const [isRateLimitEnabled, setIsRateLimitEnabled] = useState(false);
    const [currentUnit, setCurrentUnit] = useState(unitOptions[0].value);
    const [isSpendingLimitEnabled, setIsSpendingLimitEnabled] = useState(false);

    const handleRateLimitSwitch = (checked) => {
      setIsRateLimitEnabled(checked);
    };

    const handleSpendingLimitSwitch = (checked) => {
      setIsSpendingLimitEnabled(checked);
    };

    return (
      <form
        className={"flex-col gap-sm self-stretch relative"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!apiKey?.apiKey ? (
          <React.Fragment>
            <div className="grid gap-sm grid-cols-[1fr,160px]">
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
              <SwitchButton
                onCheckedChange={handleRateLimitSwitch}
                className="absolute -top-[2px]"
              />
            </div>
            {isRateLimitEnabled && (
              <div className="grid gap-sm grid-cols-[1fr,160px]">
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
                  {...register("unit", {
                    value: currentUnit,
                    onChange: (e) => setCurrentUnit(e.target.value),
                  })}
                  // onKeyDown={handleEnter}
                  placeholder={"per minute"}
                  //This corresponds to the 'Never' option
                  choices={unitOptions}
                />
              </div>
            )}
            <div className="flex flex-row items-center gap-xxs relative">
              <span className="text-sm-regular text-gray-4">
                Has spending limit{" "}
              </span>
              <SwitchButton onCheckedChange={handleSpendingLimitSwitch} />
            </div>
            {isSpendingLimitEnabled && (
              <div className="grid gap-sm grid-cols-1">
                <TextInput
                  title={"Spending limit"}
                  width={"w-full"}
                  {...register("spending_limit")}
                  // onKeyDown={handleEnter}
                  placeholder={"$100"}
                  type="number"
                  defaultValue={100}
                />
              </div>
            )}
            {/* <SelectInput
                title={"Select preset"}
                {...register("preset_models")}
                defaultValue={models.reduce(
                  (modelStr, model) => modelStr + "," + model.value,
                  ""
                )}
                choices={[
                  {
                    name: "All",
                    value: models.reduce(
                      (modelStr, model) => modelStr + "," + model.value,
                      ""
                    ),
                  },
                  ...organization?.organization_model_presets.map((preset) => {
                    return {
                      name: preset.name,
                      value: preset.preset_models.reduce(
                        (modelStr, model) => modelStr + "," + model,
                        ""
                      ),
                    };
                  }),
                ]}
              /> */}
          </React.Fragment>
        ) : (
          <CopyInput title={apiKey.newKey?.name} value={apiKey.apiKey} />
        )}
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
                <ViewCode apiKey={apiKey.apiKey} name={apiKey.newKey?.name} />
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
  ({ deletingKey, setDeletingKey, deleteKey }, ref) => {
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
  const [showInfo, setShowInfo] = useState(false);
  const [currentKeyName, setCurrentKeyName] = useState(
    editingKey?.name || "New Key"
  );
  const [isRateLimitEnabled, setIsRateLimitEnabled] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(unitOptions[0].value);
  const [isSpendingLimitEnabled, setIsSpendingLimitEnabled] = useState(false);
  useEffect(() => {
    if (editingKey) {
      setCurrentKeyName(editingKey.name);
      const spendingLimit = editingKey?.spending_limit;
      const rateLimit = editingKey?.rate_limit;
      setIsRateLimitEnabled(rateLimit !== null && rateLimit !== undefined);
      setIsSpendingLimitEnabled(
        spendingLimit !== null && spendingLimit !== undefined
      );
    }
  }, [editingKey]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    data.preset_models = checkBoxFieldToList(data.preset_models);
    if (data.preset_models.length === 0) {
      dispatchNotification({
        type: "error",
        title: "Please select at least one model",
      });
      return;
    }
    updateEditingKey({ ...editingKey, ...data });
    setEditingKey(undefined);
  };
  const handleClose = (e: any) => {
    setEditingKey(undefined);
  };

  const handleRateLimitSwitch = (checked) => {
    setIsRateLimitEnabled(checked);
  };

  const handleSpendingLimitSwitch = (checked) => {
    setIsSpendingLimitEnabled(checked);
  };

  return (
    <form
      className={"flex-col gap-sm self-stretch relative"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <React.Fragment>
        <div className="grid gap-sm grid-cols-[1fr,160px]">
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
        <div className="flex items-center content-center gap-xs self-stretch flex-wrap">
          <div className="text-gray-4 text-sm-regular w-full">Models</div>
          {models.map((model, index) => (
            <CheckboxInput
              key={index}
              text={model.name}
              {...register("preset_models")}
              value={model.value}
              checked={editingKey?.preset_models.includes(model.value)}
            />
          ))}
        </div>
        <div className="flex flex-row items-center gap-xxs relative">
          <span className="text-sm-regular text-gray-4">Has rate limit </span>
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
          <SwitchButton
            checked={isRateLimitEnabled}
            onCheckedChange={handleRateLimitSwitch}
            className="absolute -top-[2px]"
          />
        </div>
        {isRateLimitEnabled && (
          <div className="grid gap-sm grid-cols-[1fr,160px]">
            <TextInput
              title={"Rate limit"}
              width={"w-full"}
              {...register("rate_limit")}
              // onKeyDown={handleEnter}
              placeholder={"None"}
              defaultValue={editingKey?.rate_limit}
              type="number"
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
              //This corresponds to the 'Never' option
              choices={unitOptions}
            />
          </div>
        )}
        <div className="flex flex-row items-center gap-xxs relative">
          <span className="text-sm-regular text-gray-4">
            Has spending limit{" "}
          </span>
          <SwitchButton
            onCheckedChange={handleSpendingLimitSwitch}
            checked={isSpendingLimitEnabled}
          />
        </div>
        {isSpendingLimitEnabled && (
          <div className="grid gap-sm grid-cols-1">
            <TextInput
              title={"Spending limit"}
              width={"w-full"}
              {...register("spending_limit", {
                value: editingKey?.spending_limit,
              })}
              // onKeyDown={handleEnter}
              placeholder={"$100"}
              type="number"
              defaultValue={100}
            />
          </div>
        )}
      </React.Fragment>

      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
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
        trigger={<Button variant="r4-black" text="View code" />}
        title="View code"
        subtitle="You can use the following code to start integrating your current prompt and settings into your application."
        width="w-[864px]"
      >
        <CodeViewer
          apikey={apiKey}
          modelName={currentKey?.preset_models || []}
        />
        <p className="text-sm-regular text-gray-4">
          Your API key can be found{" "}
          <a
            onClick={() => navigate("/platform/api/api-keys")}
            className="text-primary cursor-pointer"
          >
            here
          </a>
          . You should use environment variables or a secret management tool to
          expose your key to your applications.
        </p>
      </Modal>
    );
  }
);
