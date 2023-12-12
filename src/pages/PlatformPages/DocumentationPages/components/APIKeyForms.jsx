import React, { useEffect } from "react";
import usePost from "src/hooks/usePost";
import { Copy, Copied } from "src/assets/svgs.jsx";
import KeywordsSelection from "src/components/KeywordsSelection/KeywordsSelection";
import { retrieveContext, retrievePlanName } from "src/utilities/utilities.js";
import TitledInput from "../../../components/Inputs/TitledInput";
import { KeywordsInputWrapper } from "../../../components/KeywordsInputWrapper/KeywordsInputWrapper";

export const CreateForm = React.forwardRef((props, ref) => {
  const { newKey, newKeyError, postData, setShowForm, setKeyList, user } =
    props;
  const [newKeyName, setNewKeyName] = React.useState("");
  const [newKeyContext, setNewKeyContext] = React.useState("");
  const [copySuccess, setCopySuccess] = React.useState(false);
  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(newKey.api_key);
    setCopySuccess(true);
  };
  const newKeyNameRef = React.useRef(null);
  const keyContextRef = React.useRef(null);
  const handleSelection = React.useCallback(
    (selected) => {
      keyContextRef.current = selected.text;
    },
    [newKeyContext]
  );

  useEffect(() => {
    console.log(newKey);
  }, [newKey]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const plan_name = retrievePlanName(keyContextRef.current);
    console.log(plan_name, "plan name");
    console.log(newKeyNameRef.current, "key context");
    postData({
      name: newKeyNameRef.current || "New Key",
      plan_name: plan_name,
    });
  };
  useEffect(() => {
    if (copySuccess)
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
  }, [copySuccess]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      postData({
        name: newKeyNameRef.current || "New Key",
      });
    }
  };

  const activePlansToChoices = (
    activePlans,
    customBundle,
    customSubscription,
    defaultPlan = "flex_8k"
  ) => {
    const choices = [];
    // Extract choices from activePlans
    for (const key in activePlans) {
      if (key !== "custom") {
        choices.push({ text: retrieveContext(key) });
      }
    }

    // Helper function to add custom plan items to choices
    const addCustomPlanToChoices = (customPlan) => {
      if (customPlan?.items) {
        for (const itemKey in customPlan.items) {
          if (
            !choices.some((choice) => choice.text === retrieveContext(itemKey))
          ) {
            choices.push({ text: retrieveContext(itemKey) });
          }
        }
      }
    };

    // Add choices from customBundle and customSubscription
    addCustomPlanToChoices(customBundle);
    addCustomPlanToChoices(customSubscription);

    console.log(choices, "choices");
    return choices;
  };

  const [planChoices, setPlanChoices] = React.useState([]);

  useEffect(() => {
    if (user?.organization?.owner?.user_subscription) {
      setPlanChoices(
        activePlansToChoices(
          user?.organization?.owner?.user_subscription?.subscription_ids?.items,
          user?.custom_bundle,
          user?.custom_subscription
        )
      );
    }
  }, [user]);

  return (
    <div ref={ref} className="modal-card bg-white">
      <div className="flex-col items-start gap-sm self-stretch">
        <div className="display-xs">
          {newKey ? "Save your API Key" : "Create New API Key"}
        </div>
        {newKey && (
          <div className="text-lg">
            {
              "Please save this key somewhere safe and accessible. For security reasons, you won’t be able to view it again through your account. If you lose this secret key, you’ll need to generate a new one."
            }
          </div>
        )}
      </div>
      <div className="flex-row self-stretch gap-xs items-center justify-center">
        <div className="flex-col gap-xxs self-stretch flex-1  ">
          <label className="text-sm text-gray4" htmlFor="keyName">
            {newKey ? newKeyNameRef.current : "Name (optional)"}
          </label>
          {!newKey ? (
            <input
              style={{
                color: "var(--black)",
              }}
              className="text-md"
              id="keyName"
              name="keyName"
              type="text"
              placeholder="Key-1"
              onKeyDown={handleEnter}
              onChange={(e) => {
                newKeyNameRef.current = e.target.value;
              }}
            />
          ) : (
            <div
              className="flex-col"
              style={{
                position: "relative",
              }}
            >
              <input
                className="text-md"
                style={{
                  color: "var(--black)",
                }}
                readOnly
                value={newKey?.api_key}
                id="keyName"
                name="keyName"
                type="text"
                placeholder="Key-1"
              />
              <div
                className="flex-col"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={copyToClipboard}
              >
                {!copySuccess ? (
                  <Copy fill={"var(--gray4)"} hoverFill={"var(--black)"} />
                ) : (
                  <Copied />
                )}
              </div>
            </div>
          )}
        </div>
        {!newKey && (
          <div
            className="flex-col gap-xxs self-stretch"
            style={{
              width: "160px",
            }}
          >
            <KeywordsInputWrapper title={"Context Window"}>
              <KeywordsSelection
                choices={planChoices}
                placeholder={
                  planChoices?.length > 0 ? planChoices[0].text : "8K"
                }
                handleSelected={handleSelection}
              />
            </KeywordsInputWrapper>
          </div>
        )}
      </div>
      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowForm(false);
              newKeyNameRef.current = "";
              console.log("cancel");
            }}
            className={newKey ? "button-primary" : "button-tertiary-white"}
            type="button"
          >
            {newKey ? "Done" : "Cancel"}
          </button>
          {!newKey && (
            <button
              type="button"
              onClick={handleSubmit}
              className="button-primary"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export const DeleteForm = React.forwardRef((props, ref) => {
  const { postData, setKeyList, deleteList, keyList, setShowForm } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const keyName = form.keyName;
    postData({
      name: keyName.value || "New Key",
    });
  };
  return (
    <form
      ref={ref}
      method="POST"
      onSubmit={handleSubmit}
      className="modal-card bg-white"
    >
      <div className="flex-col items-start gap-sm self-stretch t-l">
        <div className="display-xs">{"Revoke API Key"}</div>
        <div className="text-md">
          This API key will be immediately revoked and disabled. API requests
          made made using this key will be rejected. Once revoked, you will no
          longer be able to view or modify this API key.
        </div>
      </div>
      <div className="flex-col start gap-xs self-stretch">
        <div className="text-sm text-gray4">{keyList[0]?.name}</div>
        <input
          className="text-md"
          style={{
            color: "var(--black)",
          }}
          readOnly
          value={keyList[0]?.prefix + "*".repeat(15)}
          id="keyName"
          name="keyName"
          type="text"
          placeholder="Key-1"
        />
      </div>
      <div className="flex-row self-stretch justify-end">
        <div className="flex-row gap-xs items-start">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowForm(false);
              console.log("cancel");
            }}
            className="button-tertiary-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={"button-primary bg-error"}
            onClick={(e) => {
              e.preventDefault();
              setKeyList(keyList.filter((key) => !deleteList.includes(key.id)));
              postData({
                keys: deleteList,
              });
              setShowForm(false);
            }}
          >
            Revoke Key
          </button>
        </div>
      </div>
    </form>
  );
});

export const EditForm = React.forwardRef((props, ref) => {
  // updates the name of the key
  const { setKeyList, keyList, setShowForm, editKey: key } = props;
  const {
    loading: editLoading,
    error: editKeyError,
    data: editKey,
    postData,
  } = usePost(`api/update-key/${key.id}/`, "PATCH");
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const keyName = form.keyName.value || "New Key";
    console.log(key);
    postData({
      name: keyName,
    });
    setShowForm(false);
    setKeyList((prevKeyList) =>
      prevKeyList.map((prevKey) => {
        if (prevKey.id === key.id) {
          return { ...prevKey, name: keyName }; // return new object with updated keyName
        } else {
          return prevKey; // return the original object if no modification is needed
        }
      })
    );
  };
  return (
    <form
      ref={ref}
      method="POST"
      onSubmit={handleSubmit}
      className="modal-card bg-white"
    >
      <div className="display-xs">{"Rename API Key"}</div>
      <div className="flex-col gap-xxs self-stretch">
        <label className="text-sm text-gray4" htmlFor="keyName">
          {"Name (optional)"}
        </label>
        <input
          className="text-md"
          style={{
            color: "var(--black)",
          }}
          id="keyName"
          name="keyName"
          type="text"
          placeholder="Key-1"
        />
      </div>

      <div className="flex-row justify-end self-stretch">
        <div className="flex-row gap-xs items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowForm(false);
            }}
            className="button-tertiary-white"
          >
            Cancel
          </button>
          <button type="submit" className="button-primary">
            Rename
          </button>
        </div>
      </div>
      {editKeyError && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="error">{editKeyError}</div>
        </div>
      )}
    </form>
  );
});
