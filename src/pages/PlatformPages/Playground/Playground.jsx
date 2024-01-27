import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { PlaygroundMessage, PromptLogs, TopBar } from "./components";
import { DotsButton } from "src/components/Buttons";
import { Copy, Pencil } from "src/components";
import { TextAreaInput } from "src/components/Inputs";
import { connect, useDispatch, useSelector } from "react-redux";
import { setPrompt, setSelectedLogs } from "src/store/actions";
import { StreamingMessage } from "./components/PlaygroundMessage";

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
    <div className="flex-col items-start gap-xxs flex-1 h-[calc(100vh-150px)] overflow-auto pr-xxs">
      {messages.map((message, index) => {
        return <PlaygroundMessage key={index} id={index} {...message} />;
      })}
      <StreamingMessage />
    </div>
  );
};
