import { Button, EditableBox, EnterKey, ModelIcon, User } from "src/components";
import "./PlaygroundMessage.css";
import { useDispatch, useSelector } from "react-redux";
import useStream from "src/hooks/useStream";
import React from "react";
import readStream from "src/services/readStream";
import { updateStreamText, setStreaming, stopStreaming } from "src/store/actions/playgroundAction";


export function PlaygroundMessage({ role, content }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const { loading, error, response, postData } = useStream({ path: "api/playground/ask/", host: "https://platform.keywordsai.co/" });
  const [textContent, setTextContent] = React.useState(content);
  const [isFocused, setIsFocused] = React.useState(false);
  // We probably need a abort controller state here
  React.useEffect(() => {
    if (!response) return;
    const streamingCallback = (chunk) => {
      dispatch(updateStreamText(chunk));
    }
    dispatch(setStreaming(true));
    const abortFunction = readStream(response, streamingCallback, stopStreaming);
  }, [response]);

  const handleBlur = (event) => {
    // Check if the new focus target is not a descendant of the parent
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleChange = (value) => {
    setTextContent(value);
  };

  const handleSend = () => {
    // Squash the messages with system prompt
    const messagesWithPrompt = [{ role: "user", content: "Hi!" }]; // test
    // const messagesWithPrompt = [...messages, { role: "system", content: systemPrompt }];
    try {
      console.log("messsage", messagesWithPrompt);
      postData({ messages: messagesWithPrompt, stream: true });
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
        placeholder={"Enter a message..."}
        value={textContent}
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
            onClick={handleSend}
          />
        </div>
      )}
    </div>
  );
}
