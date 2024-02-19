import React from "react";

type Props = {
  MessageContent: any;
};

export default function LogMessage({ MessageContent }: Props) {
  if (typeof MessageContent === "string") {
    return <p className="break-words overflow-auto">{MessageContent} </p>;
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
