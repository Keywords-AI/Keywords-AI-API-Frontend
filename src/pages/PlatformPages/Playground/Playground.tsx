import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  MostRecentPane,
  PlaygroundMessage,
  PromptLogs,
  SessionPane,
  TopBar,
} from "./components";
import { Button, CopyButton, DotsButton } from "src/components/Buttons";
import { v4 as uuidv4 } from "uuid";
import {
  Add,
  AlphanumericKey,
  Copy,
  Divider,
  EnterKey,
  Pencil,
} from "src/components";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  appendMessage,
  getModels,
  resetModelOptions,
  setFocusIndex,
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
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import Tooltip from "src/components/Misc/Tooltip";
import { AutoScrollContainer } from "src/components/Misc/ScrollContainer";
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
    <div className="flex-col items-start justify-start self-stretch flex-1 h-full w-full">
      <TopBar />
      <div className="flex items-start flex-1 self-stretch h-full">
        {/* {isLeftPanelOpen && <PromptLogs />} */}
        <Main />
        {isRightPanelOpen && <RightPanel />}
      </div>
    </div>
  );
}

const Main = () => {
  return (
    <div className="flex w-full px-lg pt-sm pb-md items-start h-[calc(100dvh-52px)] gap-sm">
      {/* <PromptInput /> */}
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
  useHotkeys(
    "a",
    () => {
      if (isStreaming) return;
      dispatch(
        appendMessage({
          id: uuidv4(),
          role: "user",
          user_content: "",
        })
      );
      dispatch(setFocusIndex(messages.length));
      setActivate(true);
    },
    { scopes: "playground", preventDefault: true }
  );
  const messages = useTypedSelector((state) => state.playground.messages);
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const buttonRef = useRef(null);
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  const [activate, setActivate] = useState(false);
  useEffect(() => {
    if (activate) {
      setActivate(false);
    }
  }, [activate]);
  const streamingStates = useTypedSelector((state) => state.streamingText);
  const isStreaming = streamingStates.some((item) => item.isLoading === true);
  const dispatch = useTypedDispatch();
  return (
    <div className="flex-col items-start gap-xxs  self-stretch h-full  w-full overflow-hidden">
      <AutoScrollContainer
        percentageThreshold={15}
        behavior="auto"
        active={isStreaming || activate}
        className="flex-col items-start gap-xxs flex-1 h-full overflow-y-auto pr-xxs w-full "
      >
        {messages.map((message, index) => {
          return (
            <PlaygroundMessage
              index={index}
              key={index}
              id={index}
              isLast={index === messages.length - 1}
              {...message}
            />
          );
        })}
        <StreamingMessage />
        <Tooltip
          side="bottom"
          sideOffset={8}
          align="start"
          delayDuration={1}
          content={
            <>
              <p className="caption text-gray-4">Add message</p>
              <AlphanumericKey value={"A"} />
            </>
          }
        >
          <div>
            <Button
              variant="small"
              text="Add message"
              icon={Add}
              ref={buttonRef}
              iconPosition="left"
              disabled={isStreaming}
              onClick={(e) => {
                if (isStreaming) return;
                dispatch(
                  appendMessage({
                    id: uuidv4(),
                    role: "user",
                    user_content: "",
                  })
                );
                setActivate(true);
              }}
            />
          </div>
        </Tooltip>
      </AutoScrollContainer>
      <div className="flex items-center gap-xs">
        <Button
          variant="r4-primary"
          text="Submit"
          onClick={() => {
            if (isStreaming) return;
            dispatch(streamPlaygroundResponse());
          }}
        />
        <div className="flex gap-xxxs items-center">
          <p className="caption text-gray-4 flex">Enter to submit</p>
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.31429 0V2.97143C7.31429 4.61257 5.984 5.94286 4.34286 5.94286H1.75086L3.16343 7.35543L2.51429 8L0 5.48571L2.51429 2.97143L3.15886 3.616L1.75086 5.02857H4.34286C5.48571 5.02857 6.4 4.11429 6.4 2.97143V0H7.31429Z"
              fill="#B1B3BC"
            />
          </svg>
        </div>
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
      content: (
        <div className="flex-col flex-1 self-stretch overflow-auto">
          <SessionPane isReset={isReset} />
        </div>
      ),
      // tooltip: (
      //   <>
      //     <p className="caption text-gray-4">View session</p>
      //     <AlphanumericKey value={"←"} />
      //   </>
      // ),
    },
    timestamp
      ? {
          value: "Recent",
          buttonVariant: "text" as variantType,
          content: (
            <div className="flex-col flex-1 self-stretch overflow-auto">
              <MostRecentPane />
            </div>
          ),
          // tooltip: (
          //   <>
          //     <p className="caption text-gray-4">View Recent</p>
          //     <AlphanumericKey value={"→"} />
          //   </>
          // ),
        }
      : null,
  ].filter(Boolean);
  const { enableScope, disableScope } = useHotkeysContext();
  useEffect(() => {
    enableScope("rightPanel");
    return () => {
      disableScope("rightPanel");
    };
  }, []);
  const isStreaming = streamingStates.some((item) => item.isLoading === true);
  useHotkeys(
    "right",
    () => {
      if (isStreaming) return;
      const currentIndex = tabGroups.findIndex((p) => p!.value === tab);
      const nextIndex =
        (currentIndex + 1 + tabGroups.length) % tabGroups.length;
      const nextTab = tabGroups[nextIndex];
      setTab(nextTab!.value);
    },
    { scopes: "rightPanel", preventDefault: true }
  );
  useHotkeys(
    "left",
    () => {
      if (isStreaming) return;
      // dispatch(toggleRightPanel());
      const currentIndex = tabGroups.findIndex((p) => p!.value === tab);
      const nextIndex =
        (currentIndex - 1 + tabGroups.length) % tabGroups.length;
      const nextTab = tabGroups[nextIndex];
      setTab(nextTab!.value);
    },
    { scopes: "rightPanel", preventDefault: true }
  );
  useHotkeys(
    "r",
    () => {
      if (streamingStates.some((item) => item.isLoading === true)) return;

      setIsReset(true);
      setTimeout(() => {
        setIsReset(false);
      }, 100);
      dispatch(resetModelOptions());
    },
    { scopes: "rightPanel", preventDefault: true }
  );
  useEffect(() => {
    if (!timestamp && tab === "Recent") setTab("Session");
  }, [timestamp]);
  const [tab, setTab] = useState(tabGroups[0]!.value);
  const dispatch = useTypedDispatch();

  return (
    <Tabs
      tabs={tabGroups}
      value={tab}
      onValueChange={(value) => setTab(value)}
      rootClassName="flex-col w-[320px] items-start self-stretch bg-gray-1 shadow-border-l shadow-gray-2 self-stretch overflow-auto shrink-0"
      headerClassName="flex px-lg py-xxs items-center justify-between gap-sm self-stretch shadow-border-b shadow-gray-2"
      headerRight={
        <Tooltip
          side="bottom"
          sideOffset={2}
          align="end"
          delayDuration={1}
          content={
            <>
              <p className="caption text-gray-4">Reset settings</p>
              <AlphanumericKey value={"R"} />
            </>
          }
        >
          <div>
            <Button
              variant="text"
              text="Reset"
              textColor="text-gray-3"
              textHoverColor="text-red"
              textClickedColor="text-red"
              onClick={() => {
                if (streamingStates.some((item) => item.isLoading === true))
                  return;

                setIsReset(true);
                setTimeout(() => {
                  setIsReset(false);
                }, 100);
                dispatch(resetModelOptions());
              }}
            />
          </div>
        </Tooltip>
      }
    />
  );
};
