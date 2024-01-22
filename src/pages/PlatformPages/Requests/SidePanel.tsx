import { LogItem } from "src/types";
import { CopyButton, DotsButton } from "src/components/Buttons";
import { Divider } from "src/components/Sections";
import { useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { ModelTag, StatusTag } from "src/components/Misc";
import { Copy } from "src/components";
import { models } from "src/utilities/constants";

interface SidePanelProps {
  open: boolean;
}

export const SidePanel = ({ open }: SidePanelProps) => {
  const logItem = useTypedSelector(
    (state) => state.requestLogs.selectedRequest
  );
  const displayObj = {
    "Created at": (
      <span className="text-sm-regular text-gray-4">
        {new Date(logItem?.timestamp || "Aug 25, 8:03 PM").toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )}
      </span>
    ),
    Status: StatusTag(logItem?.failed || false),
    "API key": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.api_key || "production"}
      </span>
    ),
    Model: ModelTag(logItem?.model || "unknown"),
    "Prompt tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.prompt_tokens || "2312"}
      </span>
    ),
    "Completion tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.completion_tokens || "4220"}
      </span>
    ),
    "Total tokens": (
      <span className="text-sm-regular text-gray-4">
        {(logItem?.prompt_tokens &&
          logItem?.prompt_tokens &&
          logItem?.prompt_tokens + logItem?.completion_tokens) ||
          "6532"}
      </span>
    ),
    Cost: (
      <span className="text-sm-regular text-gray-4">
        {"$" + logItem?.cost.toFixed(6) || "-"}
      </span>
    ),
    Latency: (
      <span className="text-sm-regular text-gray-4">
        {(logItem?.latency.toFixed(3) || "-") + "s"}
      </span>
    ),
  };
  const getMessageType = (role: string) => {
    if (role === "system") {
      return "System";
    } else if (role === "user") {
      return "User";
    }
    return "Response";
  }
  return (
    <div
      className={cn(
        "flex-col items-start self-stretch shadow-border-l shadow-gray-2 bg-gray-1 overflow-x-hidden",
        open ? "w-[400px]" : "w-0"
      )}
    >
      <div className="flex px-lg py-xxs justify-between items-center self-stretch shadow-border-b shadow-gray-2">
        <p className="text-sm-md text-gray-4">Log</p>
        <DotsButton
          icon={Copy}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(logItem));
          }}
        />
      </div>
      <div className="flex-col py-md px-lg items-start gap-xs self-stretch">
        {Object.keys(displayObj).map((key, index) => {
          return (
            <div
              className="flex h-[24px] justify-between items-center self-stretch"
              key={index}
            >
              <span className="text-sm-md text-gray-5">{key}</span>
              {displayObj[key]}
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="flex-col items-start gap-xs self-stretch py-sm px-lg pb-[24px]">
        {logItem?.prompt_messages?.map((message, index) => (
          <div
            key={index}
            className="flex-col items-start gap-xxs self-stretch"
          >
            <div className="flex justify-between items-center self-stretch">
              <p className="text-sm-md text-gray-5">
                {getMessageType(message.role)}
              </p>
              <DotsButton
                icon={Copy}
                onClick={() => {
                  navigator.clipboard.writeText(message.content);
                }}
              />
            </div>
            <div className="flex whitespace-pre-wrap break-all py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular">
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
