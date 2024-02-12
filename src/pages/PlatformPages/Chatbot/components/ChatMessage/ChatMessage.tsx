import React, { useState } from "react";
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
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleRegenerate = () => {
    dispatch(regenerateChatbotResponse());
  };

  const isUser = message?.role === "user";
  if (isUser) {
    return (
      <div className="flex items-start gap-sm self-stretch">
        <div className="flex-col w-[36px] h-[36px] justify-center items-center">
          <User />
        </div>
        <div className="flex-col items-start gap-xxs flex-1">
          <div className="text-sm-regular text-gray-5">{message.content}</div>
          <div className="flex items-center gap-xxxs">
            <DotsButton icon={Pencil} iconSize="sm" />
            <DotsButton icon={Copy} iconSize="sm" />
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
          <div className="text-sm-regular text-gray-5">{message.content}</div>
          <div className="flex items-center gap-xxxs">
            <ModelTag model={message.model || "gpt-4"} />
            <DotsButton icon={Refresh} iconSize="sm" />
            <DotsButton icon={Copy} iconSize="sm" />
            <DotsButton icon={Search} iconSize="sm" />
          </div>
        </div>
      </div>
    );
  }
}
