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
import { AutoScrollContainer } from "react-auto-scroll-container";
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
    <div className="flex-row h-[calc(100vh-56px)] w-[100vw]">
      <PanelChat />
      <Main />
    </div>
  );
}
const Messages = () => {
  const messages = useTypedSelector(
    (state: RootState) => state.chatbot.conversation.messages
  );
  const StreamingObj = useTypedSelector(
    (state: RootState) => state.streamingText[0]
  );
  if (!messages || messages.length === 0) {
    return (
      <div
        aria-label="frame 775"
        className="flex-col items-center gap-xxxs mt-[180px]  px-xxxl "
      >
        <div className="flex h-[36px] items-center gap-xxs">
          <Logo />
          <p className="display-xs text-gray-5">Keywords AI</p>
        </div>
        <p className="text-md-md text-gray-3">
          Connect to the best model for your prompts.
        </p>
      </div>
    );
  } else {
    return (
      <AutoScrollContainer
        percentageThreshold={15}
        className="flex-col items-center gap-xl  px-xxxl overflow-y-auto flex-1 w-full "
      >
        {messages?.map((m, index) => {
          return <ChatMessage key={index} index={index} message={m} />;
        })}
        {StreamingObj.error == null && StreamingObj.isLoading && (
          <ChatMessage
            index={-1}
            message={{
              role: "assistant",
              content: StreamingObj.streamingText,
              model: StreamingObj.model,
            }}
          />
        )}

        {StreamingObj.error != null && (
          <ChatMessage
            index={-2}
            message={{
              role: "error",
              content: StreamingObj.error || "Error",
              model: StreamingObj.model,
            }}
          />
        )}
      </AutoScrollContainer>
    );
  }
};

const InputAndFooter = () => {
  return (
    <div className="flex-col items-center gap-xs self-stretch  px-xxxl ">
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
      className="flex-col pt-xl pb-lg justify-between items-center gap-lg "
      style={{ width: "calc(100vw - 248px)" }}
    >
      <Messages />
      <InputAndFooter />
    </div>
  );
};
