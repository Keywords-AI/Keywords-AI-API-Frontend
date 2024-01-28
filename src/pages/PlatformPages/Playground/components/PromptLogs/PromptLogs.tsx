import { useEffect, useState } from "react";
import ScrollContainer from "src/components/Display/ScrollContainer";
import cn from "src/utilities/classMerge";
import { connect, useDispatch, useSelector } from "react-redux";
import { LogItem } from "src/types";
import { RootState } from "src/types";
import { setSelectedLogs, setPrompt, getRequestLogs } from "src/store/actions";

export interface PromptLogsProps {
  prop?: string;
  requestLogs: LogItem[];

  getRequestLogs: any; // Add the requestLogs property
}

const mapStateToProps = (state: RootState) => ({
  requestLogs: state.requestLogs.logs as LogItem[],
});

const mapDispatchToProps = {
  setPrompt,
  getRequestLogs,
};

function PromptLogsNotConnected({
  prop = "default value",
  requestLogs,
  getRequestLogs,
}: PromptLogsProps) {
  const [selectedLog, setSelectedLog] = useState<number>(-1);
  useEffect(() => {
    getRequestLogs();
  }, []);

  const handleClick = (index: number, prompt: string) => {
    setSelectedLog(index);
    setPrompt(prompt);
  };
  return (
    <div className="flex-col w-[240px] items-start self-stretch shadow-border-r shadow-gray-2 overflow-auto h-full">
      {requestLogs.map((requestLog, index) => {
        let content;
        requestLog?.prompt_messages?.map((message, index) => {
          if (message.role === "system") {
            content = message.content;
          }
        });
        return (
          <LogItem
            key={index}
            prompt={content}
            timeframe={requestLog?.timestamp}
            isSelected={selectedLog === index}
            onClick={() => handleClick(index, content)}
          />
        );
      })}
    </div>
  );
}

const LogItem = ({
  prompt,
  timeframe,
  isSelected,
  onClick,
}: {
  prompt: string;
  timeframe: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return (
    <div className="shadow-border-b shadow-gray-2">
      <div
        className={cn(
          "flex-col px-lg py-xs justify-center items-start gap-xxs self-stretch   h-[112px] cursor-pointer relative ",
          isSelected ? "bg-gray-2" : "bg-inherit"
        )}
        onClick={onClick}
      >
        {isSelected && (
          <div className="w-[4px] h-full absolute left-0 bg-gray-5"></div>
        )}
        <div className="caption text-gray-4">
          {new Date(timeframe).toLocaleString("en-US", options)}
        </div>

        <div className="flex justify-center items-start gap-[10px] self-stretch  h-full">
          <p
            className={cn(
              "caption  line-clamp-4 ",
              isSelected ? "text-gray-5" : "text-gray-4"
            )}
          >
            {prompt}
          </p>
        </div>
      </div>
    </div>
  );
};

export const PromptLogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(PromptLogsNotConnected);
