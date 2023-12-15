import { Button, EditableBox, ModelIcon, User } from "src/components";
import { EnterKey } from "src/components/Icons/iconsDS";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { setMessages, appendMessage } from "src/store/actions/playgroundAction";
import cn from "src/utilities/ClassMerge";
import { sendStreamingText } from "src/store/thunks/streamingTextThunk";

export function PlaygroundMessage({ role, content, messageIndex }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const streaming = useSelector((state) => state.streamingText.isLoading);
  const textAreaRef = React.useRef(null);

  const [textContent, setTextContent] = React.useState(content);
  const [isFocused, setIsFocused] = React.useState(false);
  const currentModel = useSelector((state) => state.playground.currentModel);
  // Update when there is streaming
  React.useEffect(() => {
    setTextContent(content);
  }, [content]);

  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleChange = (value) => {
    setTextContent(value); // This sets what is displayed in the input box

    dispatch(
      setMessages(
        messages.map((message, index) => {
          if (index === messageIndex) {
            return { ...message, content: value };
          }
          return message;
        })
      )
    );
  };

  const handleSend = (event) => {
    event.stopPropagation();
    if (streaming) return;
    setIsFocused(false);
    const messagesWithPrompt = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];
    try {
      dispatch(
        sendStreamingText(
          {
            messages: messagesWithPrompt,
            stream: true,
            model: currentModel,
          },
          "https://platform.keywordsai.co/",
          "api/playground/ask/",
          (dispatch, getState) => {
            // this is the callback function after the streaming text is done
            const newMessage = {
              role: getState().playground.currentModel,
              content: getState().streamingText.streamingText,
            };
            dispatch(appendMessage(newMessage));
          }
        )
      );
    } catch (error) {
      console.log(error);
    }
    setIsFocused(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  };

  return (
    <div
      className={cn(
        "flex-col px-xs py-xxs items-start gap-xxs self-stretch rounded-sm border border-solid border-gray-3 hover:cursor-pointer",
        isFocused ? "border-gray-4" : ""
      )}
      onClick={() => setIsFocused(true)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-xxs px-xxs py-xxxs rounded-sm bg-gray-2">
        {role === "user" ? (
          <>
            <User />
            <p className="text-sm-md text-gray-white">User</p>
          </>
        ) : (
          <>
            {React.createElement(ModelIcon("openai"))}
            <p className="text-sm-md text-gray-white">{"gpt-3.5-turbo"}</p>
          </>
        )}
      </div>
      <EditableBox
        ref={textAreaRef}
        focus={isFocused}
        placeholder={role === "user" ? "Enter a message..." : "Generating..."}
        value={textContent}
        onChange={handleChange}
        streaming={streaming}
      />
      {isFocused && (
        <div className="flex justify-end gap-[10px] self-stretch ">
          <Button
            variant="small"
            text="Send message"
            icon={EnterKey}
            iconSize="md"
            iconPosition="right"
            onClick={handleSend}
          />
        </div>
      )}
    </div>
  );
}
