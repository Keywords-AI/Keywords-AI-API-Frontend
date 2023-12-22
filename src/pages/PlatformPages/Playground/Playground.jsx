import {
  AddMessage,
  Right,
  Button,
  Divider,
  Regenerate,
  Stop,
} from "src/components";
import {
  CurrentModel,
  OptionSelector,
  ModelOutput,
  PlaygroundMessage,
  DotsMenu,
} from "./components";
import React, { useEffect } from "react";
import {
  setMessages,
  setPrompt,
  setFirstTime,
  setCacheAnswer,
  appendMessage,
  removeLastMessage,
} from "src/store/actions/playgroundAction";
import { connect } from "react-redux";
import useAutoScroll from "src/hooks/useAutoScroll";
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import store from "src/store/store";
import { abortStreamingTextRequest } from "src/store/actions/streamingTextAction";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
const mapStateToProps = (state) => {
  return {
    messages: state.playground.messages,
    prompt: state.playground.prompt,
    streaming: state.streamingText.isLoading,
    streamingText: state.streamingText.streamingText,
    firstTime: state.playground.firstTime,
    currentModel: state.playground.currentModel,
    systemPrompt: state.playground.prompt,
  };
};

const mapDispatchToProps = {
  setMessages,
  setPrompt,
  setFirstTime,
  setCacheAnswer,
  appendMessage,
  removeLastMessage,
  abortStreamingTextRequest,
};

const Prompt = ({ setPrompt }) => {
  const handleOnChange = (event) => {
    setPrompt(event.target.value);
  };
  return (
    <div className="flex-col w-[320px] self-stretch justify-center items-start gap-xxs">
      <TextAreaInput
        placeholder="You are a helpful assistant."
        onChange={handleOnChange}
        title="System prompt"
        name="prompt"
      />
    </div>
  );
};
const ConnectedPrompt = connect(null, mapDispatchToProps)(Prompt);
const NotConnectedMap = ({
  messages,
  streaming,
  streamingText,
  currentModel,
  setFirstTime,

  abortStreamingTextRequest,
}) => {
  const { conversationBoxRef, generatingText, setGeneratingText } =
    useAutoScroll();
  const handleAddMessage = () => {
    setMessages([...messages, { role: "user", content: "" }]);
  };

  useEffect(() => {
    if (streamingText) {
      setGeneratingText(streamingText);
      setFirstTime(false);
    }
  }, [streamingText]);

  return (
    <div className="flex-col p-lg items-start gap-lg flex-1 self-stretch max-h-full">
      <div className="flex justify-between items-start self-stretch">
        <div className="flex-co items-start gap-sm display-sm text-gray-white">
          Playground
        </div>
        <div className="flex items-start gap-xs">
          <SelectInput width="w-[248px]" headLess />
          <DotsMenu />
        </div>
      </div>
      <div className="flex items-start gap-md flex-1 self-stretch h-[calc(100vh-190.5px)]">
        <ConnectedPrompt />
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
              role={currentModel}
              content={streamingText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Main = connect(mapStateToProps, mapDispatchToProps)(NotConnectedMap);

const NotConnectSidePannel = ({
  appendMessage,
  removeLastMessage,
  systemPrompt,
  currentModel,
  streaming,
  messages,
  firstTime,
}) => {
  const handleRegenerate = (event) => {
    event.stopPropagation();
    if (streaming) return;
    removeLastMessage();
    removeLastMessage();

    sendStreamingTextThunk({
      params: {
        messages: store.getState().playground.messages,
        stream: true,
        model: currentModel,
      },
      host: "https://platform.keywordsai.co/",
      path: "api/playground/ask/",
      prompt: systemPrompt,
      callback: () => {
        // this is the callback function after the streaming text is done
        const streamingText = store.getState().streamingText.streamingText;
        const currentModel = store.getState().playground.currentModel;
        const newMessage = {
          role: currentModel,
          content: streamingText,
        };
        appendMessage(newMessage);
        const lastUserMessageIndex = messages.reduce(
          (lastIndex, message, currentIndex) => {
            if (message.role === "user") {
              return currentIndex;
            }
            return lastIndex;
          },
          -1
        );
        const cache = {
          answer: streamingText,
          index: lastUserMessageIndex,
        };
        appendMessage({ role: "user", content: "" });
        setCacheAnswer(currentModel, cache);
      },
      dispatch: store.dispatch,
      getState: store.getState,
    });
  };
  return (
    <div className="flex-col w-[320px] p-lg gap-md items-start self-stretch shadow-border-l shadow-gray-3 overflow-y-auto bg-gray-2">
      <OptionSelector />
      {!firstTime && <Divider />}
      <CurrentModel />
      <ModelOutput />
      <div className="flex-col gap-xxs">
        {!firstTime && (
          <Button
            variant="small"
            text="Regenerate"
            icon={Regenerate}
            onClick={handleRegenerate}
          />
        )}

        {streaming && (
          <Button
            variant="small"
            text="Stop generate"
            icon={Stop}
            onClick={() => abortStreamingTextRequest()}
          />
        )}
      </div>
    </div>
  );
};

const SidePannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectSidePannel);

export default function Playground() {
  return (
    <div className="flex items-start justify-center self-stretch h-[calc(100vh-52.8px)] ">
      <Main />
      <SidePannel />
    </div>
  );
}
