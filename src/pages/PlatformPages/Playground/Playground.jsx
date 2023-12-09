import { AddMessage, Button, Divider } from "src/components";
import useStream from "src/hooks/useStream";
import {
  CurrentModel,
  OptionSelector,
  ModelOutput,
  PlaygroundMessage,
} from "./components";
import React from "react";
import { useState } from "react";
import { setMessages, setPrompt } from "src/store/actions/playgroundAction";
import { useDispatch, useSelector } from "react-redux";

const Prompt = () => {
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    dispatch(setPrompt(event.target.value));
  };
  return (
    <div className="flex-col w-[320px] self-stretch justify-center items-start gap-xxs">
      <p className="text-sm-regular self-stretch text-gray-4">Prompt</p>
      <textarea
        onChange={handleOnChange}
        className="flex self-stretch px-xs py-xxs items-end flex-1 rounded-sm border bordersolid border-gray-3 resize-none text-sm-regular text-gray-white placeholder-gray-3 bg-transparent"
        placeholder="You are a helpful assistant."
      />
    </div>
  );
};

const Main = () => {
  const messages = useSelector((state) => state.playground.messages);
  const dispatch = useDispatch();
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const handleAddMessage = () => {
    console.log("handle add message:");
    dispatch(setMessages([...messages, { sender: "user", message: "" }]));
  };
  const handleSend = (value) => {
    console.log("handle send");
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
      // Handle error here
    }
  };
  return (
    <div className="flex-col p-lg items-start gap-lg flex-1 self-stretch max-h-full">
      <div className="flex justify-between items-start self-stretch">
        <div className="flex-co items-start gap-sm display-sm text-gray-white">
          Playground
        </div>
        <div className="flex items-start gap-xs">
          <Button
            variant="standard"
            text="View code"
            padding="px-xs py-xxs"
            textClassName="text-sm-md"
          />
        </div>
      </div>
      <div className="flex items-start gap-lg flex-1 self-stretch h-full ">
        <Prompt />
        <div className="flex-col items-start gap-xxs flex-1 self-stretch  overflow-y-auto h-[calc(100vh-190.5px)]">
          {messages.map((message, index) => (
            <PlaygroundMessage
              key={index}
              {...message}
              handleSend={handleSend}
            />
          ))}
          <Button
            variant="standard"
            text="Add Message"
            icon={AddMessage}
            onClick={handleAddMessage}
          />
        </div>
      </div>
    </div>
  );
};

const SidePannel = () => {
  return (
    <div className="flex-col w-[320px] p-lg gap-md items-start self-stretch border-l border-solid border-gray-3 ">
      <OptionSelector />
      <Divider />
      <CurrentModel />
      <ModelOutput />
    </div>
  );
};

export function Playground() {
  return (
    <div className="flex items-start justify-center self-stretch h-full ">
      <Main />
      <SidePannel />
    </div>
  );
}
