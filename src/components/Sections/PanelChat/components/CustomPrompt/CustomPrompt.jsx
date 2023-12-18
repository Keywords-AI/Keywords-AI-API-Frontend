import React, { useEffect } from "react";
import "./style.css";
import { updateSystemPrompt } from "src/store/actions/authAction";
import { connect } from "react-redux";
import { loadingFileUpload } from "src/store/actions/authAction";
import { Button } from "src/components";
import { FileInput, RadioInput } from "src/components/Inputs";
import { setIsEditing } from "src/store/actions";
import { useForm } from "react-hook-form";

const mapStateToProps = (state) => {
  return {
    chatbot: state.chatbot,
  };
};
const mapDispatchToProps = {
  updateSystemPrompt,
  loadingFileUpload,
  setIsEditing,
};

function CustomPrompt({
  chatbot,
  setIsEditing,
  user,
}) {
  const [checked, setChecked] = React.useState(false);
  const [systemPrompt, setSystemPrompt] = React.useState(chatbot.systemPrompt || "");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (user) {
      const { system_prompt_active, system_prompt } = user;
      setSysPromptSubmit(system_prompt);
      setChecked(system_prompt_active);
      console.log(system_prompt?.content);
    }
  }, [user]);
  
  const [file, setFile] = React.useState(null);

  const handelChange = (e) => {
    setSystemPrompt(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex-col self-stretch gap-sm"}
    >
      <div className="flex-col justify-start items-start self-stretch gap-xxs">
        <div className="flex-col justify-start items-start self-stretch gap-xxs">
          <div className="text-sm-md text-gray-4">System Prompt</div>
          <textarea
            {...register("system_prompt", { value: systemPrompt || "", onChange: handelChange })}
            name="system_prompt"
            className="text-sm bg-black border border-solid border-gray-3 rounded-sm text-gray-white resize-none"
          ></textarea>
        </div>
        <FileInput
          register={register}
          title="File Upload (Beta)"
          initialFile={file}
          onFileChange={(file) => {
            setFile(file);
          }}
        />
      </div>
      <div className="flex-row self-stretch flex-1 justify-between items-center">
        <RadioInput
          {...register("enable_prompt", {value: chatbot.propmptEnabled || false, onChange: () => {}})}
          text="Enable for new chats"
        />
        <div className="flex-row justify-center items-center gap-xs self-stretch">
          <Button
            variant="r4-gray-2"
            type="submit"
            text="Cancel"
            onClick={() => setIsEditing(false)}
          />
          <Button
            variant="r4-primary"
            type="submit"
            text="Save"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </div>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPrompt);
