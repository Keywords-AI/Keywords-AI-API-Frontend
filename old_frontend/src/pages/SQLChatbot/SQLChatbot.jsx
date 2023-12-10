import React from "react";
import "./static/css/style.css";
import {
  ChatBox,
  Delete,
  ChatAvatar,
  ChatLogo,
  Send,
  Stop,
  Rocket,
  SmallerEdit,
  FileUpload,
} from "src/assets/svgs";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createMessage } from "src/store/actions/messageAction";
import {
  createConversation,
  getConversations,
  deleteConversation,
} from "src/store/actions/conversationAction";
import { useNavigate } from "react-router-dom";
import readStream from "src/services/readStream";
import useStream from "src/hooks/useStream";
import { retrieveConversation } from "src/store/actions/conversationAction";
import {
  setStreaming,
  setNotStreaming,
} from "src/store/actions/streamingAction";
import KeywordsLogo from "src/components/KeywordsLogo/KeywordsLogo";
import KeywordsInput from "src/components/Inputs/KeywordsInput/KeywordsInput";
import Popup from "./components/Popup/Popup";
import Sample from "./components/Sample/Sample";

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

function SQLChatbot({
  user,
  streaming,
  setStreaming,
  setNotStreaming,
  conversations,
  conversation,
  createMessage,
  createConversation,
  getConversations,
  retrieveConversation,
  deleteConversation,         
  uploading,
}) {
  const navigate = useNavigate();
  const [inputText, setInputText] = React.useState("");
  const { loading, error, response, postData } = useStream(
    "api/playground/sqlbot/"
  );
  const [generatingText, setGeneratingText] = React.useState("");
  const [abortController, setAbortController] = React.useState(null);
  const generateRef = React.useRef(null);
  const [activeConversation, setActiveConversation] = React.useState(null);
  const conversationRef = React.useRef(conversation);
  const conversationBoxRef = React.useRef(null);
  const [conversationHeight, setConversationHeight] = React.useState(0);
  const [isUserAtBottom, setIsUserAtBottom] = React.useState(true);
  const [promptPopup, setPromptPopup] = React.useState(false);
  const fileUploadRef = React.useRef(null);
  const handleSend = (target) => {
    if (inputText && !streaming) {
      target.textContent = "";
      setStreaming();
      const newMessage = {
        conversation: conversation?.id,
        role: "user",
        content: inputText,
      };
      setInputText("");
      let allMessages;
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
          temperature: 0
        });
      }
    }
  };

  const handleDelete = (id) => {
    const parsedId = parseInt(id);
    setActiveConversation(-1);
    deleteConversation(parsedId);
  };

  const addText = (text) => {
    const conversationBox = conversationBoxRef?.current;
    try {
      const contentChunk = JSON.parse(text);
      const content = contentChunk.choices[0].delta.content;
      if (content) {
        setGeneratingText((prev) => prev + content);
        setConversationHeight(conversationBox.scrollHeight);
      }
    } catch (error) {
      // Handle JSON parsing error here
    }
  };

  React.useEffect(() => {
    generateRef.current = generatingText;
  }, [generatingText]);

  React.useEffect(() => {
    getConversations();
  }, []);

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

  React.useEffect(() => {
    const conversationBox = conversationBoxRef.current;
    if (conversationBox) {
      const onScroll = () => {
        const atBottom =
          conversationBox.scrollTop + conversationBox.clientHeight >=
          conversationBox.scrollHeight - 5;
        setIsUserAtBottom(atBottom);
      };

      conversationBox.addEventListener("scroll", onScroll);
      return () => {
        conversationBox.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  React.useEffect(() => {
    const conversationBox = conversationBoxRef.current;
    if (conversationBox && isUserAtBottom) {
      conversationBox.scrollTop = conversationBox.scrollHeight;
    }
  }, [conversationHeight]);

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
    <div className="chatbot flex-row">
      {promptPopup && (
        <Popup
          setPromptPopup={setPromptPopup}
          closePopup={() => {
            setPromptPopup(false);
          }}
        />
      )}
      <div className="chat-left bg-black">
        <div className="flex-col justify-center items-center gap-md self-stretch" style={{ height: "calc(100% - 64px)" }}>
          <button
            className="button-secondary-white"
            style={{
              width: "100%",
            }}
            onClick={() => {
              handleStop();
              createConversation();
              getConversations();
            }}
          >
            <Rocket />
            New Chat
          </button>
          <div
            className="flex-col flex-1  "
            style={{
              overflow: "auto",
            }}
          >
            <div className="conversation-items">
              {conversations?.map((conversationItem, index) => (
                <button
                  key={index}
                  className={
                    "button-secondary-black" +
                    (conversationItem?.id === activeConversation
                      ? " active"
                      : "")
                  }
                  onClick={() => {
                    if (conversationItem?.id !== activeConversation) {
                      handleStop();
                      retrieveConversation(conversationItem?.id);
                      setActiveConversation(conversationItem?.id);
                    }
                  }}
                >
                  <div className={"flex-row self-stretch flex-1   space-between items-center"}>
                    <div className="flex-row justify-center items-center gap-xs self-stretch">
                      <ChatBox />
                      <div
                        className="text-md text-white"
                        style={{
                          display: "flex",
                          width: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {conversationItem?.name}
                      </div>
                    </div>
                    <Delete
                      handleDelete={() => handleDelete(conversationItem?.id)}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          className="button-secondary-white self-stretch"
          onClick={() => {
            navigate("/platform");
          }}
        >
          Home
        </button>
      </div>
      <div className="flex-col flex-1  ">
        <div className="text-md text-gray4 t-c bg-white model-name">
          <div className="flex-row justify-center items-center gap-xxs self-stretch">
            <span>
              {"Model: keywords-ai-8k  |  " +
                (uploading
                  ? "Uploading & Processing Your File..."
                  : "Custom Prompt: " +
                    (user?.sql_prompt_active ? "on" : "off"))}
            </span>
            <div
              onClick={() => {
                setPromptPopup(true);
              }}
            >
              <SmallerEdit />
            </div>
          </div>
        </div>
        <div className="chat-right bg-gray2">
          <div className="chat-messages-window" ref={conversationBoxRef}>
            {conversation?.messages?.length > 0 ? (
              <>
                {conversation?.messages?.map((message, index) => (
                  <div
                    key={index}
                    className={
                      `chat-message ` +
                      (message?.role === "user" ? "bg-gray2" : "bg-white")
                    }
                  >
                    <div className={"flex-row justify-center items-start gap-sm self-stretch"}>
                      {message?.role === "user" ? <ChatAvatar /> : <ChatLogo />}

                      <div className={"text-md"}>
                        <ReactMarkdown
                          children={message?.content}
                          components={{
                            pre: ({ node, ...props }) => (
                              <pre
                                {...props}
                                style={{ margin: 0 }}
                                className="format-pre"
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                {...props}
                                style={{ margin: 0, whiteSpace: "pre-line" }}
                                className="text-md"
                              />
                            ),
                            span: ({ node, ...props }) => (
                              <div {...props} className="t-pre-wrap" />
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div
                className="flex-col justify-center items-center gap-xs self-stretch"
                style={{
                  marginTop: "120px",
                  gap: "4px"
                }}
              >
                <KeywordsLogo />
                <div className="text-md t-medium text-gray3">
                  GPT-4 quality LLM at a fraction of the cost
                </div>
              </div>
            )}
            {generatingText && (
              <div className="chat-message bg-white">
                <div className="flex-row justify-center items-start gap-sm self-stretch">
                  <ChatLogo />
                  <div className="text-md">{generatingText}</div>
                </div>
              </div>
            )}
          </div>
          <div
            className="absolute-input-wrapper"
            style={{
              left: "120px",
              right: "120px",
              bottom: "32px",
              display: "flex",
              gap: "12px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {conversation?.messages?.length === 0 && <Sample/>}
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <KeywordsInput
                placeholder={"Send a message..."}
                streaming={streaming}
                handleInput={handleInput}
                handleKeyDown={handleKeyDown}
                handleSend={handleSend}
                handleStop={handleStop}
                abortController={abortController}
              />
            </div>
            <div className="caption text-gray4">
              Powered by{" "}
              <a href="/" className="text-gray4">
                Keywords AI
              </a>
            </div>
            <input type="file" hidden ref={fileUploadRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SQLChatbot);
