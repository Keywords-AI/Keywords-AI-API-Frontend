import { Button, EditableBox, ModelIcon, User } from "src/components";
import { EnterKey } from "src/components/Icons/iconsDS";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import React from "react";
import {
  setMessages,
  appendMessage,
  setCacheAnswer,
} from "src/store/actions/playgroundAction";
import cn from "src/utilities/ClassMerge";
import store from "src/store/store";
export function PlaygroundMessage({ role, content, messageIndex }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const streaming = useSelector((state) => state.streamingText.isLoading);
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
    const messagesWithPrompt = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];
    try {
      await sendStreamingTextThunk({
        params: {
          messages: messagesWithPrompt,
          stream: true,
          model: currentModel,
        },
        prompt: systemPrompt,
        callback: () => {
          const currentModel = store.getState().playground.currentModel;
          const streamingText = store.getState().streamingText.streamingText;
          const newMessage = {
            role: currentModel,
            content: streamingText,
          };
          store.dispatch(appendMessage(newMessage));
          const cache = {
            answer: streamingText,
            index: messageIndex,
          };
          store.dispatch(setCacheAnswer(currentModel, cache));
          store.dispatch(appendMessage({ role: "user", content: "" }));
        },
        dispatch: store.dispatch,
        getState: store.getState,
      });
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
      tabIndex="0"
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
            <p className="text-sm-md text-gray-white">{role}</p>
          </>
        )}
      </div>
      {isUser ? (
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
      )}
      {isFocused && isUser && (
        <div className="flex justify-end gap-[10px] self-stretch ">
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
