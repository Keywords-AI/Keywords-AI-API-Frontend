import { AddMessage, ArrowRight, Button, Divider } from "src/components";
import {
  CurrentModel,
  OptionSelector,
  ModelOutput,
  PlaygroundMessage,
} from "./components";
import React, { useEffect } from "react";
import {
  setMessages,
  setPrompt,
  setFirstTime,
} from "src/store/actions/playgroundAction";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import useAutoScroll from "src/hooks/useAutoScroll";

const mapStateToProps = (state) => {
  return {
    messages: state.playground.messages,
    prompt: state.playground.prompt,
    streaming: state.playground.streaming,
    streamingText: state.playground.streamingText,
    firstTime: state.playground.firstTime,
  };
};

const mapDispatchToProps = {
  setMessages,
  setPrompt,
  setFirstTime,
};

const Prompt = () => {
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    dispatch(setPrompt(event.target.value));
  };
  return (
    <div className="flex-col w-[320px] self-stretch justify-center items-start gap-xxs">
      <p className="text-sm-regular self-stretch text-gray-4">System Prompt</p>
      <textarea
        onChange={handleOnChange}
        className="flex self-stretch px-xs py-xxs items-end flex-1 rounded-sm border bordersolid border-gray-3 resize-none text-sm-regular text-gray-white placeholder-gray-3 bg-transparent"
        placeholder="You are a helpful assistant."
      />
    </div>
  );
};

const NotConnectedMap = ({
  messages,
  streaming,
  streamingText,
  setMessages,
  firstTime,
}) => {
  const dispatch = useDispatch();
  const { conversationBoxRef, generatingText, setGeneratingText } =
    useAutoScroll();
  const handleAddMessage = () => {
    setMessages([...messages, { role: "user", content: "" }]);
  };
  const handleRegenerate = () => {
    setMessages([...messages, { role: "user", content: "" }]);
  };
  useEffect(() => {
    if (streamingText) {
      setGeneratingText(streamingText);
      dispatch(setFirstTime(false));
    }
  }, [streamingText]);

  return (
    <div className="flex-col p-lg items-start gap-lg flex-1 self-stretch max-h-full">
      <div className="flex justify-between items-start self-stretch">
        <div className="flex-co items-start gap-sm display-sm text-gray-white">
          Playground
        </div>
        <div className="flex items-start gap-xs">
          <Button variant="r4-gray-2" text="View code" />
        </div>
      </div>
      <div className="flex items-start gap-lg flex-1 self-stretch h-[calc(100vh-190.5px)]">
        <Prompt />
        <div
          className="flex-col items-start gap-xxs flex-1 self-stretch  overflow-y-auto h-[calc(100vh-190.5px)]"
          ref={conversationBoxRef}
        >
          {messages.map((message, index) => (
            <PlaygroundMessage
              key={index}
              messageIndex={index} // An index to locate which one is being edited
              {...message}
            />
          ))}
          {streaming && (
            <PlaygroundMessage
              key={99999}
              messageIndex={99999}
              role={"assistant"}
              content={streamingText}
            />
          )}
          <div className="flex gap-xxs">
            <Button
              variant="small"
              text="Add Message"
              icon={AddMessage}
              onClick={handleAddMessage}
            />
            {firstTime && (
              <Button
                variant="small"
                text="Regenerate"
                icon={AddMessage}
                onClick={handleAddMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Main = connect(mapStateToProps, mapDispatchToProps)(NotConnectedMap);

const SidePannel = () => {
  return (
    <div className="flex-col w-[320px] p-lg gap-md items-start self-stretch border-l border-solid border-gray-3 overflow-y-auto">
      <OptionSelector />
      <Divider />
      <CurrentModel />
      <ModelOutput />
    </div>
  );
};

export function Playground() {
  return (
    <div className="flex items-start justify-center self-stretch h-[calc(100vh-52.8px)] ">
      <Main />
      <SidePannel />
    </div>
  );
}
