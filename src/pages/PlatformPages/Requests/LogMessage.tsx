import React from "react";
import { useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { json } from "stream/consumers";

type Props = {
  MessageContent: any;
};

export default function LogMessage({ MessageContent }: Props) {
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);
  if (typeof MessageContent === "string") {
    return jsonMode ? (
      <p className="break-words max-w-full text-wrap text-gray-4 text-sm-regular font-roboto-mono whitespace-pre-wrap">
        {MessageContent}
      </p>
    ) : (
      <p className={cn("w-full", "overflow-auto break-words")}>
        {MessageContent}
      </p>
    );
  } else if (Array.isArray(MessageContent)) {
    return (
      <div>
        {MessageContent.map((content, index) => {
          if (content.type && content.type == "text") {
            return (
              <p key={index} className="break-words overflow-auto">
                {content.text}{" "}
              </p>
            );
          } else if (
            content.type &&
            content.type == "image_url" &&
            content.image_url.url
          ) {
            return (
              <img
                key={index}
                src={content.image_url.url}
                className="w-full h-full"
              />
            );
          }
        })}
      </div>
    );
  }
}
