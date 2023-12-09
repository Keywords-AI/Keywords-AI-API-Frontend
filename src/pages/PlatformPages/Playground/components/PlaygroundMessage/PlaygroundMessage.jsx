import { Button, EditableBox, EnterKey, ModelIcon, User } from "src/components";
import "./PlaygroundMessage.css";
import React from "react";
export function PlaygroundMessage({ sender, message, handleSend }) {
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
  const handleSendClick = () => {
    handleSend(content); // Pass the current content as an argument
  };
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
