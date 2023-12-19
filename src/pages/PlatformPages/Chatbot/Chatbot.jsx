import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import useStream from "src/hooks/useStream";
import {
  getConversations, getConversation, createConversation, deleteConversation,
  abortStreamingTextRequest
} from "src/store/actions";
import { PanelChat } from "src/components/Sections";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { Sample } from "src/components/Cards";
import useAutoScroll from "src/hooks/useAutoScroll";
import KeywordsInput from "./components/KeywordsInput/KeywordsInput"
import { LogoSubtract } from "src/components/Icons";
import { HeaderLogo } from "src/components/BrandAssets";

const mapStateToProps = (state) => {
  return {
    chatbot: state.chatbot,
    user: state.user,
    messages: state.messages,
    streaming: state.streamingText.isLoading,
    streamingText: state.streamingText.streamingText,
    uploading: state.uploading,
  };
};

const mapDispatchToProps = {
  createConversation,
  getConversations,
  getConversation,
  deleteConversation,
  abortStreamingTextRequest,
  errorMessage: (error) => {
    return {
      type: "CREATE_MESSAGE",
      payload: {
        role: "assistant",
        content: "Error: " + error.detail,
      },
    };
  },
};

const normalizeMessages = (messages) => {
  const normalizedMessages = messages?.map((message) => {
    return {
      role: message?.role,
      content: message?.content,
    };
  });
  return normalizedMessages;
};

function Chatbot({
  streaming,
  streamingText,
  errorMessage,
  getConversations,
  chatbot,
}) {
  const conversation = chatbot?.conversation;
  const [inputText, setInputText] = useState("");
  const [abortController, setAbortController] = useState(null);
  const generateRef = useRef(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [promptPopup, setPromptPopup] = useState(false);
  const fileUploadRef = useRef(null);
  const [chatError, setChatError] = useState(null);
  const { conversationBoxRef, generatingText, setGeneratingText } = useAutoScroll();
  const conversationRef = useRef(conversation);


  const handleError = (error) => {
    console.log("error", error);
    setChatError(error);
  };
  const { loading, error, response, postData } = useStream(
    `api/playground/chatbot/`,
    "POST",
    handleError
  );

  useEffect(() => {
    generateRef.current = generatingText;
  }, [generatingText])

  useEffect(() => {
    getConversations();
  }, [])

  useEffect(() => {
    if (error) {
      setNotStreaming();
      errorMessage(error);
      console.log("error", error);
    }
  }, [error]);

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
      <div className="flex-col self-stretch flex-1 bg-gray-black">
        <div className="flex text-sm text-gray4 t-c bg-gray2 model-name">
        </div>
        <div className="chat-right flex flex-1 bg-black relative pt-sm pb-lg">
          <div className="flex-col flex-1 h-[calc(100vh-184px)] overflow-auto" ref={conversationBoxRef}>
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
                        <span className="display-xs font-semibold">Keywords AI</span>
                      </div>
                      <span className="text-sm-md text-gray-3">
                        Connect to the best model for your prompts.
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
            {streamingText && (
              <ChatMessage
                message={{ content: streamingText, role: 'assistant' }}
              />
            )}
          </div>
          <div
            className="absolute flex flex-col items-center gap-md left-xxxl right-xxxl bottom-lg">
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
              <KeywordsInput placeholder={streaming ? "Generating..." : "Send a message..."} />
            </div>
            <div className="caption text-gray-4">
              Keywords AI connects your prompts with the best model automatically.{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
