import React, { useEffect, useRef } from "react";
import { Terminate, Send } from "src/components/Icons";
import { EditableBox } from "src/components/Inputs";
import { Button, IconButton } from "src/components/Buttons";
import { set, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { sendMessage } from "src/store/actions";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { abortStreamingTextRequest } from "src/store/actions";

export default function KeywordsInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const streamingText = useTypedSelector(
    (state) => state.streamingText[0].streamingText
  );
  const streaming = useTypedSelector(
    (state) => state.streamingText[0].isLoading
  );
  const editmessage = useTypedSelector((state) => state.chatbot.editMessage);
  const systemPrompt = useTypedSelector((state) => state.chatbot.customPrompt);
  const dispatch = useTypedDispatch();
  const [inputValue, setInputValue] = React.useState("");
  const onKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };
  const onSubmit = async (data) => {
    if (!streaming && editmessage == null) {
      dispatch(sendMessage(data.message));
      setInputValue("");
    }
  };
  useEffect(() => {
    errors && Object.keys(errors).length !== 0 && console.log(errors);
  }, [errors]);

  return (
    <form
      className="relative flex-col w-full shadow-border rounded-sm bg-gray-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EditableBox
        {...register("message", {
          required: "This is required",
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(e.target.value),
        })}
        value={inputValue}
        className={
          "rounded-sm text-sm py-xxs px-xs " +
          (streaming ? "text-gray-3 bg-gray-2" : "bg-gray-1 ")
        }
        borderless={false}
        placeholder={streaming ? "Generating..." : "Send a message..."}
        onKeyDown={onKeyDown}
      />
      {streaming ? (
        <IconButton
          icon={Terminate}
          onClick={() => {
            dispatch(abortStreamingTextRequest());
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      ) : (
        <Button
          icon={Send}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      )}
    </form>
  );
}
