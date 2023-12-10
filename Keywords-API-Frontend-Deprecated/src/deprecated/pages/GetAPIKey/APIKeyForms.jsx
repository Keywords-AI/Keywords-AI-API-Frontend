import React, { useEffect } from "react";
import usePost from "src/hooks/usePost";
import { Copy } from "src/assets/svgs.jsx";
import LargeTextTitle from "../../../components/LargeTextTitle/LargeTextTitle";

export const CreateForm = React.forwardRef((props, ref) => {
  const { newKey, newKeyError, postData, setShowForm } = props;
  const [newKeyName, setNewKeyName] = React.useState("");
  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(newKey.api_key);
  };
  useEffect(() => {
    console.log(newKey);
  }, [newKey]);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const keyName = form.keyName;
    setNewKeyName(keyName.value);
    postData({
      name: keyName.value || "New Key",
    });
  };
  return (
    <form
      ref={ref}
      method="POST"
      onSubmit={handleSubmit}
      className="api-key-form"
    >
      <div className="flex-col cross-center g-lg stretch">
        <LargeTextTitle
          title={newKey ? "Save your API Key" : "Create New API Key"}
          subtitle={newKey ? "Please save this key somewhere safe and accessible. For security reasons, you won’t be able to view it again through your account. If you lose this secret key, you’ll need to generate a new one." : ""}
        />
        <div className="input-ctrl">
          <label className="text-md t-gray4" htmlFor="keyName">
            {newKey ? newKeyName : "Name (optional)"}
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
            />
          ) : (
            <div className="action-group">
              <input
                className="text-md"
                style={{
                  color: "var(--black)",
                }}
                readOnly
                value={newKey.api_key}
                id="keyName"
                name="keyName"
                type="text"
                placeholder="Key-1"
              />
              <button
                onClick={copyToClipboard}
                className="button-primary"
                style={{
                  height: "43px",
                  width: "43px",
                }}
              >
                <Copy />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="action-group">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowForm(false);
            setNewKeyName("");
            console.log("cancel");
          }}
          className={newKey ? "button-primary" : "button-tertiary-white"}
        >
          {newKey ? "Done" : "Cancel"}
        </button>
        {!newKey && (
          <button type="submit" className="button-primary">
            Create
          </button>
        )}
      </div>
    </form>
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
      className="api-key-form"
    >
      <div className="flex-col cross-start g-sm stretch t-l">
        <div className="display-sm">{"Revoke API Key"}</div>
        <div className="text-lg">
          This API key will be immediately revoked and disabled. API requests
          made made using this key will be rejected. Once revoked, you will no
          longer be able to view or modify this API key.
        </div>
      </div>
      <div className="flex-col cross-center g-sm stretch">
        <div className="text-md t-gray4"></div>
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
      <div className="action-group">
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
        }
        return key; // return the original object if no modification is needed
      })
    );
  };
  return (
    <form
      ref={ref}
      method="POST"
      onSubmit={handleSubmit}
      className="api-key-form"
    >
      <div className="flex-col cross-start g-sm stretch">
        <div className="display-sm">{"Rename API Key"}</div>
        <div className="input-ctrl">
          <label className="text-md t-gray4" htmlFor="keyName">
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
      </div>
      <div className="action-group">
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {editKeyError && <div className="error">{editKeyError}</div>}
      </div>
    </form>
  );
});
