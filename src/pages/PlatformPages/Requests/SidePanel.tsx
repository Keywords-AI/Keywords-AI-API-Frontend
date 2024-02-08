import { LogItem } from "src/types";
import {
  Button,
  CopyButton,
  DotsButton,
  IconButton,
  SwitchButton,
} from "src/components/Buttons";
import { Divider } from "src/components/Sections";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";
import { ModelTag, StatusTag, SentimentTag, Tag } from "src/components/Misc";
import { Copy, IconPlayground, Info } from "src/components";
import { models } from "src/utilities/constants";
import React, { useEffect, useRef, useState } from "react";
import { RestorePlaygroundState, setCacheResponse } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import Tooltip from "src/components/Misc/Tooltip";
import SearchLog from "./SearchLog";

interface SidePanelProps {
  open: boolean;
}

export const SidePanel = ({ open }: SidePanelProps) => {
  const logItem = useTypedSelector(
    (state) => state.requestLogs.selectedRequest
  );

  const cache_id =
    useTypedSelector(
      (state) => state.requestLogs.selectedRequest?.cached_response
    ) || 0;
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(cache_id > 0);
  useEffect(() => {
    setChecked(cache_id > 0);
  }, [cache_id]);
  const handleCheckCacheReponse = (checked: boolean) => {
    try {
      dispatch(setCacheResponse(checked));
      setChecked(checked);
    } catch (error) {
      console.error("Error setting cache response", error);
    }
  };

  const [completeInteraction, setCompleteInteraction] = useState<any[]>([]);
  useEffect(() => {
    setCompleteInteraction(
      logItem?.prompt_messages
        ? [...logItem.prompt_messages.concat([logItem?.completion_message])]
        : []
    );
  }, [logItem]);
  const systemPrompt = completeInteraction.find(
    (item) => item.role === "[system]"
  );
  if (systemPrompt) {
    setCompleteInteraction(
      completeInteraction.filter((item) => item !== systemPrompt)
    );
  }
  const searchContent = (keyword) => {
    if (keyword === "") {
      setCompleteInteraction(
        logItem?.prompt_messages
          ? [...logItem.prompt_messages.concat([logItem?.completion_message])]
          : []
      );
      return;
    }
    const filteredInteraction = completeInteraction.filter((item) =>
      item.content.toLowerCase().includes(keyword.toLowerCase())
    );
    setCompleteInteraction(filteredInteraction);
  };
  const displayObj = {
    "Request ID": (
      <span className="text-sm-regular text-gray-4">{logItem?.id || "-"}</span>
    ),
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

    Cached: logItem?.cached_response ? (
      <Tag
        text={"Cached"}
        backgroundColor="bg-primary/10"
        textColor="text-primary"
        border=""
      />
    ) : (
      <span className="text-sm-regular text-gray-4">{"No"}</span>
    ),
    "Completion tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.completion_tokens?.toLocaleString() || "4,220"}
      </span>
    ),
    "Prompt tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.prompt_tokens?.toLocaleString() || "2,312"}
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
        {(logItem?.time_to_first_token?.toFixed(2) || "-") + "s"}
      </span>
    ),
    Sentiment: (
      <SentimentTag
        sentiment_score={logItem?.sentiment_analysis?.sentiment_score || 0}
      />
    ),
  };
  const metricRef = useRef(null);
  const logRef = useRef(null);
  useEffect(() => {
    if (displayLog) {
      if (logRef && logRef.current)
        (logRef.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
    } else {
      if (metricRef && metricRef.current)
        (metricRef.current as HTMLElement)?.scrollIntoView({
          behavior: "smooth",
        });
    }
  }, []);
  const getMessageType = (role: string) => {
    if (role === "[system]") {
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
        <div>
          {displayLog && (
            <SearchLog
              handleSearch={searchContent}
              handleReset={() => {
                setCompleteInteraction(
                  logItem?.prompt_messages
                    ? [
                        ...logItem.prompt_messages.concat([
                          logItem?.completion_message,
                        ]),
                      ]
                    : []
                );
              }}
            />
          )}
        </div>
      </div>
      <div className="flex-col items-start self-stretch mt-[44px]">
        {!displayLog && (
          <div
            ref={metricRef}
            className="flex-col py-md px-lg items-start gap-xs self-stretch"
          >
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
                        delayDuration={1}
                        skipDelayDuration={1}
                        content={
                          <>
                            <span className="text-gray-4 caption">
                              Time to first generated token
                            </span>
                          </>
                        }
                      >
                        <div>
                          <Info />
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
        {displayLog && (
          <>
            <div
              ref={logRef}
              className="flex py-xs px-lg justify-between items-start self-stretch"
            >
              <p className="text-sm-md text-gray-5">Cache response</p>
              <SwitchButton
                checked={checked}
                onCheckedChange={handleCheckCacheReponse}
              />
            </div>
            {systemPrompt && (
              <div className="flex-col px-lg pt-sm pb-md gap-xxxs self-stretch items-start">
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-sm-md text-gray-5">
                    {getMessageType(systemPrompt.role)}
                  </p>
                  <DotsButton
                    icon={Copy}
                    onClick={() => {
                      navigator.clipboard.writeText(systemPrompt.content);
                    }}
                  />
                </div>
                <div className="flex  py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
                  <p className="break-words overflow-auto">
                    {systemPrompt.content}
                  </p>
                </div>
              </div>
            )}
            <Divider color="bg-gray-2" />
            <div className="flex-col px-lg pt-sm pb-md gap-sm self-stretch items-start">
              {completeInteraction.map((message, index) => {
                if (!message.content) {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="flex-col items-start gap-xxxs self-stretch "
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
                    <div className="flex  py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
                      <p className="break-words overflow-auto">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
