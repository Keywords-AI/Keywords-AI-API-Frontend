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
  RestorePlaygroundStateFromLog,
  setCacheResponse,
  setJsonMode,
} from "src/store/actions";
import { useNavigate } from "react-router-dom";
import Tooltip from "src/components/Misc/Tooltip";
import LogMessage from "./LogMessage";
import { LogPane } from "./LogPane";
import { MetricPane } from "./MetricPane";
import { set } from "react-hook-form";

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

  useEffect(() => {
    enableScope("request_sidepanel");
    return () => {
      disableScope("request_sidepanel");
    };
  }, []);
  const metricRef = useRef(null);
  const logRef = useRef(null);
  const dispatch = useTypedDispatch();
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);

  const [displayLog, setDisplayLog] = useState(false);
  useEffect(() => {
    if (logItem?.failed || logItem?.prompt_messages?.length === 0) {
      setDisplayLog(false);
    }
    if (displayLog) enableScope("request_sidepanel_log");
    if (!displayLog) disableScope("request_sidepanel_log");
    return () => {
      disableScope("request_sidepanel_log");
    };
  }, [displayLog, logItem]);
  useHotkeys(
    "V",
    () => {
      if (displayLog) dispatch(setJsonMode(!jsonMode));
    },
    {
      scopes: "request_sidepanel_log",
    }
  );
  useHotkeys(
    "P",
    () => {
      if (displayLog) {
        dispatch(RestorePlaygroundStateFromLog());
        navigate("/platform/playground");
      }
    },
    {
      scopes: "request_sidepanel_log",
    }
  );
  useHotkeys(
    "left",
    () => {
      setDisplayLog(false);
    },
    {
      scopes: "request_sidepanel",
      preventDefault: true,
    }
  );
  useHotkeys(
    "right",
    () => {
      if (logItem?.failed || logItem?.prompt_messages?.length === 0) {
        return;
      }
      setDisplayLog(true);
    },
    {
      scopes: "request_sidepanel",
      preventDefault: true,
    }
  );
  useEffect(() => {
    if (logRef && logRef.current) {
      (logRef.current as HTMLElement)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
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
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            delayDuration={1}
            content={
              <>
                <p className="caption text-gray-4">Show metrics</p>
                <AlphanumericKey value={"←"} />
              </>
            }
          >
            <Button
              variant="text"
              text="Metrics"
              active={!displayLog}
              onClick={() => setDisplayLog(false)}
              padding="py-0"
            />
          </Tooltip>

          {!logItem?.failed &&
            logItem?.prompt_messages &&
            logItem?.prompt_messages?.length > 0 &&
            logItem.completion_message && (
              <Tooltip
                side="bottom"
                sideOffset={8}
                align="center"
                delayDuration={1}
                content={
                  <>
                    <p className="caption text-gray-4">Show log</p>
                    <AlphanumericKey value={"→"} />
                  </>
                }
              >
                <Button
                  variant="text"
                  text="Log"
                  active={displayLog}
                  onClick={() => setDisplayLog(true)}
                  padding="py-0"
                />
              </Tooltip>
            )}
        </div>
        <div className="flex items-center">
          {displayLog && (
            <>
              <Tooltip
                side="bottom"
                sideOffset={5}
                align="end"
                delayDuration={1}
                content={
                  <>
                    <p className="caption text-gray-4">Open in playground</p>
                    <AlphanumericKey value={"P"} />
                  </>
                }
              >
                <div>
                  <DotsButton
                    icon={IconPlayground}
                    onClick={() => {
                      dispatch(RestorePlaygroundStateFromLog());
                      navigate("/platform/playground");
                    }}
                  />
                </div>
              </Tooltip>
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
            </>
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
