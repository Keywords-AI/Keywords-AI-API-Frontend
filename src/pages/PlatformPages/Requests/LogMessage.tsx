import React from "react";
import { useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";

type Props = {
  MessageContent: any;
};

export default function LogMessage({ MessageContent }: Props) {
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);
  if (typeof MessageContent === "string") {
    return (
      <p
        className={cn(
          "w-full",
          jsonMode ? "whitespace-pre break-all" : "overflow-auto break-words"
        )}
      >
        {MessageContent}{" "}
      </p>
    );
  } else if (Array.isArray(MessageContent)) {
    return (
      <div>
        {MessageContent.map((content, index) => {
          if (content.type && content.type == "text") {
            return <p className="break-words overflow-auto">{content.text} </p>;
          } else if (
            content.type &&
            content.type == "image_url" &&
            content.image_url.url
          ) {
            return (
              <img src={content.image_url.url} className="w-full h-full" />
            );
          }
        })}
      </div>
    );
  }
}
