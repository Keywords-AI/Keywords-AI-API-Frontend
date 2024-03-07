import { LogItem, RootState, variantType } from "src/types";
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
import { Tabs } from "src/components/Sections/Tabs/Tabs";
import MetadataPane from "./MetadataPane";

interface SidePanelProps {
  open: boolean;
}

export const SidePanel = ({ open }: SidePanelProps) => {
  const logRef = useRef(null);
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const { enableScope, disableScope } = useHotkeysContext();
  const navigate = useNavigate();
  const pages = [
    {
      value: "Metric",
      buttonVariant: "text" as variantType,
      content: (
        <div
          className="flex-col items-start self-stretch "
          aria-label="frame 1969"
        >
          <div ref={logRef}></div>
          <MetricPane />
        </div>
      ),
      tooltip: (
        <>
          <p className="caption text-gray-4">View metrics</p>
          <AlphanumericKey value={"←"} />
        </>
      ),
    },
    !logItem?.failed && logItem?.prompt_messages?.length !== 0
      ? {
          value: "Log",
          buttonVariant: "text" as variantType,
          content: (
            <div
              className="flex-col items-start self-stretch "
              aria-label="frame 1969"
            >
              <div ref={logRef}></div>
              <LogPane />
            </div>
          ),
          tooltip: (
            <>
              <p className="caption text-gray-4">View log</p>
              <AlphanumericKey value={"→"} />
            </>
          ),
        }
      : null,
    logItem?.metadata && Object.keys(logItem?.metadata).length > 0
      ? {
          value: "Metadata",
          buttonVariant: "text" as variantType,
          content: (
            <div
              className="flex-col items-start self-stretch "
              aria-label="frame 1969"
            >
              <div ref={logRef}></div>
              <MetadataPane />
            </div>
          ),
        }
      : null,
  ].filter(Boolean);

  const [tab, setTab] = useState(pages[0]!.value);

  useEffect(() => {
    enableScope("request_sidepanel");
    return () => {
      disableScope("request_sidepanel");
    };
  }, []);
  const metricRef = useRef(null);

  const dispatch = useTypedDispatch();
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);

  useEffect(() => {
    if (logItem?.failed || logItem?.prompt_messages?.length === 0) {
      if (tab === "Log") setTab("Metric");
    }

    if (!logItem?.metadata || Object.keys(logItem?.metadata).length === 0) {
      if (tab === "Metadata") setTab("Metric");
    }
    if (tab === "Log") enableScope("request_sidepanel_log");
    if (tab !== "Log") disableScope("request_sidepanel_log");
    return () => {
      disableScope("request_sidepanel_log");
    };
  }, [tab, logItem]);
  useHotkeys(
    "V",
    () => {
      if (tab === "Log") dispatch(setJsonMode(!jsonMode));
    },
    {
      scopes: "request_sidepanel_log",
    }
  );
  useHotkeys(
    "P",
    () => {
      if (tab === "Log") {
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
      const currentIndex = pages.findIndex((p) => p!.value === tab);
      const nextIndex = (currentIndex - 1 + pages.length) % pages.length;
      const nextTab = pages[nextIndex];
      setTab(nextTab!.value);
    },
    {
      scopes: "request_sidepanel",
      preventDefault: true,
    }
  );
  useHotkeys(
    "right",
    () => {
      const currentIndex = pages.findIndex((p) => p!.value === tab);
      const nextIndex = (currentIndex + 1 + pages.length) % pages.length;
      const nextTab = pages[nextIndex];
      setTab(nextTab!.value);
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

  const headerRight = (
    <div className="flex items-center">
      {tab == "Log" && (
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
  );
  return (
    <Tabs
      rootClassName={cn(
        "flex-col items-start self-stretch shadow-border-l flex-shrink-0 ",
        "shadow-gray-2 bg-gray-1 overflow-x-hidden",
        open ? "w-[400px]" : "w-0"
      )}
      headerClassName="flex px-lg py-xxs justify-between  w-[inherit] items-center shadow-border-lb shadow-gray-2  bg-gray-1 "
      tabs={pages}
      value={tab}
      onValueChange={(value) => setTab(value)}
      headerRight={headerRight}
    />
  );
};
