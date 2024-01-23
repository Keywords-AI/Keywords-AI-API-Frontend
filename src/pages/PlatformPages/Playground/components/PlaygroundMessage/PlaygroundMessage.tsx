import { ReactElement, useRef, useState } from "react";
import { Copy, EditableBox, EnterKey, ModelIcon, Pencil } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Tag } from "src/components/Misc";

export interface Reponse {
  model: string;
  content: string;
}
export interface PlaygroundMessageProps {
  id: string;
  role: string;
  userContent?: string;
  responses?: Reponse[];
  isActive: boolean;
}

export function PlaygroundMessage({
  id,
  role,
  userContent,
  responses,
  isActive,
}: PlaygroundMessageProps) {
  const textAreaRef = useRef(null);
  let contentSection;
  const [isFocused, setIsFocused] = useState(false);
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const handleSend = async (event) => {
    event.stopPropagation();
    if (streaming || textContent.length < 1) return;
    setIsFocused(false);
    dispatch(streamPlaygroundResponse(messageIndex));
  };
  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };
  if (isUser) {
    contentSection = (
      <>
        <MessageHeader
          title={<div className="text-sm-md text-gray-4">User</div>}
          content={userContent || ""}
        />
        <div className="flex-col px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
          <EditableBox ref={textAreaRef} placeholder={"Enter a message..."} />
          {isFocused && (
            <div className="flex justify-end gap-xxs self-stretch">
              <Button
                variant="small"
                text="Send message"
                icon={EnterKey}
                iconSize="md"
                iconPosition="right"
                onClick={handleSend}
                disabled={false}
                iconHoverFill="fill-gray-5"
              />
            </div>
          )}
        </div>
      </>
    );
  } else if (isAssistant) {
    contentSection = responses?.map((response, index) => (
      <div key={index} className="flex-col items-start gap-xxxs self-stretch">
        <MessageHeader
          title={
            <div className="flex items-center gap-xxs">
              <div className="text-sm-md text-gray-4">Response</div>
              <Tag text={response.model} icon={ModelIcon(response.model)} />
            </div>
          }
          content={response.content || ""}
        />
        <div className="flex px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
          <EditableBox />
        </div>
      </div>
    ));
  }
  return (
    <div
      className="flex-col items-start gap-xxxs self-stretch"
      onClick={() => {
        setIsFocused(true);
      }}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={handleBlur}
    >
      {contentSection}
    </div>
  );
}

const MessageHeader = ({
  title,
  content,
}: {
  title: ReactElement;
  content: string;
}) => {
  return (
    <div className="flex justify-between items-center self-stretch">
      <div className="flex items-center gap-xxs">{title}</div>
      <div className="flex items-center">
        <DotsButton icon={Pencil} />
        <DotsButton
          icon={Copy}
          onClick={() => navigator?.clipboard.writeText(content)}
        />
      </div>
    </div>
  );
};
