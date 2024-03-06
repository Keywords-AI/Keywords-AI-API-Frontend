import React, { useEffect, useRef, useState } from "react";
import { Button } from "src/components/Buttons/Button/Button";
import { ChatbotReactMarkdown, ModelTag } from "src/components/Misc";
import cn from "src/utilities/classMerge";
import { CopyButton, DotsButton } from "src/components/Buttons";
import {
  Check,
  Copy,
  Logo,
  Pencil,
  Refresh,
  Regenerate,
  Search,
  User,
} from "src/components/Icons";
import {
  regenerateChatbotResponse,
  setEditMessage,
  setIsEditing,
  setMessageContent,
} from "src/store/actions";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export default function ChatMessage({
  message,
  index,
  streamingMessage = false,
}) {
  if (message.role === "error") {
    return (
      <div className="flex items-start gap-sm self-stretch">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center">
          <Logo />
        </div>
        <div className="flex-col items-start gap-xxs flex-1">
          <div className="text-sm-regular text-red">{message?.content}</div>
          <div className="flex items-center gap-xxxs">
            <ModelTag model={message.model || "gpt-4"} />

            <DotsButton
              icon={Refresh}
              iconSize="sm"
              onClick={() => handleRegenerate()}
            />

            <DotsButton icon={Copy} iconSize="sm" />
            <DotsButton icon={Search} iconSize="sm" />
          </div>
        </div>
      </div>
    );
  }
  const isStreaming = useTypedSelector(
    (state) => state.streamingText[0].isLoading
  );
  const dispatch = useTypedDispatch();
  const conversation = useTypedSelector((state) => state.chatbot.conversation);
  const checkError = (text) => {
    if (text?.length < 7) return false;
    return text?.substring(0, 7) === "Error: ";
  };
  const editmessage = useTypedSelector((state) => state.chatbot.editMessage);
  const handleRegenerate = () => {
    if (isStreaming) return;
    dispatch(regenerateChatbotResponse());
  };
  const isUser = message?.role === "user";
  const editRef = useRef<HTMLDivElement>(null);
  const handleChangeMessage = () => {
    if (editRef && editRef.current) {
      const text = editRef.current.innerText;
      dispatch(setMessageContent(index, text));
    }
  };
  const handleEnterKey = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      dispatch(setEditMessage(null));
      handleChangeMessage();
    }
  };
  useEffect(() => {
    if (!editRef.current || editmessage != message.id) return;
    editRef.current?.focus();
    const range = document.createRange();
    range.selectNodeContents(editRef.current);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [editmessage]);

  const handleEditBoxBlur = () => {
    handleChangeMessage();
  };

  if (isUser) {
    return (
      <div className="flex items-start gap-sm w-full">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center overflow-hidden shrink-0">
          <User />
        </div>
        <div className="flex-col items-start gap-xxs w-full h-full  ">
          <div
            onKeyDown={handleEnterKey}
            onBlur={handleEditBoxBlur} // Add onBlur event handler
            className={cn(
              "text-sm-regular text-gray-5 outline-none break-words text-wrap min-h-[20px] whitespace-pre-wrap rounded-sm",
              editmessage == index && "bg-gray-2"
            )}
            style={{ width: "calc(100% - 52px)" }}
            contentEditable={editmessage == index}
            suppressContentEditableWarning
            ref={editRef}
          >
            {message.content || "\u200B"}
          </div>
          <div className="flex items-center ">
            <DotsButton
              icon={Pencil}
              iconSize="sm"
              active={editmessage == index}
              onClick={() => {
                if (
                  isStreaming ||
                  (editmessage != null && editmessage != index)
                )
                  return;
                if (editmessage == index) {
                  dispatch(setEditMessage(null));
                } else {
                  console.log("Setting edit message", index);
                  dispatch(setEditMessage(index));
                }
              }}
            />

            <CopyButton text={message.content} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start gap-sm w-full">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center shrink-0">
          <Logo />
        </div>
        <div className="flex-col items-start gap-xxs flex-1 w-full h-full">
          <div className="text-sm-regular text-gray-5 whitespace-pre-wrap rounded-sm">
            <ChatbotReactMarkdown
              content={
                isStreaming && index === -1 && message.content === "\u200B"
                  ? "Generating..."
                  : message?.content
              }
            />
          </div>
          <div className="flex items-center gap-xxxs">
            {message.model && <ModelTag model={message.model || "gpt-4"} />}
            <div className="flex items-center">
              {conversation.messages.length === index + 1 && (
                <DotsButton
                  disabled={isStreaming || editmessage != null}
                  icon={Refresh}
                  iconSize="sm"
                  onClick={() => handleRegenerate()}
                />
              )}

              <CopyButton text={message.content} />
              {/* <DotsButton icon={Search} iconSize="sm" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
