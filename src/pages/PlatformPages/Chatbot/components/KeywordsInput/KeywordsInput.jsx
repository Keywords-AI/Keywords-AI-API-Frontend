import React, { useEffect } from "react";
import { Terminate, Send } from "src/components/Icons";
import { EditableBox } from "src/components/Inputs";
import { DotsButton, IconButton } from "src/components/Buttons";
import { set, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { sendMessage } from "src/store/actions";
import { abortStreamingTextRequest } from "src/store/actions";
import cn from "src/utilities/classMerge";

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
  sendMessage,
  abortStreamingTextRequest,
  streaming,
  handleSend = () => {},
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [inputValue, setInputValue] = React.useState("");

  // const onChange = (e) => {

  // }
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };
  const onSubmit = async (data) => {
    sendMessage(data.message);
    setInputValue("");
  };

  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <form
      className="relative flex-col w-full shadow-border rounded-sm bg-gray-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EditableBox
        {...register("message", { required: "This is required" })}
        className={
          "rounded-sm text-sm py-xxs px-xs " +
          (streaming ? "text-gray-3 bg-gray-2" : "bg-gray-1 ")
        }
        borderless={false}
        placeholder={streaming ? "Generating..." : "Send a message..."}
        onKeyDown={onKeyDown}
        value={streaming ? "Generating..." : ""}
        // onChange={(e) => setInputValue(e.target.value)}
      />
      {streaming ? (
        <IconButton
          icon={Terminate}
          onClick={() => {
            abortStreamingTextRequest();
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      ) : (
        <button>
          <IconButton
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            icon={Send}
            className="absolute right-xs bottom-[11px] cursor-pointer"
          />
        </button>
      )}
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordsInput);
