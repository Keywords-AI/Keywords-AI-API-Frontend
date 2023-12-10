import React from "react";
import ReactMarkdown from "react-markdown";
import { UtilityButton } from "../UtilityButton/UtilityButton";
import { SmallCopy, CopyConfirm, ChatAvatar, ChatLogo } from "src/assets/svgs";

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
        (message && message.role === "user" ? "bg-white" : "bg-gray2") +
        (message && message.content && checkError(message.content)
          ? " bg-red-light"
          : "")
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
              <UtilityButton
                icon={<SmallCopy />}
                text={"Copy"}
                clickedIcon={<CopyConfirm />}
                clickedText={"Copied"}
                handleClick={() => handleToClipboard(message?.content)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
