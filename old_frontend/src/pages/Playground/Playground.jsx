import React, { useEffect } from "react";
import KeywordsSelection from "src/components/KeywordsSelection/KeywordsSelection";
import useStream from "src/hooks/useStream";
import EditableBox from "src/components/Inputs/EditableBox/EditableBox";
import { connect } from "react-redux";
import readStream from "src/services/readStream";
import "./static/css/style.css";
import { AddMessage, Arrow } from "src/assets/svgs";
import PlaygroundMessage from "./PlaygroundMessage";
import CodeBox from "src/components/CodeBox/CodeBox";
import Popup from "src/components/Popup/Popup";
import { exampleCards } from "src/pages/Examples/Examples";
import useAutoScroll from "src/hooks/useAutoScroll";
import { Stop } from "../../assets/svgs";
import { KeywordsInputWrapper } from "../../components/KeywordsInputWrapper/KeywordsInputWrapper";
import { AutoScrollContainer } from "../../components/AutoScrollContainer/AutoScrollContainer";

const mapStateToProps = (state) => {
  return {
    User: state.User,
    example: state.example,
  };
};

const mapDispatchToProps = {
  pickExample: (example) => {
    return {
      type: "PICK_EXAMPLE",
      payload: example,
    };
  },
};

const initMessages = [];

function Playground({ user, example, pickExample }) {
  const [streaming, setStreaming] = React.useState(false);
  const [abortController, setAbortController] = React.useState(null);
  const [playgroundMessages, setPlaygroundMessages] =
    React.useState(initMessages);
  const initHeightRef = React.useRef(null);
  const [systemPrompt, setSystemPrompt] = React.useState(
    example.systemPrompt || ""
  );
  const streamingValueRef = React.useRef("");
  const { loading, error, response, postData } = useStream(
    "api/playground/ask/",
    "POST"
  );
  const messagesRef = React.useRef([]);
  const [showCode, setShowCode] = React.useState(false);

  // const {
  //   conversationBoxRef: messagesContainerRef,
  //   generatingText: streamingValue,
  //   setGeneratingText: setStreamingValue,
  // } = useAutoScroll();
  const [streamingValue, setStreamingValue] = React.useState("");

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // const messagesContainerRef = React.useRef(null);
  // const targetRef = React.useRef(null);
  // React.useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     for (let entry of entries) {
  //       if (entry.target === messagesContainerRef.current) {
  //         console.log("Container Height:", entry.contentRect.height, "px");
  //         if (targetRef.current) {
  //           const atBottom =
  //             messagesContainerRef.current.scrollTop +
  //               messagesContainerRef.current.clientHeight >=
  //             messagesContainerRef.current.scrollHeight - 5;
  //           if (atBottom && streaming) {
  //             targetRef.current.scrollIntoView({ behavior: "smooth" });
  //             targetRef.current.focus();
  //             console.log("scroll");
  //           }
  //         }
  //       }
  //     }
  //   });

  //   if (messagesContainerRef.current) {
  //     resizeObserver.observe(messagesContainerRef.current);
  //   }

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [messagesContainerRef, streaming]);
  React.useEffect(() => {
    if (example) {
      console.log(example);
      setSystemPrompt(example.systemPrompt || "");
      setPlaygroundMessages([
        {
          role: "User",
          content: example.userPrompt || "",
        },
      ]);
    }
  }, [example]);

  React.useEffect(() => {
    if (playgroundMessages.length > 0) {
      messagesRef.current = playgroundMessages;
    }
  }, [playgroundMessages]);

  const handleStream = (text) => {
    try {
      const contentChunk = JSON.parse(text);
      const content = contentChunk.choices[0].delta.content;
      if (content) {
        setStreamingValue((prev) => {
          return prev + content;
        });
      }
    } catch (error) {
      // Handle JSON parsing error here
    }
  };

  const handleInput = (e, index) => {
    setPlaygroundMessages((prev) => {
      const newMessages = [...prev];
      newMessages[index].content = e.target.value;
      return newMessages;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = (e) => {
    if (streaming) return;
    setStreaming(true);
    let finalMessages = messagesRef?.current?.map((message) => ({
      ...message,
      role: message.role.toLowerCase(),
    }));

    if (systemPrompt) {
      finalMessages = [
        {
          role: "system",
          content: systemPrompt,
        },
        ...finalMessages,
      ];
    }
    console.log(finalMessages);
    try {
      postData({ messages: finalMessages, stream: true });
    } catch (error) {
      console.log("detect");
    }
  };

  React.useEffect(() => {
    if (streamingValue) {
      streamingValueRef.current = streamingValue;
    }
  }, [streamingValue]);

  const streamComplete = () => {
    setPlaygroundMessages((prev) => {
      return [
        ...prev,
        {
          role: "Assistant",
          content: streamingValueRef.current,
        },
      ];
    });

    setStreamingValue("");

    setTimeout(() => setStreaming(false), 500);
    setAbortController(null);
  };

  useEffect(() => {
    if (response) {
      const callBack = (text) => handleStream(text);

      setAbortController(readStream(response, callBack, streamComplete));
    }
  }, [response]);
  const handleStop = () => {
    if (abortController && typeof abortController === "object") {
      abortController.then((controller) => {
        controller();
      });
      setTimeout(() => setStreaming(false), 500);
    }
  };
  const handleDelete = (index) => {
    setPlaygroundMessages((prev) => {
      const newMessages = [...prev];
      newMessages.splice(index, 1);
      return newMessages;
    });
  };

  return (
    <div
      className="flex flex-col self-stretch flex-1"
      style={{
        maxHeight: "calc(100vh - 53px)",
      }}
    >
      <div
        className="platform-right-container playground bg-white gap-lg p-lg"
        style={{
          marginLeft: 0,
        }}
      >
        <Popup
          open={showCode}
          closePopup={() => {
            setShowCode(false);
          }}
        >
          <div
            className="view-code-modal bg-white"
            style={{
              overflow: "auto",
            }}
          >
            <div className="flex-col self-stretch gap-xs">
              <div className="display-xs">View Code</div>
              <div className="text-md t-medium">
                You can use the following code to start integrating your current
                prompt and settings into your application.
              </div>
            </div>
            <CodeBox codeObjs={example?.apiRequests || []} />
            <div className="text-md t-medium">
              <span>{"Your API key can be found "}</span>
              <a
                className="text-md t-medium text-primary"
                style={{ textDecoration: "none" }}
                href="/platform/get-api-key"
              >
                {"here"}
              </a>
              <span>
                {
                  " You should use environment variables or a secret management tool to expose your key to your applications."
                }
              </span>
            </div>
            <div className="flex-row self-stretch justify-end">
              <button
                className="button-tertiary-white"
                onClick={() => {
                  setShowCode(false);
                }}
              >
                {"Close"}
              </button>
            </div>
          </div>
        </Popup>

        <div className="flex-row self-stretch space-between items-center">
          <div className="display-sm">Playground</div>
          <div className="flex-row justify-start items-center gap-xs self-stretch">
            <div
              style={{
                width: "280px",
              }}
            >
              <KeywordsInputWrapper>
                <KeywordsSelection
                  placeholder="Select from examples"
                  choices={exampleCards}
                  retrieveText={(option) => {
                    return option.title;
                  }}
                  handleSelected={(option) => {
                    pickExample(option);
                  }}
                />
              </KeywordsInputWrapper>
            </div>
            <button
              className="button-primary"
              onClick={() => {
                setShowCode((prev) => !prev);
              }}
            >
              {"View code"}
            </button>
          </div>
        </div>
        <div className="flex-row gap-lg items-start justify-start self-stretch flex-1  ">
          <div
            className="flex-col justify-start items-start self-stretch gap-xxs system-prompt left-panel"
            style={{
              width: "400px",
              flexShrink: 0,
            }}
          >
            <div className="text-md text-gray4">System</div>
            <textarea
              name="system-prompt"
              value={systemPrompt}
              style={{
                border: "none",
                resize: "none",
              }}
              placeholder="You are a helpful assistant."
              className="text-md bg-white text-black flex-row flex-1   self-stretch px-xxs py-xs b-gray3"
              onInput={(e) => {
                setSystemPrompt(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="flex-col justify-center items-start gap-md self-stretch flex-1   right-panel">
            <AutoScrollContainer className="user-and-answer flex-col justify-start items-center gap-xs self-stretch flex-1">
              {playgroundMessages.map((message, index) => (
                <PlaygroundMessage
                  index={index}
                  handleDelete={handleDelete}
                  message={message}
                  key={index}
                  handleInput={(e) => handleInput(e, index)}
                  streaming={streaming}
                />
              ))}
              {streamingValue && !error && (
                <div
                  className={`flex-col justify-start items-start self-stretch gap-xxs ${"bg-white"}`}
                >
                  <div className="text-md t-medium">{"Keywords AI"}</div>
                  <EditableBox
                    value={streamingValue}
                    placeholder={"Generating..."}
                    disableEdit={true}
                  />
                </div>
              )}
              {!streaming ? (
                <div
                  className="flex-row justify-start items-center gap-xxs self-stretch bg-white"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (streaming) return;
                    setPlaygroundMessages((prev) => {
                      const lastMessage = prev[prev.length - 1];
                      if (lastMessage?.role === "User") {
                        return [
                          ...prev,
                          {
                            role: "Assistant",
                            content: "",
                          },
                        ];
                      } else {
                        return [
                          ...prev,
                          {
                            role: "User",
                            content: "",
                          },
                        ];
                      }
                    });
                  }}
                >
                  <AddMessage />
                  <span className="text-primary">Add message</span>
                </div>
              ) : (
                <div
                  className="flex-row justify-start items-center gap-xxs self-stretch bg-white"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleStop}
                >
                  <Stop />
                  <span className="text-primary">Stop generating</span>
                </div>
              )}
              {error && (
                <PlaygroundMessage
                  index={-1}
                  message={error.detail || "error"}
                  error={true}
                />
              )}
            </AutoScrollContainer>
            <div className="flex-row justify-start items-center gap-sm self-stretch">
              <button className="button-primary" onClick={handleSend}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
