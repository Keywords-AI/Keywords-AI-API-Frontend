import React, { useEffect, useState, useRef } from "react";
import { getConversations } from "src/store/actions";
import { PanelChat } from "src/components/Sections";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { Sample } from "src/components/Cards";
import useAutoScroll from "src/hooks/useAutoScroll";
import KeywordsInput from "./components/KeywordsInput/KeywordsInput";
import { Logo, LogoSubtract } from "src/components/Icons";
import { HeaderLogo } from "src/components/BrandAssets";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";

export default function Chatbot({ chatbot }) {
  const dispatch = useTypedDispatch();
  const streaming = useTypedSelector(
    (state: RootState) => state.streamingText[0].isLoading
  );
  const streamingText = useTypedSelector(
    (state: RootState) => state.streamingText[0].streamingText
  );
  const conversation = useTypedSelector(
    (state: RootState) => state.chatbot.conversation
  );
  const [activeConversation, setActiveConversation] = useState(null);
  const fileUploadRef = useRef(null);
  const [chatError, setChatError] = useState(null);
  const { conversationBoxRef, generatingText, setGeneratingText } =
    useAutoScroll();
  const conversationRef = useRef(conversation);

  useEffect(() => {
    setGeneratingText(streamingText);
  }, [streamingText]);

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  useEffect(() => {
    if (conversation?.id && conversation?.id !== -1) {
      setActiveConversation(conversation?.id);
      conversationRef.current = conversation;
      if (conversationBoxRef.current) {
        conversationBoxRef.current.scrollTop =
          conversationBoxRef.current.scrollHeight;
      }
    }
  }, [conversation]);

  return (
    <div className="flex-row h-[calc(100vh-56px)] self-stretch">
      <PanelChat />
      <Main />
    </div>
  );
}
const Messages = () => {
  const messages = useTypedSelector(
    (state: RootState) => state.chatbot.conversation.messages
  );
  if (!messages || messages.length === 0) {
    return (
      <div
        aria-label="frame 775"
        className="flex-col items-center gap-xxxs mt-[180px]"
      >
        <div className="flex h-[36px] items-center gap-xxs">
          <Logo />
          <p className=" display-xs text-gray-5">Keywords AI</p>
        </div>
        <p className="text-md-md text-gray-3">
          Connect to the best model for your prompts.
        </p>
      </div>
    );
  } else {
    return (
      <div
        aria-label="frame 758"
        className="flex-col items-center gap-xl self-stretch overflow-auto"
      >
        {messages?.map((m, index) => {
          return <ChatMessage key={index} index={index} message={m} />;
        })}
      </div>
    );
  }
};

const InputAndFooter = () => {
  return (
    <div className="flex-col items-center gap-xs self-stretch">
      <KeywordsInput />
      <div className="caption text-gray-4">
        Keywords AI connects your prompts with the best model automatically.{" "}
        <a href="/platform/doc" className="text-gray-4 underline">
          Learn more
        </a>
      </div>
    </div>
  );
};
const Main = () => {
  return (
    <div
      aria-label="frame 754 "
      className="flex-col px-xxxl pt-xl pb-lg justify-between items-center flex-1 self-stretch max-w-[calc(100dvw-248px)] gap-lg"
    >
      <Messages />
      <InputAndFooter />
    </div>
  );
};
