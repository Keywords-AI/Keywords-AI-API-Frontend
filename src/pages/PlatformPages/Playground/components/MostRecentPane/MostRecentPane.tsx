import React, { forwardRef } from "react";
import { Divider, Info } from "src/components";
import { ModelTag, StatusTag } from "src/components/Misc";
import Tooltip from "src/components/Misc/Tooltip";
import { useTypedSelector } from "src/store/store";
import { RootState } from "src/types";

export interface MostRecentPaneProps {
  prop?: string;
}

export const MostRecentPane = forwardRef<HTMLDivElement, MostRecentPaneProps>(
  ({ prop = "default value" }, ref) => {
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const breakDownData = useTypedSelector(
      (state: RootState) => state.playground.breakdownData
    );
    const modelLogs = useTypedSelector((state) => state.playground.modelLogs);
    const summary = [
      {
        title: <span className="text-sm-md text-gray-5">{"Created at"}</span>,
        value: (
          <span className="text-sm-regular text-gray-4">
            {new Date(breakDownData.timestamp).toLocaleString(
              "en-US",
              options as any
            )}
          </span>
        ),
      },
      {
        title: breakDownData.routing_time ? (
          <div className="flex items-center gap-xxs">
            <span className="text-sm-md text-gray-5">{"Routing time"}</span>
            <Tooltip
              side="right"
              sideOffset={8}
              delayDuration={1}
              skipDelayDuration={1}
              content={
                <>
                  <span className="text-gray-4 caption">
                    Time to select model
                  </span>
                </>
              }
            >
              <div>
                <Info />
              </div>
            </Tooltip>
          </div>
        ) : null,
        value: breakDownData.routing_time ? (
          <span className="text-sm-regular text-gray-4">
            {breakDownData.routing_time.toFixed(2)}s
          </span>
        ) : null,
      },
      // {
      //   title: <span className="text-sm-md text-gray-5">{"Status"}</span>,
      //   value: <StatusTag statusCode={breakDownData.status} />,
      // },
      {
        title: (
          <span className="text-sm-md text-gray-5">{"Prompt tokens"}</span>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {breakDownData.prompt_tokens.toLocaleString()}
          </span>
        ),
      },
      // {
      //   title: (
      //     <span className="text-sm-md text-gray-5">{"All tokens"}</span>
      //   ),
      //   value: (
      //     <span className="text-sm-regular text-gray-4">
      //       {(
      //         breakDownData.prompt_tokens + breakDownData.completion_tokens
      //       ).toLocaleString()}
      //     </span>
      //   ),
      // },
    ];
    const modealA = [
      {
        title: <span className="text-sm-md text-gray-5">{"Model A"}</span>,
        value: <ModelTag model={modelLogs[0].model} />,
      },
      {
        title: <span className="text-sm-md text-gray-5">{"Status"}</span>,
        value: <StatusTag statusCode={modelLogs[0].status} />,
      },
      {
        title: (
          <span className="text-sm-md text-gray-5">{"Completion tokens"}</span>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[0].completion_tokens.toLocaleString()}
          </span>
        ),
      },
      {
        title: <span className="text-sm-md text-gray-5">{"Cost"}</span>,
        value: (
          <span className="text-sm-regular text-gray-4">
            ${modelLogs[0].cost.toFixed(4)}
          </span>
        ),
      },
      {
        title: (
          <div className="flex items-center gap-xxs">
            <span className="text-sm-md text-gray-5">{"TTFT"}</span>
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
          </div>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[0].ttft.toFixed(2)}s
          </span>
        ),
      },
      {
        title: (
          <div className="flex items-center gap-xxs">
            <span className="text-sm-md text-gray-5">{"Generation time"}</span>
            <Tooltip
              side="right"
              sideOffset={8}
              delayDuration={1}
              skipDelayDuration={1}
              content={
                <>
                  <span className="text-gray-4 caption">
                    Time to generate response
                  </span>
                </>
              }
            >
              <div>
                <Info />
              </div>
            </Tooltip>
          </div>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[0].latency.toFixed(2)}s
          </span>
        ),
      },
    ];
    const modealB = [
      {
        title: <span className="text-sm-md text-gray-5">{"Model B"}</span>,
        value: <ModelTag model={modelLogs[1].model} />,
      },
      {
        title: <span className="text-sm-md text-gray-5">{"Status"}</span>,
        value: <StatusTag statusCode={modelLogs[1].status} />,
      },
      {
        title: (
          <span className="text-sm-md text-gray-5">{"Completion tokens"}</span>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[1].completion_tokens.toLocaleString()}
          </span>
        ),
      },
      {
        title: <span className="text-sm-md text-gray-5">{"Cost"}</span>,
        value: (
          <span className="text-sm-regular text-gray-4">
            ${modelLogs[1].cost.toFixed(4)}
          </span>
        ),
      },
      {
        title: (
          <div className="flex items-center gap-xxs">
            <span className="text-sm-md text-gray-5">{"TTFT"}</span>
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
          </div>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[1].ttft.toFixed(2)}s
          </span>
        ),
      },
      {
        title: (
          <div className="flex items-center gap-xxs">
            <span className="text-sm-md text-gray-5">{"Generation time"}</span>
            <Tooltip
              side="right"
              sideOffset={8}
              delayDuration={1}
              skipDelayDuration={1}
              content={
                <>
                  <span className="text-gray-4 caption">
                    Time to generate response
                  </span>
                </>
              }
            >
              <div>
                <Info />
              </div>
            </Tooltip>
          </div>
        ),
        value: (
          <span className="text-sm-regular text-gray-4">
            {modelLogs[1].latency.toFixed(2)}s
          </span>
        ),
      },
    ];
    return (
      <div className="flex-col self-stretch" ref={ref}>
        {breakDownData.timestamp && <LogCard displayObj={summary} />}
        <Divider />
        {modelLogs[0].model && <LogCard displayObj={modealA} />}
        <Divider />
        {modelLogs[1].model && <LogCard displayObj={modealB} />}
      </div>
    );
  }
);

const LogCard = ({ displayObj }) => {
  return (
    <div className="flex-col px-lg py-md items-start gap-xs self-stretch">
      {displayObj.map((item, index) => {
        if (!item.title) return null;
        return (
          <div
            key={index}
            className="flex items-center justify-between self-stretch h-[24px]"
          >
            {item.title}
            {item.value}
          </div>
        );
      })}
    </div>
  );
};
