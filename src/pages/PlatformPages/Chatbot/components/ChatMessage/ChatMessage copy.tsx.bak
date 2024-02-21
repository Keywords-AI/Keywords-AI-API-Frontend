import React, { useState } from "react";
import { Button } from "src/components/Buttons/Button/Button";
import { ChatbotReactMarkdown } from "src/components/Misc";
import cn from "src/utilities/classMerge";
import { DotsButton } from "src/components/Buttons";
import { Check, Copy, Logo, Regenerate, User } from "src/components/Icons";
import { regenerateChatbotResponse } from "src/store/actions";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export default function ChatMessage({ message, index }) {
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
    setTimeout(()=>{ setCopied(false)}, 3000);
  };
  const handleRegenerate = () => {
    dispatch(regenerateChatbotResponse())
  };
  return (
    <div
      className={
        cn(`chat-message `,
        (message && message.role === "user" ? "bg-gray-1" : "bg-gray-2"),
        (message && message.content && checkError(message.content)
          ? " bg-error"
          : ""),
        " flex px-xxxl py-[24px] justify-between align-start w-[calc(100vw-280px)]",
        )
      }
    >
      <div className={"flex-row justify-center items-start gap-sm self-stretch"}>
        {message?.role === "user" ? <User /> : <Logo />}
        <div>
            <ChatbotReactMarkdown content={message?.content} /> 
            <div
              className="flex-row items-center gap-xxs self-stretch mt-xs"
              >
              {message?.role !== "user" && conversation.messages.length === index + 1 ? (
              <Button
                variant="small"
                text="Regenerate"
                icon={Regenerate}
                onClick={handleRegenerate}
              />
              ) : null}
              <Button variant="small" padding="px-xxs py-xxs" 
              onClick={()=>handleToClipboard(message.content)} iconSize="sm" 
              bgColor="bg-gray-2" icon={copied? Check:Copy}/>
              </div>
        </div>
      </div>
    </div>
  );
}
