import React from "react";
import { Button } from "src/components/Buttons/Button/Button";
import { Copy, Tick, Regenerate, ChatLogo, ChatAvatar } from "./icons";
import { ChatbotReactMarkdown } from "src/components/Misc";
import cn from "src/utilities/classMerge";

export default function ChatMessage({ message }) {
  const checkError = (text) => {
    if (text?.length < 7) return false;
    return text?.substring(0, 7) === "Error: ";
  };
  const handleToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleRegenerate = (text) => {
    regenerateChatbotResponsene()
  };
  return (
    <div
      className={
        cn(`chat-message `,
        (message && message.role === "user" ? "bg-gray-1" : "bg-gray-2"),
        (message && message.content && checkError(message.content)
          ? " bg-error"
          : ""),
        " flex px-xxxl py-[24px] justify-between align-start",
        )
      }
    >
      <div className={"flex-row justify-center items-start gap-sm self-stretch"}>
        {message?.role === "user" ? <ChatAvatar /> : <ChatLogo />}
        <div>
          
            <ChatbotReactMarkdown content={message?.content} /> 

          {message?.role !== "user" ? (
            <div
              className="flex-row items-center gap-xxs self-stretch"
              style={{ height: "28px", marginTop: "8px" }}
            >
              <Button
                variant="small"
                text="Regenerate"
                icon={Regenerate}
                onClick={() => handleRegenerate(message?.content)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
