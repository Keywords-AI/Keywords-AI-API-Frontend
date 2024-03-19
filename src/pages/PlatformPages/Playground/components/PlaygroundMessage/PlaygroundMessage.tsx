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
import { ModelTag, StatusTag, Tag } from "src/components/Misc";
import * as _ from "lodash";
import {
  deleMessageByIndex,
  regeneratePlaygroundResponse,
  setFocusIndex,
  setMessageByIndex,
  setMessageResponseByIndex,
  streamPlaygroundResponse,
} from "src/store/actions/playgroundAction";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { MessageBox } from "../MessageBox";
import { RootState } from "src/types";
import { set } from "react-hook-form";
import { resetSingleStreamingText } from "src/store/actions";

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
  index: number;
}

export function PlaygroundMessage({
  index,
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

  const lastResponseMessageId = useTypedSelector(
    (state) =>
      state.playground.messages.findLast(
        (message) => message.role === "assistant"
      )?.id
  );
  const isSingleChannel = useTypedSelector(
    (state: RootState) => state.playground.isSingleChannel
  );
  const isReset = useTypedSelector((state) => state.playground.isReseted);
  const streamingState = useTypedSelector((state) => state.streamingText);

  useEffect(() => {
    if (streamingState.some((state) => state.isLoading)) setIsFocused(false);
  }, [streamingState]);
  const [isFocused, setIsFocused] = useState(false);
  const [messageValue, setMessageValue] = useState(user_content || "");
  const [responseValue, setResponseValue] = useState([
    responses?.[0]?.content || "",
    responses?.[1]?.content || "",
  ]);
  useEffect(() => {
    setMessageValue(user_content || "");
  }, [isReset]);
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
  const focusIndex = useTypedSelector((state) => state.playground.focusIndex);
  const usermessageBoxRef = useRef(null);
  useEffect(() => {
    if (focusIndex == index) {
      usermessageBoxRef &&
        usermessageBoxRef.current &&
        usermessageBoxRef.current.focus();
    }
  }, [focusIndex]);
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
    dispatch(
      setMessageByIndex({
        index: id,
        content: {
          id: id,
          role: "user",
          user_content: value,
          responses: null,
          isActive: true,
        },
      })
    );
  };

  if (isUser) {
    contentSection = (
      <>
        <MessageHeader
          title={<div className="text-sm-md text-gray-4">User</div>}
          content={user_content || ""}
          deleteCallback={(e) => {
            e.preventDefault();
            if (messageLength === 1) {
              console.log("cannot delete last message");
              return;
            }
            console.log("deleting", id);
            dispatch(deleMessageByIndex(id));
          }}
        />
        <div className="flex self-stretch flex-1">
          <MessageBox
            index={index}
            ref={usermessageBoxRef}
            value={messageValue}
            onChange={handleChange}
            blur={!isFocused}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
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
            // disabled={!isFocused}
          />
          {/* {isFocused && (
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
          )} */}
        </div>
      </>
    );
  } else if (isAssistant) {
    const deletedOneChannel = responses?.some(
      (response) =>
        !response ||
        (response.complete && response.content == "" && !response.model)
    );
    contentSection = (
      <div className="flex items-start gap-xxs self-stretch ">
        {responses?.map((response, index) => {
          if (!response || response.content == "") return null;
          if (response.content == "\u200B")
            response.content = `{"errorText":"errorText"}`;
          const isError = response.content.includes("errorText");
          const errorObj = isError ? JSON.parse(response.content) : null;
          return (
            <div
              key={index}
              className={cn(
                "flex-col items-start gap-xxxs self-stretch",
                isSingleChannel || deletedOneChannel ? "w-full" : "w-1/2"
              )}
            >
              <MessageHeader
                title={
                  <div className="flex items-center gap-xxs h-[28px]">
                    <div className="text-sm-md text-gray-4">
                      Assistant {index == 0 ? "A" : "B"}
                    </div>
                    <ModelTag model={response.model} />
                    {isError && (
                      <StatusTag statusCode={errorObj.errorCode || 500} />
                    )}
                  </div>
                }
                regenCallback={() =>
                  dispatch(regeneratePlaygroundResponse(index))
                }
                deleteCallback={(e) => {
                  e.preventDefault();
                  // if (+id == 0) return;
                  console.log("deleting", id);
                  dispatch(deleMessageByIndex(id, index));
                  dispatch(resetSingleStreamingText(index));
                }}
                showRegen={id == lastResponseMessageId && !isError}
                content={response.content || ""}
              />
              {
                <div className="flex self-stretch flex-1">
                  {isError ? (
                    <div className="flex items-start px-xxs py-xxxs gap-[10px] w-full bg-gray-2 rounded-sm text-sm-regular text-red">
                      {errorObj.errorText}
                    </div>
                  ) : response.content ? (
                    <MessageBox
                      index={index}
                      defaultValue={response.content}
                      onChange={(val) =>
                        setResponseValue((prev) => {
                          const updatedArray = [...prev];
                          if (index === 0) {
                            updatedArray[0] = val;
                          } else if (index === 1) {
                            updatedArray[1] = val;
                          }
                          return updatedArray;
                        })
                      }
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleUpdateResponse(
                            id,
                            index,
                            responseValue[index] + "\u200B"
                          );
                          setIsFocused(false);
                          handleSend(e);
                        }
                      }}
                      onFoucs={(e) =>
                        setResponseValue((prev) => {
                          const updatedArray = [...prev];
                          if (index === 0) {
                            updatedArray[0] = e.target.value;
                          } else if (index === 1) {
                            updatedArray[1] = e.target.value;
                          }
                          return updatedArray;
                        })
                      }
                      onBlur={() => {
                        handleUpdateResponse(
                          id,
                          index,
                          responseValue[index] + "\u200B"
                        );
                        setIsFocused(false);
                        dispatch(setFocusIndex(-1));
                      }}
                      blur={!isFocused}
                    />
                  ) : (
                    <span className="text-gray-4 text-sm-regular">
                      Generating...
                    </span>
                  )}
                </div>
              }
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
  const textAreaRefs = useRef([React.createRef(), React.createRef()]);

  const setHeight = (ref) => {
    if (!ref) return;

    const target = ref.current;
    if (!target) return;
    target.style.height = "1px";
    target.style.height = target.scrollHeight + "px";
  };
  const streamingStates = useTypedSelector((state) => state.streamingText);
  useEffect(() => {
    textAreaRefs.current[0] && setHeight(textAreaRefs.current[0]);
    textAreaRefs.current[1] && setHeight(textAreaRefs.current[1]);
  }, [streamingStates[0].streamingText, streamingStates[1].streamingText]);
  const isSingleChannel = useTypedSelector(
    (state: RootState) => state.playground.isSingleChannel
  );
  const selectedModel = useTypedSelector(
    (state) => state.playground.modelOptions.models
  );
  if (streamingStates.every((state) => state.isLoading === false)) return null;

  return (
    <div className="flex items-start gap-xxs self-stretch ">
      {streamingStates.length > 0 &&
        streamingStates?.map((streamingState, index) => {
          if (
            selectedModel[index] === "none" &&
            selectedModel.every((item) => item === "none")
          ) {
            return null;
          }
          if (isSingleChannel && selectedModel[index] === "none") return null;
          if (
            isSingleChannel &&
            !streamingState.isLoading &&
            streamingState.streamingText === ""
          )
            return null;
          if (streamingState.streamingText === "" && !streamingState.isLoading)
            return null;
          // if (deletedOneChannel && !streamingState.isLoading) return null;

          return (
            <div
              key={index}
              className={cn(
                "flex-col items-start gap-xxxs flex-1 "
                // isSingleChannel ? "w-full" : "w-1/2"
              )}
            >
              {
                <>
                  <MessageHeader
                    streaming
                    title={
                      <div className="flex items-center gap-xxs h-[28px]">
                        <div className="text-sm-md text-gray-4">
                          Assistant {index == 0 ? "A" : "B"}
                        </div>
                        {streamingState.model && (
                          <ModelTag model={streamingState.model} />
                        )}
                      </div>
                    }
                    content={streamingState.streamingText || ""}
                  />
                  <div
                    className={cn(
                      "flex px-xs py-xxs items-start gap-[10px] w-full rounded-sm shadow-border shadow-gray-2 max-w-full "
                      // isSingleChannel ? "max-w-full" : "max-w-1/2"
                    )}
                  >
                    {streamingState.streamingText &&
                    streamingState.streamingText != "\u200B" ? (
                      <textarea
                        ref={textAreaRefs.current[index]}
                        className="flex self-stretch max-w-full  text-sm-regular text-gray-4 whitespace-pre-line break-words text-wrap outline-none resize-none w-full border-none bg-transparent"
                        disabled
                        value={streamingState.streamingText}
                      >
                        {/* {streamingState.streamingText} */}
                      </textarea>
                    ) : streamingState.error ? (
                      <span className="text-sm-regular text-gray-4">
                        {"Generating..."}
                      </span>
                    ) : (
                      <span className="text-sm-regular text-gray-4">
                        {streamingState.isLoading ? "Generating..." : null}
                      </span>
                    )}
                  </div>
                </>
              }
            </div>
          );
        })}
    </div>
  );
}
