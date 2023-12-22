import { Button, EditableBox, ModelIcon, Userpg } from "src/components";
import { EnterKey } from "src/components/Icons/iconsDS";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import React from "react";
import {
  setMessages,
  streamPlaygroundResponse,
} from "src/store/actions/playgroundAction";
import cn from "src/utilities/classMerge";
import Markdown from "react-markdown";

export function PlaygroundMessage({ role, content, messageIndex }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const streaming = useSelector((state) => state.streamingText.isLoading);
  const currentBrand = useSelector((state) => state.playground.currentBrand);
  const textAreaRef = React.useRef(null);

  const [textContent, setTextContent] = React.useState(content);
  const [isFocused, setIsFocused] = React.useState(
    role === "user" ? true : false
  );
  const currentModel = useSelector((state) => state.playground.currentModel);

  const isUser = role === "user";
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

  const handleChange = (e) => {
    setTextContent(e.target.value); // This sets what is displayed in the input box
    dispatch(
      setMessages(
        messages.map((message, index) => {
          if (index === messageIndex) {
            return { ...message, content: e.target.value };
          }
          return message;
        })
      )
    );
  };

  const handleSend = async (event) => {
    event.stopPropagation();
    if (streaming) return;
    setIsFocused(false);
    dispatch(streamPlaygroundResponse(messageIndex));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  };
  const [isHover, setIsHover] = React.useState(false);
  return (
    <div
    onMouseEnter={() => setIsHover(true)}
    onmMouseLeave={() => setIsHover(false)}
      className={cn(
        "flex-col px-xs py-xxs items-start gap-xxs self-stretch rounded-sm shadow-border shadow-gray-3",
        messageIndex === messages.length - 1 && !streaming && (isFocused) 
          ? "shadow-gray-4"
          : "shaoow-gray-3",
          isUser && messageIndex === messages.length - 1 && "hover:cursor-pointer",
      )}
      onClick={() => {
        setIsFocused(true);
      }}
      onFocus={() => {
        setIsFocused(true);
      }}
      tabIndex="0"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-xxs px-xxs py-xxxs rounded-sm bg-gray-2">
        {role === "user" ? (
          <>
            <Userpg active />
            <p className="text-sm-md text-gray-white">User</p>
          </>
        ) : (
          <>
            {React.createElement(ModelIcon(currentBrand), { size: "md" })}
            <p className="text-sm-md text-gray-white">{role}</p>
          </>
        )}
      </div>
      {isUser ? (
        messageIndex === messages.length - 1 ? (
          <EditableBox
            ref={textAreaRef}
            focus={isFocused}
            placeholder={isUser ? "Enter a message..." : "Generating..."}
            value={textContent}
            onChange={handleChange}
            streaming={streaming}
          />
        ) : (
          <div className="w-full h-full flex-col self-stretch flex-grow  text-sm-regular text-gray-white ">
            {textContent || <span className="text-gray-4">Generating...</span>}
          </div>
        )
      ) : (
        <div className="w-full h-full flex-col self-stretch flex-grow  text-sm-regular text-gray-white ">
          {textContent ? (
            <>
              <Markdown
                children={textContent}
                className="text-sm-regular text-gray-white "
                components={{
                  p: ({ node, ...props }) => (
                    <p {...props} className="whitespace-pre-line " />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      {...props}
                      className=" list-inside whitespace-pre-line list-decimal ml-1 "
                    />
                  ),
                }}
              />
            </>
          ) : (
            <span className="text-gray-4">Generating...</span>
          )}
        </div>
      )}
      {isFocused && isUser && messageIndex === messages.length - 1 && (
        <div className="flex justify-end gap-[10px] self-stretch">
          <Button
            variant="small"
            text="Send message"
            icon={EnterKey}
            iconSize="md"
            iconPosition="right"
            onClick={handleSend}
            disabled={streaming}
          />
        </div>
      )}
    </div>
  );
}
