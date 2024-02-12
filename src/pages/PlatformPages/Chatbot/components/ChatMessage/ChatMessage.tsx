import React, { useRef, useState } from "react";
import { Button } from "src/components/Buttons/Button/Button";
import { ChatbotReactMarkdown, ModelTag } from "src/components/Misc";
import cn from "src/utilities/classMerge";
import { DotsButton } from "src/components/Buttons";
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
  setMessageContent,
} from "src/store/actions";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export default function ChatMessage({ message, index }) {
  const isStreaming = useTypedSelector(
    (state) => state.streamingText[0].isLoading
  );
  const dispatch = useTypedDispatch();
  const conversation = useTypedSelector((state) => state.chatbot.conversation);
  const checkError = (text) => {
    if (text?.length < 7) return false;
    return text?.substring(0, 7) === "Error: ";
  };
  const [copied, setCopied] = useState(false);
  const handleToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleRegenerate = () => {
    if (isStreaming) return;
    dispatch(regenerateChatbotResponse());
  };
  const [edit, setEdit] = useState(false);
  const isUser = message?.role === "user";
  const editRef = useRef<HTMLDivElement>(null);
  const handleChangeMessage = () => {
    if (editRef && editRef.current) {
      const text = editRef.current.innerText;
      dispatch(setMessageContent(message.id, text));
    }
  };
  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChangeMessage();
      setEdit(false);
    }
  };

  const handleEditBoxBlur = () => {
    handleChangeMessage();
    setEdit(false);
  };

  if (isUser) {
    return (
      <div className="flex items-start gap-sm self-stretch">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center">
          <User />
        </div>
        <div className="flex-col items-start gap-xxs flex-1 ">
          <div
            onKeyDown={handleEnterKey}
            onBlur={handleEditBoxBlur} // Add onBlur event handler
            className="text-sm-regular text-gray-5 outline-none"
            contentEditable={edit}
            suppressContentEditableWarning
            ref={editRef}
          >
            {message.content}
          </div>
          <div className="flex items-center gap-xxxs">
            <DotsButton
              icon={Pencil}
              iconSize="sm"
              onClick={() => setEdit(true)}
            />
            <DotsButton
              icon={Copy}
              onClick={() => handleToClipboard(message.content)}
              iconSize="sm"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start gap-sm self-stretch">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center">
          <Logo />
        </div>
        <div className="flex-col items-start gap-xxs flex-1">
          <div className="text-sm-regular text-gray-5">
            <ChatbotReactMarkdown content={message?.content} />
          </div>
          <div className="flex items-center gap-xxxs">
            <ModelTag model={message.model || "gpt-4"} />
            {conversation.messages.length === index + 1 && (
              <DotsButton
                icon={Refresh}
                iconSize="sm"
                onClick={() => handleRegenerate()}
              />
            )}
            <DotsButton
              icon={Copy}
              iconSize="sm"
              onClick={() => handleToClipboard(message.content)}
            />
            <DotsButton icon={Search} iconSize="sm" />
          </div>
        </div>
      </div>
    );
  }
}
