import React, { useEffect } from "react";
import { Terminate, Send } from "src/components/Icons";
import { EditableBox } from "src/components/Inputs";
import { IconButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { sendMessage } from "src/store/actions";
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import store from "src/store/store";

const mapStateToProps = (state) => {
  return {
    systemPrompt: state.chatbot.customPrompt,
    streaming: state.streamingText.isLoading,
    messages: state.chatbot.conversation.messages,
  };
};

const mapDispatchToProps = {
  sendMessage,
};

function KeywordsInput({
  placeholder,
  handleStop,
  sendMessage = () => { },
  value,
  streaming,
  systemPrompt,
  messages,
}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };
  const onSubmit = async (data) => {
    sendMessage(data.message);
  };

  return (
    <form className="relative flex-col w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EditableBox
        {...register("message", { required: "This is required" })}
        className={"rounded-sm text-sm p-xxs " + (streaming ? "text-gray-3 bg-gray-2" : "bg-gray-black ")}
        borderless={false}
        placeholder={placeholder}
        text={streaming ? "Generating" : value}
        onKeyDown={onKeyDown}
      />
      {streaming ? (
        <IconButton
          icon={<Terminate />}
          onClick={() => {
            handleStop();
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      ) : (
        <IconButton
          icon={<Send />}
          onClick={() => {
            handleSend(spanRef.current);
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      )}
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsInput);