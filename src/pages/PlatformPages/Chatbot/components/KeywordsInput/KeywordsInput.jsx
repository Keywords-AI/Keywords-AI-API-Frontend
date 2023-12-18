import React, { useEffect } from "react";
import { Terminate, Send } from "src/components/Icons";
import { EditableBox } from "src/components/Inputs";
import { IconButton } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { sendMessage } from "src/store/actions";
import { abortStreamingTextRequest } from "src/store/actions";

const mapStateToProps = (state) => {
  return {
    systemPrompt: state.chatbot.customPrompt,
    streaming: state.streamingText.isLoading,
    messages: state.chatbot.conversation.messages,
  };
};

const mapDispatchToProps = {
  sendMessage,
  abortStreamingTextRequest,
};

function KeywordsInput({
  placeholder,
  sendMessage,
  abortStreamingTextRequest,
  value,
  streaming,
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

  const [isHovered, setIsHovered] = React.useState(false);
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
            abortStreamingTextRequest();
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      ) : (
        <IconButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
          icon={<Send active={isHovered}/>}
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