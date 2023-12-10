import React, { useEffect } from "react";
import "./style.css";
import { CheckBox, FileUpload } from "src/assets/svgs";
import { updateSystemPrompt } from "src/store/actions/userAction";
import { connect } from "react-redux";
import FileCard from "./FileCard";
import { loadingFileUpload } from "src/store/actions/userAction";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  updateSystemPrompt,
  loadingFileUpload,
};

const hasValidFile = (user) => {
  return user?.current_file && user?.current_file !== "-";
};

function Popup({ closePopup, updateSystemPrompt, user, loadingFileUpload }) {
  const cardRef = React.useRef(null);
  const handelClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cardRef.current?.contains(e.target)) {
      if (!lastClicked) closePopup();
      setLastClicked(false);
    }
  };
  const [sysPromptSubmit, setSysPromptSubmit] = React.useState({
    role: "system",
    content: "place_holder",
  });
  const [checked, setChecked] = React.useState(false);
  const textAreaRef = React.useRef(null);
  const [lastClicked, setLastClicked] = React.useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    loadingFileUpload();
    if (formRef.current) {
      const formData = new FormData();
      formData.append("system_prompt_active", checked);
      formData.append("system_prompt", JSON.stringify(sysPromptSubmit));
      if (file) {
        formData.append("uploaded_file", file);
      }
      updateSystemPrompt(formData);
    }
    closePopup();
  };

  useEffect(() => {
    if (user) {
      const { system_prompt_active, system_prompt } = user;
      setSysPromptSubmit(system_prompt);
      setChecked(system_prompt_active);
      console.log(system_prompt.content);
      console.log("text area", textAreaRef.current);
      if (textAreaRef.current) {
        textAreaRef.current.value = system_prompt?.content;
      }
    }
  }, [user]);

  const fileUploadRef = React.useRef(null);
  const formRef = React.useRef(null);
  const [file, setFile] = React.useState(null);

  return (
    <div className="backdrop" onMouseUp={handelClose}>
      <form ref={formRef}>
        <div
        className="modal-card bg-white"
          ref={cardRef}
          onMouseDown={() => {
            setLastClicked(true);
          }}
        >
          <div className="display-xs">Custom Prompt</div>
          <div className="flex-col justify-start items-start self-stretch gap-xxs">
            <input
              type="file"
              name="uploaded_file"
              hidden
              accept=".pdf,.doc,.docx,.txt"
              ref={fileUploadRef}
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
              }}
            />
            <div className="flex-col justify-start items-start self-stretch gap-xxs">
              <div className="text-sm text-gray4">System Prompt</div>
              <textarea
                ref={textAreaRef}
                style={{
                  resize: "none",
                }}
                onChange={(e) => {
                  setSysPromptSubmit({
                    role: "system",
                    content: e.target.value,
                  });
                }}
                name="system_prompt"
                className="text-sm bg-white"
                id=""
              ></textarea>
              <input
                type="file"
                name="uploaded_file"
                hidden
                accept=".pdf,.doc,.docx,.txt"
                ref={fileUploadRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log(file);

                  setFile(file);
                }}
              />
              <div className="flex-col justify-start items-start self-stretch gap-xxs">
                <div className="text-sm text-gray4">
                  {hasValidFile(user) ? "File Upload (Beta)" : "Current File"}
                </div>
                <div
                  onClick={() => {
                    fileUploadRef.current.click();
                  }}
                >
                  <FileUpload />
                </div>
              </div>
            </div>
            {file && (
              <>
                <FileCard
                  fileName={file.name}
                  fileType={file.name.split(".")[1]?.toUpperCase()}
                />
              </>
            )}
            {hasValidFile(user) && (
              <>
                <FileCard
                  fileName={user?.current_file}
                  fileType={user?.current_file.split(".")[1]?.toUpperCase()}
                />
              </>
            )}
          </div>
          <div className="flex-row self-stretch flex-1   space-between items-center">
            <div className="flex-row justify-center items-center gap-xs self-stretch">
              <CheckBox onChecked={setChecked} checked={checked} />
              <div className="text-sm">{"Enable for new chats"}</div>
            </div>
            <div className="flex-row justify-center items-center gap-xs self-stretch buttons-container">
              <button
                className="button-tertiary-white"
                onClick={() => {
                  closePopup();
                }}
              >
                Cancel
              </button>
              <button
                className="button-primary"
                type="submit"
                onClick={handelSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
