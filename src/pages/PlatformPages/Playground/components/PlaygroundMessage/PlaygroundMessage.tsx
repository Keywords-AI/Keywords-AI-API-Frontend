import React, { ReactElement, useRef, useState } from "react";
import Markdown from "react-markdown";
import {
  Copy,
  EditableBox,
  EnterKey,
  ModelIcon,
  OpenAI,
  Pencil,
} from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Tag } from "src/components/Misc";
import {
  setMessageByIndex,
  streamPlaygroundResponse,
} from "src/store/actions/playgroundAction";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export interface Reponse {
  model: string;
  content: string;
  complete: boolean;
}
export interface PlaygroundMessageProps {
  id: string;
  role: string;
  userContent?: string;
  responses?: Reponse[];
  isActive: boolean;
  hidden: boolean;
}

export function PlaygroundMessage({
  id,
  role,
  userContent,
  responses,
  isActive,
  hidden,
}: PlaygroundMessageProps) {
  if (hidden) return null;
  const textAreaRef = useRef(null);
  let contentSection;
  const [isFocused, setIsFocused] = useState(false);
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const dispatch = useTypedDispatch();
  const handleSend = async (event) => {
    event.stopPropagation();
    // if (streaming || textContent.length < 1) return;
    setIsFocused(false);
    dispatch(streamPlaygroundResponse());
  };
  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  if (isUser) {
    const [messageValue, setMessageValue] = useState(userContent || "");
    const handleChange = (e) => {
      setMessageValue(e.target.value); // This sets what is displayed in the input box
      dispatch(
        setMessageByIndex({
          index: id,
          content: {
            id: id,
            role: "user",
            userContent: e.target.value,
            responses: null,
            isActive: true,
          },
        })
      );
    };
    contentSection = (
      <>
        <MessageHeader
          title={<div className="text-sm-md text-gray-4">User</div>}
          content={userContent || ""}
        />
        <div className="flex-col px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
          <EditableBox
            ref={textAreaRef}
            placeholder={"Enter a message..."}
            value={messageValue}
            onChange={handleChange}
          />
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
    contentSection = (
      <div className="flex items-start gap-xxs self-stretch ">
        {responses?.map((response, index) => {
          if (!response) return null;
          const Icon = ModelIcon(response.model);
          return (
            <div
              key={index}
              className="flex-col items-start gap-xxxs self-stretch w-1/2"
            >
              <MessageHeader
                title={
                  <div className="flex items-center gap-xxs">
                    <div className="text-sm-md text-gray-4">Response</div>
                    <Tag
                      text={response.model}
                      icon={React.createElement(Icon, { size: "md" })}
                    />
                  </div>
                }
                content={response.content || ""}
              />
              <div className="flex px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
                {response.content ? (
                  <div className="flex self-stretch max-w-full ">
                    <Markdown
                      children={response.content}
                      className="text-sm-regular text-gray-5  "
                      components={{
                        pre: ({ node, children, ...props }) => (
                          <pre className="clear-both break-words" {...props}>
                            ```{children}```
                          </pre>
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            {...props}
                            className=" whitespace-pre-wrap break-words"
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            {...props}
                            className="whitespace-pre-line my-2 break-words"
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            {...props}
                            className="list-inside list-decimal space-y-2 ml-1"
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            {...props}
                            className="list-inside list-disc space-y-2 ml-1"
                          />
                        ),
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-gray-4">Generating...</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
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

export function StreamingMessage() {
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const currentModels = useTypedSelector(
    (state) => state.playground.currentModels
  );
  if (streamingStates.every((state) => state.isLoading === false)) return null;
  return (
    <div className="flex items-start gap-xxs self-stretch">
      {streamingStates.length > 0 &&
        streamingStates?.map((streamingState, index) => {
          const Icon = ModelIcon(currentModels[index]);
          return (
            <div
              key={index}
              className="flex-col items-start gap-xxxs self-stretch w-1/2"
            >
              <MessageHeader
                title={
                  <div className="flex items-center gap-xxs">
                    <div className="text-sm-md text-gray-4">Response</div>
                    <Tag
                      text={currentModels[index]}
                      icon={React.createElement(Icon, { size: "md" })}
                    />
                  </div>
                }
                content={streamingState.streamingText || ""}
              />
              <div className="flex px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
                {streamingState.streamingText ? (
                  <div>
                    <Markdown
                      children={streamingState.streamingText}
                      className="text-sm-regular text-gray-5  "
                      components={{
                        pre: ({ node, children, ...props }) => (
                          <pre className="clear-both break-words" {...props}>
                            ```{children}```
                          </pre>
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            {...props}
                            className=" whitespace-pre-wrap break-words"
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            {...props}
                            className="whitespace-pre-line my-2 break-words"
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            {...props}
                            className="list-inside list-decimal space-y-2 ml-1"
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            {...props}
                            className="list-inside list-disc space-y-2 ml-1"
                          />
                        ),
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-gray-4">Generating...</span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
