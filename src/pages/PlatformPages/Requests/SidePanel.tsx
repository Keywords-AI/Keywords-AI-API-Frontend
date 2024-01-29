import { LogItem } from "src/types";
import {
  Button,
  CopyButton,
  DotsButton,
  IconButton,
} from "src/components/Buttons";
import { Divider } from "src/components/Sections";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { ModelTag, StatusTag, SentimentTag } from "src/components/Misc";
import { Copy, IconPlayground, Info } from "src/components";
import { models } from "src/utilities/constants";
import React, { useState } from "react";
import { RestorePlaygroundState } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import Tooltip from "src/components/Misc/Tooltip";

interface SidePanelProps {
  open: boolean;
}

export const SidePanel = ({ open }: SidePanelProps) => {
  const logItem = useTypedSelector(
    (state) => state.requestLogs.selectedRequest
  );
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const completeInteraction =
    logItem?.prompt_messages?.concat([logItem?.completion_message]) || [];
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
    Status: StatusTag({ failed: logItem?.failed || false }),
    "API key": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.api_key || "production"}
      </span>
    ),
    Model: ModelTag({ model: logItem?.model || "unknown" }),
    "Prompt tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.prompt_tokens?.toLocaleString() || "2,312"}
      </span>
    ),
    "Completion tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.completion_tokens?.toLocaleString() || "4,220"}
      </span>
    ),
    "Total tokens": (
      <span className="text-sm-regular text-gray-4">
        {(
          (logItem?.prompt_tokens &&
            logItem?.prompt_tokens &&
            logItem?.prompt_tokens + logItem?.completion_tokens) ||
          "6,532"
        ).toLocaleString()}
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
    TTFT: (
      <span className="text-sm-regular text-gray-4">
        {(logItem?.ttft?.toFixed(2) || "-") + "s"}
      </span>
    ),
    Sentiment: (
      <SentimentTag
        sentiment_score={logItem?.sentiment_analysis?.sentiment_score || 0}
      />
    ),
  };
  const getMessageType = (role: string) => {
    if (role === "system") {
      return "System";
    } else if (role === "user") {
      return "User";
    }
    return "Response";
  };
  const [displayLog, setDisplayLog] = useState(false);
  return (
    <div
      className={cn(
        "flex-col items-start self-stretch shadow-border-l flex-shrink-0 relative",
        "shadow-gray-2 bg-gray-1 overflow-x-hidden",
        open ? "w-[400px]" : "w-0"
      )}
    >
      <div className="flex px-lg py-xxs justify-between h-[44px] w-[inherit] items-center shadow-border-b shadow-gray-2 fixed bg-gray-1">
        <div className="flex items-center gap-sm">
          <Button
            variant="text"
            text="Metrics"
            active={!displayLog}
            onClick={() => setDisplayLog(false)}
            padding="py-0"
          />
          <Button
            variant="text"
            text="Log"
            active={displayLog}
            onClick={() => setDisplayLog(true)}
            padding="py-0"
          />
        </div>
        {/* <div className="flex items-center">
          {displayLog && (
            <DotsButton
              icon={IconPlayground}
              onClick={() => {
                dispatch(
                  RestorePlaygroundState(
                    logItem,
                    navigate("/platform/playground")
                  )
                );
              }}
            />
          )}
          <DotsButton
            icon={Copy}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(logItem));
            }}
          />
        </div> */}
      </div>
      <div className="flex-col items-start self-stretch mt-[44px]">
        {!displayLog && (
          <div className="flex-col pt-sm py-md px-lg items-start gap-xs self-stretch">
            {Object.keys(displayObj).map((key, index) => {
              return (
                <div
                  className="flex h-[24px] justify-between items-center self-stretch"
                  key={index}
                >
                  <div className="flex items-center gap-xxs">
                    <span className="text-sm-md text-gray-5">{key}</span>
                    {key === "TTFT" && (
                      <Tooltip
                      side="right"
                      sideOffset={8}
                        content={
                          <>
                            <span>Time to first generated token</span>
                          </>
                        }
                      >
                        <div>
                          <IconButton icon={Info} />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  {displayObj[key]}
                </div>
              );
            })}
          </div>
        )}
        {displayLog &&
          completeInteraction.map((message, index) => (
            <React.Fragment key={index}>
              <div
                key={index}
                className="flex-col items-start gap-xxxs self-stretch pt-sm px-lg pb-md"
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
                <div className="flex whitespace-pre-wrap py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-keep">
                  {message.content}
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
