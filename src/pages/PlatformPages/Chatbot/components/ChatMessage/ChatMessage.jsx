import React from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "src/components/Buttons/Button/Button";
import { Copy, Tick, Regenerate, ChatLogo, ChatAvatar } from "./icons";

export default function ChatMessage({ message }) {
  const checkError = (text) => {
    if (text?.length < 7) return false;
    return text?.substring(0, 7) === "Error: ";
  };
  const handleToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleRegenerate = () => {
    throw new Error("Error: Regenerate not implemented");
  };
  return (
    <div
      className={
        `chat-message ` +
        (message && message.role === "user" ? "bg-black" : "bg-gray-2") +
        (message && message.content && checkError(message.content)
          ? " bg-error"
          : "") +
        " flex px-xxxl py-[24px] justify-between align-start"
      }
    >
      <div className={"flex-row justify-center items-start gap-sm self-stretch"}>
        {message?.role === "user" ? <ChatAvatar /> : <ChatLogo />}
        <div>
          {message?.role === "user" ? (
            <p
              className={"text-md"}
              style={{
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {message?.content}
            </p>
          ) : (
            <ReactMarkdown
              children={message?.content}
              components={{
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    style={{ margin: 0 }}
                    className="format-pre"
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    style={{
                      margin: 0,
                      listStyle: "disc",
                      listStylePosition: "inside",
                      whiteSpace: "pre-line",
                    }}
                    className="text-md"
                  />
                ),
              }}
            />
          )}

          {message?.role !== "user" ? (
            <div
              className="flex-row items-center gap-xxs self-stretch"
              style={{ height: "28px", marginTop: "8px" }}
            >
              <Button
                variant="small"
                text="Regenerate"
                icon={Regenerate}
                onClick={() => handleToClipboard(message?.content)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
