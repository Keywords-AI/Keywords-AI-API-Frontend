import React from "react";
import { connect } from "react-redux";
import { createMessage } from "src/store/actions/messageAction";
import {
  createConversation,
  getConversations,
  deleteConversation,
} from "src/store/actions/conversationAction";
import readStream from "src/services/readStream";
import useStream from "src/hooks/useStream";
import { retrieveConversation } from "src/store/actions/conversationAction";
import {
  setStreaming,
  setNotStreaming,
} from "src/store/actions/streamingAction";
import { PanelChat } from "src/components/Sections";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import Popup from "./components/Popup/Popup";
import { Sample } from "src/components/Cards";
import useAutoScroll from "src/hooks/useAutoScroll";
import KeywordsInput from "./components/KeywordsInput/KeywordsInput";
import { LogoSubtract } from "src/components/Icons";
import { HeaderLogo } from "src/components/BrandAssets";
import { Modal } from "src/components/Dialogs";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
    messages: state.messages,
    conversation: state.conversation,
    streaming: state.streaming,
    uploading: state.uploading,
  };
};

const mapDispatchToProps = {
  createMessage,
  createConversation,
  getConversations,
  retrieveConversation,
  deleteConversation,
  setStreaming,
  setNotStreaming,
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
  user,
  streaming,
  setStreaming,
  setNotStreaming,
  conversations,
  // conversation,
  createMessage,
  errorMessage,
  createConversation,
  getConversations,
  retrieveConversation,
  deleteConversation,
  uploading,
}) {
  const [inputText, setInputText] = React.useState("");
  const [abortController, setAbortController] = React.useState(null);
  const generateRef = React.useRef(null);
  const [activeConversation, setActiveConversation] = React.useState(null);
  const [promptPopup, setPromptPopup] = React.useState(false);
  const fileUploadRef = React.useRef(null);
  const [chatError, setChatError] = React.useState(null);
  const { conversationBoxRef, generatingText, setGeneratingText } = useAutoScroll();
  const conversation = {
    // messages: [
    //   { role: "user", content: "Hello" },
    //   { role: "assistant", content: "Hello" },
    // ]
  }
  const conversationRef = React.useRef(conversation);


  const handleError = (error) => {
    console.log("error", error);
    setChatError(error);
  };
  const { loading, error, response, postData } = useStream(
    `api/playground/chatbot/`,
    "POST",
    handleError
  );

  const handleSend = (target) => {
    console.log("inputText", inputText);
    if (inputText && !streaming) {
      target.textContent = "";
      setInputText("");
      sendText(inputText);
    }
  };

  React.useEffect(() => {
    generateRef.current = generatingText;
  }, [generatingText])

  const sendText = (text) => {
    const newMessage = {
      conversation: conversation?.id,
      role: "user",
      content: text,
    };
    let allMessages;
    setStreaming();
    if (conversation?.id && conversation?.id !== -1) {
      allMessages = [...conversation?.messages, newMessage];
      createMessage(newMessage);
      postData({
        messages: normalizeMessages(allMessages),
        model: "gpt-4",
        stream: true,
      });
    } else {
      allMessages = [newMessage];
      createConversation(newMessage);
      postData({
        messages: normalizeMessages(allMessages),
        model: "gpt-4",
        stream: true,
      });
    }
  };
  // check
  const handleDelete = (id) => {
    const parsedId = parseInt(id);
    setActiveConversation(-1);
    deleteConversation(parsedId);
  };

  const addText = (text) => {
    try {
      const contentChunk = JSON.parse(text);
      const content = contentChunk.choices[0].delta.content;
      if (content) {
        setGeneratingText((prev) => prev + content);
      }
    } catch (error) {
      // Handle JSON parsing error here
    }
  };

  React.useEffect(() => {
    if (error) {
      setNotStreaming();
      errorMessage(error);
      console.log("error", error);
    }
  }, [error]);

  React.useEffect(() => {
    if (conversation?.id && conversation?.id !== -1) {
      setActiveConversation(conversation?.id);
      conversationRef.current = conversation;
      if (conversationBoxRef.current) {
        conversationBoxRef.current.scrollTop =
          conversationBoxRef.current.scrollHeight;
      }
    }
  }, [conversation]);

  const streamComplete = () => {
    setNotStreaming();
    console.log(generateRef.current, "generateRef.current")
    createMessage({
      conversation: conversation?.id,
      role: "assistant",
      content: generateRef.current,
    });
    setGeneratingText("");
    setAbortController(null);
  };

  React.useEffect(() => {
    if (response) {
      setAbortController(readStream(response, addText, streamComplete));
    }
  }, [response]);

  const handleInput = (e) => {
    setInputText(e.currentTarget.textContent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e.target);
    }
  };

  const handleStop = () => {
    if (abortController && typeof abortController === "object") {
      abortController.then((controller) => {
        controller();
      });
      setNotStreaming();
    }
  };

  return (
    <div className="flex-row h-[calc(100vh-56px)] self-stretch">
      <PanelChat
        setPromptPopup={setPromptPopup}
        handleStop={handleStop}
        createConversation={createConversation}
        getConversations={getConversations}
        conversations={conversations}
        activeConversation={activeConversation}
        retrieveConversation={retrieveConversation}
        setActiveConversation={setActiveConversation}
        handleDelete={handleDelete}
      />
      <Modal
        title="Custom prompt"
        subtitle="Add a system prompt or upload files. Custom settings coming soon."
        open={promptPopup}
        setOpen={setPromptPopup}>
        <Popup closePopup={() => {
          setPromptPopup(false);
        }} />
      </Modal>
      <div className="flex-col self-stretch flex-1 bg-gray-black">
        <div className="flex text-sm text-gray4 t-c bg-gray2 model-name">
          <div className="flex-row justify-center items-center gap-xxs self-stretch">
            <div
              className="hover-cp"
              onClick={() => {
                setPromptPopup(true);
              }}
            >
            </div>
          </div>
        </div>
        <div className="chat-right flex flex-1 bg-black relative pt-sm pb-lg">
          <div className="flex-col flex-1 h-[calc(100vh-184px)]" ref={conversationBoxRef}>
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
                {streaming && (
                  <div className="flex-col justify-center items-center gap-md self-stretch mt-[160px]">
                    <LogoSubtract />
                    <div className="flex-col justify-center items-center gap-xxxs self-stretch">
                      <div className="flex-row gap-xxs items-center">
                        <HeaderLogo />
                        <span className="display-sm">Keywords AI</span>
                      </div>
                      <div className="text-md-medium text-gray-3">
                        Connect to the best model for your prompts.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {generatingText && (
              <ChatMessage
                message={{ content: generatingText, role: 'assistant' }}
              />
            )}
          </div>
          <div
            className="absolute flex flex-col items-center gap-xs left-xxxl right-xxxl bottom-lg">
            {(!conversation?.messages ||
              (conversation?.messages?.length === 0 && !streaming)) && (
                <Sample sendText={sendText} />
              )}
            <div
              style={{
                position: "relative",
              }}
              className="flex-row self-stretch"
            >
              <KeywordsInput
                placeholder={streaming ? "Generating..." : "Send a message..."}
                streaming={streaming}
                handleInput={handleInput}
                handleKeyDown={handleKeyDown}
                handleSend={handleSend}
                handleStop={handleStop}
                abortController={abortController}
              />
            </div>
            <div className="caption text-gray-4">
              Keywords AI connects your prompts with the best model automatically.{" "}
              <a href="/" className="text-gray-4 underline">
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
