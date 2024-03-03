import { LogItem, RootState } from "src/types";
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
import {
  AlphanumericKey,
  Compare,
  Copy,
  IconPlayground,
  Info,
} from "src/components";
import { models } from "src/utilities/constants";
import React, { useEffect, useRef, useState } from "react";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import {
  RestorePlaygroundState,
  setCacheResponse,
  setJsonMode,
} from "src/store/actions";
import { useNavigate } from "react-router-dom";
import Tooltip from "src/components/Misc/Tooltip";
import LogMessage from "./LogMessage";
import { LogPane } from "./LogPane";
import { MetricPane } from "./MetricPane";

interface SidePanelProps {
  open: boolean;
}
const getMessageType = (role: string) => {
  if (role === "[system]") {
    return "System";
  } else if (role === "user") {
    return "User";
  }
  return "Response";
};
export const SidePanel = ({ open }: SidePanelProps) => {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const { enableScope, disableScope } = useHotkeysContext();
  const navigate = useNavigate();
  useHotkeys(
    "V",
    () => {
      dispatch(setJsonMode(!jsonMode));
    },
    {
      scopes: "request_sidepanel",
    }
  );
  const [completeInteraction, setCompleteInteraction] = useState<any[]>([]);
  useEffect(() => {
    setCompleteInteraction(
      logItem?.prompt_messages
        ? [
            ...logItem.prompt_messages.concat([
              { ...logItem?.completion_message },
            ]),
          ]
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

  const metricRef = useRef(null);
  const logRef = useRef(null);
  const dispatch = useTypedDispatch();
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);

  const [displayLog, setDisplayLog] = useState(false);
  useEffect(() => {
    if (logItem?.failed || logItem?.prompt_messages?.length === 0) {
      setDisplayLog(false);
    }
    if (displayLog) enableScope("request_sidepanel");
    return () => {
      disableScope("request_sidepanel");
    };
  }, [displayLog, logItem]);
  useEffect(() => {
    if (logRef && logRef.current) {
      (logRef.current as HTMLElement)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    // } else {
    //   if (metricRef && metricRef.current) {
    //     console.log("metricRef.current");
    //     (metricRef.current as HTMLElement)?.scrollIntoView({
    //       behavior: "smooth",
    //     });
    //   }
  }, [logItem]);
  return (
    <div
      className={cn(
        "flex-col items-start self-stretch shadow-border-l flex-shrink-0 relative",
        "shadow-gray-2 bg-gray-1 overflow-x-hidden",
        open ? "w-[400px]" : "w-0"
      )}
    >
      <div
        aria-label="table-keys-header"
        className="flex px-lg py-xxs justify-between h-[44px] w-[inherit] items-center shadow-border-lb shadow-gray-2 fixed bg-gray-1 z-[10]"
      >
        <div className="flex items-center gap-sm ">
          <Button
            variant="text"
            text="Metrics"
            active={!displayLog}
            onClick={() => setDisplayLog(false)}
            padding="py-0"
          />
          {!logItem?.failed &&
            logItem?.prompt_messages &&
            logItem?.prompt_messages?.length > 0 && (
              <Button
                variant="text"
                text="Log"
                active={displayLog}
                onClick={() => setDisplayLog(true)}
                padding="py-0"
              />
            )}
        </div>
        <div>
          {displayLog && (
            <Tooltip
              side="bottom"
              sideOffset={5}
              align="end"
              delayDuration={1}
              content={
                <>
                  <p className="caption text-gray-4">View mode</p>
                  <AlphanumericKey value={"V"} />
                </>
              }
            >
              <div>
                <DotsButton
                  icon={Compare}
                  onClick={() => dispatch(setJsonMode(!jsonMode))}
                  active={jsonMode}
                />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div
        className="flex-col items-start self-stretch mt-[44px]"
        aria-label="frame 1969"
      >
        <div ref={logRef}></div>
        {displayLog ? <LogPane /> : <MetricPane />}
      </div>
    </div>
  );
};
