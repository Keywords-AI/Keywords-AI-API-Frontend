import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  MostRecentPane,
  PlaygroundMessage,
  PromptLogs,
  SessionPane,
  TopBar,
} from "./components";
import { Button, DotsButton } from "src/components/Buttons";
import { Copy, Divider, Pencil } from "src/components";
import { SelectInput, TextAreaInput } from "src/components/Inputs";
import { connect, useDispatch, useSelector } from "react-redux";
import { setPrompt, setSelectedLogs } from "src/store/actions";
import { StreamingMessage } from "./components/PlaygroundMessage";
import { Tabs } from "src/components/Sections/Tabs/Tabs";
import { models } from "src/components/Misc";
import { useState } from "react";
import SliderInput from "src/components/Inputs/SliderInput";
import { useForm, Controller } from "react-hook-form";
import { variantType } from "src/types";
import { AutoScrollContainer } from "react-auto-scroll-container";
export default function Playground() {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  return (
    <div className="flex-col items-start justify-center self-stretch h-[calc(100vh-52px)] ">
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
          <DotsButton icon={Pencil} />
          <DotsButton icon={Copy} />
        </div>
      </div>
      <TextAreaInput
        value={prompt}
        onChange={(e) => dispatch(setPrompt(e.target.value))}
      />
    </div>
  );
};
connect(mapStateToProps, mapDispatchToProps)(PromptInput);

const MessageLists = () => {
  const messages = useTypedSelector((state) => state.playground.messages);
  return (
    <AutoScrollContainer
      percentageThreshold={15}
      className="flex-col items-start gap-xxs flex-1 h-[calc(100vh-150px)] overflow-y-auto pr-xxs "
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
    </AutoScrollContainer>
  );
};

const RightPanel = () => {
  const tabGroups = [
    {
      value: "Session",
      buttonVariant: "text" as variantType,
      content: <SessionPane />,
    },
    {
      value: "Most recent",
      buttonVariant: "text" as variantType,
      content: <MostRecentPane />,
    },
  ];
  const [tab, setTab] = useState(tabGroups[0].value);
  return (
    <Tabs
      tabs={tabGroups}
      value={tab}
      onValueChange={(value) => setTab(value)}
      rootClassName="flex-col w-[320px] items-start self-stretch bg-gray-1 shadow-border-l shadow-gray-2"
      headerClassName="flex px-lg py-xxs items-center gap-sm self-stretch shadow-border-b shadow-gray-2"
    />
  );
};
