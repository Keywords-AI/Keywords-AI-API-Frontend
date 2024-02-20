import React, { ReactElement, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import {
  Check,
  Copy,
  Delete,
  EditableBox,
  EnterKey,
  ModelIcon,
  OpenAI,
  Pencil,
  Refresh,
} from "src/components";
import { Button, CopyButton, DotsButton } from "src/components/Buttons";
import { ModelTag, Tag } from "src/components/Misc";
import * as _ from "lodash";
import {
  deleMessageByIndex,
  regeneratePlaygroundResponse,
  setMessageByIndex,
  setMessageResponseByIndex,
  streamPlaygroundResponse,
} from "src/store/actions/playgroundAction";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { MessageBox } from "../MessageBox";
import { RootState } from "src/types";

export interface Reponse {
  model: string;
  content: string;
  complete: boolean;
}
export interface PlaygroundMessageProps {
  id: string;
  role: string;
  user_content?: string;
  responses?: Reponse[];
  isLast: boolean;
  hidden: boolean;
}

export function PlaygroundMessage({
  id,
  role,
  user_content,
  responses,
  hidden,
}: PlaygroundMessageProps) {
  let contentSection = <></>;
  const messageLength = useTypedSelector(
    (state: RootState) => state.playground.messages.length
  );
  const isSingleChannel = useTypedSelector(
    (state: RootState) => state.playground.isSingleChannel
  );
  const [isFocused, setIsFocused] = useState(false);
  const [messageValue, setMessageValue] = useState(user_content || "");
  const [responseValue, setResponseValue] = useState("");
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  useEffect(() => {
    if (+id == messageLength - 1) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [messageLength]);
  const dispatch = useTypedDispatch();
  const handleSend = async (event) => {
    event.stopPropagation();
    // if (streaming || textContent.length < 1) return;

    setIsFocused(false);
    dispatch(streamPlaygroundResponse());
  };
  if (hidden) return null;
  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleUpdateResponse = (id, channel, value) => {
    dispatch(setMessageResponseByIndex(id, channel, value));
  };
  const handleChange = (value) => {
    setMessageValue(value); // This sets what is displayed in the input box
  };
  if (isUser) {
    contentSection = (
      <>
        <MessageHeader
          title={<div className="text-sm-md text-gray-4">User</div>}
          content={user_content || ""}
          deleteCallback={(e) => {
            e.preventDefault();
            if (+id == 0) return;
            dispatch(deleMessageByIndex(id));
          }}
        />
        <div className="flex-col px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
          <MessageBox
            value={messageValue}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                dispatch(
                  setMessageByIndex({
                    index: id,
                    content: {
                      id: id,
                      role: "user",
                      user_content: messageValue,
                      responses: null,
                      isActive: true,
                    },
                  })
                );
                handleSend(e);
                setIsFocused(false);
              }
            }}
            disabled={!isFocused}
          />
          {isFocused && (
            <div
              className="flex justify-end gap-xxs self-stretch "
              onMouseDown={(e) => e.preventDefault()}
            >
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
          if (!response || response.content == "") return null;
          const Icon = ModelIcon(response.model);
          return (
            <div
              key={index}
              className={cn(
                "flex-col items-start gap-xxxs self-stretch",
                isSingleChannel ? "w-full" : "w-1/2"
              )}
            >
              <MessageHeader
                title={
                  <div className="flex items-center gap-xxs">
                    <div className="text-sm-md text-gray-4">
                      Response {index == 0 ? "A" : "B"}
                    </div>
                    <Tag
                      text={response.model}
                      icon={React.createElement(Icon, { size: "md" })}
                    />
                  </div>
                }
                regenCallback={() =>
                  dispatch(regeneratePlaygroundResponse(index))
                }
                deleteCallback={(e) => {
                  e.preventDefault();
                  if (+id == 0) return;
                  dispatch(deleMessageByIndex(id, index));
                }}
                showRegen={true}
                content={response.content || ""}
              />
              <div className="flex px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
                {response.content ? (
                  <MessageBox
                    value={response.content}
                    onChange={(val) => setResponseValue(val)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateResponse(id, index, responseValue);
                        setIsFocused(false);
                        // handleSend(e);
                      }
                    }}
                    onBlur={() => {
                      responseValue != "" &&
                        handleUpdateResponse(id, index, responseValue);
                      setIsFocused(false);
                    }}
                    disabled={!isFocused}
                  />
                ) : (
                  <span className="text-gray-4 text-sm-regular">
                    Generating...
                  </span>
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
      onBlur={handleBlur}
      onClick={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
    >
      {contentSection}
    </div>
  );
}

const MessageHeader = ({
  title,
  content,
  showRegen = false,
  deleteCallback,
  regenCallback,
  streaming = false,
}: {
  title: ReactElement;
  content: string;
  showRegen?: boolean;
  deleteCallback?: (e) => void;
  regenCallback?: (e) => void;
  streaming?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center self-stretch">
      <div className="flex items-center gap-xxs">{title}</div>
      {!streaming && (
        <div className="flex items-center">
          {showRegen && (
            <DotsButton
              icon={Refresh}
              onClick={(e) => regenCallback && regenCallback(e)}
            />
          )}
          <CopyButton text={content} />
          <DotsButton
            icon={Delete}
            onClick={(e) => deleteCallback && deleteCallback(e)}
          />
        </div>
      )}
    </div>
  );
};

export function StreamingMessage() {
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const currentModels = useTypedSelector(
    (state) => state.playground.currentModels
  );
  const isSingleChannel = useTypedSelector(
    (state: RootState) => state.playground.isSingleChannel
  );
  if (
    streamingStates.every(
      (state) => state.isLoading === false && state.error == null
    )
  )
    return null;

  return (
    <div className="flex items-start gap-xxs self-stretch">
      {streamingStates.length > 0 &&
        streamingStates?.map((streamingState, index) => {
          const Icon = ModelIcon(currentModels[index]);
          if (
            streamingStates.every(
              (item) => item.isLoading === false && item.error == null
            )
          ) {
            return null;
          }
          if (
            isSingleChannel &&
            streamingState.isLoading === false &&
            streamingState.error == null
          )
            return null;
          return (
            <div
              key={index}
              className={cn(
                "flex-col items-start gap-xxxs self-stretch",
                isSingleChannel ? "w-full" : "w-1/2"
              )}
            >
              <MessageHeader
                streaming
                title={
                  <div className="flex items-center gap-xxs">
                    <div className="text-sm-md text-gray-4">
                      Response {index == 0 ? "A" : "B"}
                    </div>
                    {streamingState.model && (
                      <ModelTag model={streamingState.model} />
                    )}
                  </div>
                }
                content={streamingState.streamingText || ""}
              />
              <div className="flex px-xs py-xxs items-start gap-[10px] self-stretch rounded-sm shadow-border shadow-gray-3">
                {streamingState.streamingText ? (
                  <div className="flex self-stretch max-w-full whitespace-pre-line break-words text-sm-regular text-gray-5">
                    {streamingState.streamingText}
                  </div>
                ) : streamingState.error ? (
                  <span className="text-red">{streamingState.error}</span>
                ) : (
                  <span className="text-sm-regular text-gray-4">
                    {streamingState.isLoading ? "Generating..." : null}
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
