import { useState } from "react";
import ScrollContainer from "src/components/Display/ScrollContainer";
import cn from "src/utilities/classMerge";

export interface PromptLogsProps {
  prop?: string;
}

export function PromptLogs({ prop = "default value" }: PromptLogsProps) {
  const [selectedLog, setSelectedLog] = useState<number>(-1);
  const Logs = [
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
    {
      prompt:
        "Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see Compose an engaging travel blog post about a recent trip to Hawaii, highlighting cultural experiences and must-see",
      timeframe: new Date().toISOString(),
    },
  ];
  return (
    <div className="flex-col w-[240px] items-start self-stretch shadow-border-r shadow-gray-2 overflow-auto h-full">
      {Logs.map((log, index) => (
        <LogItem
          key={index}
          prompt={log.prompt}
          timeframe={log.timeframe}
          isSelected={selectedLog === index}
          onClick={() => setSelectedLog(index)}
        />
      ))}
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
