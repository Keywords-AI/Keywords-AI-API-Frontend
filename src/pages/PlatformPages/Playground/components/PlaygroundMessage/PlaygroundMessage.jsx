import { Button, EditableBox, EnterKey, ModelIcon, User } from "src/components";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { useStream } from "src/hooks/useStream";
import React from "react";


export function PlaygroundMessage({ sender, message }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const { loading, error, response, postData } = useStream();
  const [content, setContent] = React.useState(message);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSend = () => {
    // Collect messages and format them for the API
    let formattedMessages = messages.map((message) => ({
      role: message.sender === "user" ? "user" : "assistant",
      content: message.message,
    }));

    // Include system prompt if available
    if (systemPrompt) {
      formattedMessages = [
        { role: "system", content: systemPrompt },
        ...formattedMessages,
      ];
    }

    // Send the messages to the endpoint
    try {
      console.log("messsage", formattedMessages);
      // postData({ messages: formattedMessages, stream: true });
      // Handle response here
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="flex-col px-xs py-xxs items-start gap-xxs self-stretch rounded-sm border border-solid border-gray-3"
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    >
      <div className="flex items-center gap-xxs px-xxs py-xxxs rounded-sm bg-gray-2">
        {sender === "user" ? (
          <>
            <User />
            <p className="text-sm-md text-gray-white">User</p>
          </>
        ) : (
          <>
            {React.createElement(ModelIcon(sender.name))}
            <p className="text-sm-md text-gray-white">{sender.model}</p>
          </>
        )}
      </div>
      <EditableBox
        placeholder={"Enter a message..."}
        value={content}
        onChange={handleChange}
      />
      {isFocused && (
        <div className="flex justify-end gap-[10px] self-stretch ">
          <Button
            variant="standard"
            text="Send Message"
            icon={EnterKey}
            iconPosition="right"
            iconHoverFill="fill-gray-white"
            onClick={handleSendClick}
          />
        </div>
      )}
    </div>
  );
}
