import React, { useEffect, useState, useRef } from "react";
import {
  getConversations,
} from "src/store/actions";
import { PanelChat } from "src/components/Sections";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { Sample } from "src/components/Cards";
import useAutoScroll from "src/hooks/useAutoScroll";
import KeywordsInput from "./components/KeywordsInput/KeywordsInput";
import { LogoSubtract } from "src/components/Icons";
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
      <div className="flex-col self-stretch flex-1 bg-red-500 w-[calc(100vw-280px)]">
        <div className="flex text-sm text-gray4 t-c  model-name "></div>
        <div className="chat-right flex flex-1 bg-gray-1 relative pt-sm pb-lg ">
          <div
            className="flex-col flex-1 h-[calc(100vh-184px)] overflow-y-auto overflow-x-hidden bg-gray-1"
            ref={conversationBoxRef}
          >
            {conversation?.messages?.length > 0 ? (
              <>
                {conversation?.messages?.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {chatError && (
                  <ChatMessage
                    key={999999}
                    message={{
                      role: "assistant",
                      content: "Error: " + chatError.detail,
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {true && ( // ! replaced streaming
                  <div className="flex flex-col justify-center items-center gap-md self-stretch mt-[160px]">
                    <LogoSubtract />
                    <div className="flex-col justify-center items-center gap-xxxs self-stretch">
                      <div className="flex-row gap-xxs items-center">
                        <HeaderLogo />
                        <span className="display-xs font-semibold">
                          Keywords AI
                        </span>
                      </div>
                      <span className="text-sm-md text-gray-3">
                        Connect to the best model for your prompts.
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
            {streaming && streamingText && (
              <ChatMessage
                message={{ content: streamingText, role: "assistant" }}
              />
            )}
          </div>
          <div className="absolute flex flex-col items-center gap-xs left-xxxl right-xxxl bottom-lg">
            {(!conversation?.messages ||
              (conversation?.messages?.length === 0 && !streaming)) && (
              <Sample />
            )}
            <div
              style={{
                position: "relative",
              }}
              className="flex-row self-stretch"
            >
              <KeywordsInput />
            </div>
            <div className="caption text-gray-4">
              Keywords AI connects your prompts with the best model
              automatically.{" "}
              <a href="/platform/doc" className="text-gray-4 underline">
                Learn more
              </a>
            </div>
            <input type="file" hidden ref={fileUploadRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
