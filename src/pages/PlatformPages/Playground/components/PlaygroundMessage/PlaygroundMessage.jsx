import { Button, EditableBox, EnterKey, ModelIcon, User } from "src/components";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";
import useStream from "src/hooks/useStream";
import React from "react";
import readStream from "src/services/readStream";
import { updateStreamText, setStreaming, stopStreaming, setMessages } from "src/store/actions/playgroundAction";
import { set } from "react-hook-form";


export function PlaygroundMessage({ role, content, messageIndex }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const textAreaRef = React.useRef(null);
  const { loading, error, response, postData } = useStream({ path: "api/playground/ask/", host: "https://platform.keywordsai.co/" });
  const [textContent, setTextContent] = React.useState(content);
  const [isFocused, setIsFocused] = React.useState(false);

  // Update when there is streaming
  React.useEffect(() => {
    setTextContent(content);
  }, [content]);

  // We probably need a abort controller state here
  React.useEffect(() => {
    if (!response) return;
    const streamingCallback = (chunk) => {
      dispatch(updateStreamText(chunk));
    }
    dispatch(setStreaming(true));
    const stopStreamingFunc = () => {
      dispatch(stopStreaming());
    }
    const abortFunction = readStream(response, streamingCallback, stopStreamingFunc);
  }, [response]);


  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleChange = (value) => {
    setTextContent(value); // This sets what is displayed in the input box
    dispatch(setMessages(messages.map((message, index) => {
      if (index === messageIndex) {
        return { ...message, content: value };
      }
      return message;
    })));
  };

  const handleSend = (event) => {
    // Squash the messages with system prompt
    // const messagesWithPrompt = [{ role: "user", content: "Hi!" }]; // test
    event.stopPropagation();
    const messagesWithPrompt = [{ role: "system", content: systemPrompt },...messages];
    try {
      postData({ messages: messagesWithPrompt, stream: true });
    } catch (error) {
      console.log(error);
    }
    setIsFocused(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  };

  return (
    <div
      className={"flex-col px-xs py-xxs items-start gap-xxs self-stretch rounded-sm border border-solid border-gray-3 " + (isFocused ? "border-gray-4" : "")}
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
        placeholder={"Enter a message..."}
        value={textContent}
        onChange={handleChange}
      />
      {true && (
        <div className="flex justify-end gap-[10px] self-stretch ">
          <Button
            variant="small"
            text="Send message"
            icon={EnterKey}
            iconPosition="right"
            onClick={handleSend}
          />
        </div>
      )}
    </div>
  );
}
