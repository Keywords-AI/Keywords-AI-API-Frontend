import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  MostRecentPane,
  PlaygroundMessage,
  PromptLogs,
  SessionPane,
  TopBar,
} from "./components";
import { Button, CopyButton, DotsButton } from "src/components/Buttons";
import { Add, Copy, Divider, EnterKey, Pencil } from "src/components";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  appendMessage,
  getModels,
  resetModelOptions,
  setPrompt,
  setSelectedLogs,
  streamPlaygroundResponse,
} from "src/store/actions";
import { StreamingMessage } from "./components/PlaygroundMessage";
import { Tabs } from "src/components/Sections/Tabs/Tabs";
import { models } from "src/components/Misc";
import { useEffect, useRef, useState } from "react";
import SliderInput from "src/components/Inputs/SliderInput";
import { useForm, Controller } from "react-hook-form";
import { variantType } from "src/types";
import { AutoScrollContainer } from "react-auto-scroll-container";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
export default function Playground() {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const isStreaming = streamingStates.some((item) => item.isLoading === true);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getModels());
  }, []);
  const { enableScope, disableScope } = useHotkeysContext();
  useEffect(() => {
    enableScope("playground");
    return () => {
      disableScope("playground");
    };
  }, []);
  useHotkeys(
    "enter",
    () => {
      if (isStreaming) return;
      dispatch(streamPlaygroundResponse());
    },
    {
      scopes: "playground",
      preventDefault: true,
      // enableOnFormTags: true,
    }
  );
  // useHotkeys(
  //   "meta+enter",
  //   () => {
  //     if (isStreaming) return;
  //     dispatch(streamPlaygroundResponse());
  //   },
  //   {
  //     scopes: "playground",
  //     preventDefault: true,
  //     // enableOnFormTags: true,
  //   }
  // );
  return (
    <div className="flex-col items-start justify-center self-stretch h-[calc(100vh-52px)] max-w-[100vw]">
      <TopBar />
      <div className="flex items-start flex-1 self-stretch h-[calc(100vh-112px)]">
        {isLeftPanelOpen && <PromptLogs />}
        <Main />
        {isRightPanelOpen && <RightPanel />}
      </div>
    </div>
  );
}

const Main = () => {
  return (
    <div className="flex flex-1 px-lg pt-sm pb-md items-start self-stretch gap-sm">
      <PromptInput />
      <MessageLists />
    </div>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

const PromptInput = (selectedLogs) => {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const prompt = useTypedSelector((state) => state.playground.prompt);
  const dispatch = useTypedDispatch();
  return (
    <div className="flex w-[320px] flex-col gap-xxxs self-stretch">
      <div className="flex justify-between items-center self-stretch">
        <p className="text-sm-md text-gray-4">System</p>
        <div className="flex items-center">
          {/* <DotsButton icon={Pencil} /> */}
          <CopyButton text={prompt} />
        </div>
      </div>
      <TextAreaInput
        value={prompt}
        onChange={(e) => dispatch(setPrompt(e.target.value))}
        placeholder="You are a helpful assistant."
      />
    </div>
  );
};
connect(mapStateToProps, mapDispatchToProps)(PromptInput);

const MessageLists = () => {
  const messages = useTypedSelector((state) => state.playground.messages);
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const buttonRef = useRef(null);
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const isStreaming = streamingStates.some((item) => item.isLoading === true);
  const dispatch = useTypedDispatch();
  return (
    <div
      className="flex-col items-start gap-xxs  self-stretch  w-full"
      style={{
        maxWidth: `calc(100vw - 320px - ${
          isLeftPanelOpen ? "240px" : "0px"
        } - ${isRightPanelOpen ? "320px" : "0px"})`,
      }}
    >
      <AutoScrollContainer
        percentageThreshold={10}
        behavior="instant"
        className="flex-col items-start gap-xxs flex-1 h-[calc(100vh-150px)] overflow-y-auto pr-xxs self-stretch"
      >
        {messages.map((message, index) => {
          return (
            <PlaygroundMessage
              key={index}
              id={index}
              isLast={index === messages.length - 1}
              {...message}
            />
          );
        })}
        <StreamingMessage />
        <Button
          variant="small"
          text="Add message"
          icon={Add}
          ref={buttonRef}
          iconPosition="left"
          disabled={isStreaming}
          onClick={() => {
            if (isStreaming) return;

            dispatch(
              appendMessage({
                id: messages.length,
                role: "user",
                user_content: "",
              })
            );
            // buttonRef &&
            //   buttonRef.current &&
            //   (buttonRef.current as HTMLButtonElement).scrollIntoView({
            //     behavior: "instant",
            //     block: "end",
            //   });
          }}
        />
      </AutoScrollContainer>
      <div className="flex items-start gap-xxs">
        <Button
          variant="r4-primary"
          text="Submit"
          onClick={() => {
            if (isStreaming) return;
            dispatch(streamPlaygroundResponse());
          }}
        />
      </div>
    </div>
  );
};

const RightPanel = () => {
  const timestamp = useTypedSelector(
    (state) => state.playground.breakdownData.timestamp
  );
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const [isReset, setIsReset] = useState(false);
  const tabGroups = [
    {
      value: "Session",
      buttonVariant: "text" as variantType,
      content: <SessionPane isReset={isReset} />,
    },
    timestamp && {
      value: "Recent",
      buttonVariant: "text" as variantType,
      content: <MostRecentPane />,
    },
  ];
  const [tab, setTab] = useState(tabGroups[0].value);
  const dispatch = useTypedDispatch();

  return (
    <Tabs
      tabs={tabGroups}
      value={tab}
      onValueChange={(value) => setTab(value)}
      rootClassName="flex-col w-[320px] items-start self-stretch bg-gray-1 shadow-border-l shadow-gray-2 self-stretch overflow-auto"
      headerClassName="flex px-lg py-xxs items-center justify-between gap-sm self-stretch shadow-border-b shadow-gray-2"
      headerRight={
        <Button
          variant="text"
          text="Reset"
          onClick={() => {
            if (streamingStates.some((item) => item.isLoading === true)) return;

            setIsReset(true);
            setTimeout(() => {
              setIsReset(false);
            }, 100);
            dispatch(resetModelOptions());
          }}
        />
      }
    />
  );
};
