import { CopyButton } from "src/components/Buttons";
import { CheckAll, Info } from "src/components/Icons";
import { ModelTag, StatusTag, Tag } from "src/components/Misc";
import Tooltip from "src/components/Misc/Tooltip";
import { Divider } from "src/components/Sections";
import { useTypedSelector } from "src/store/store";
import { RequestParams } from "./RequestParams";
import { Evaluation } from "./Evaluation";
import { useState } from "react";

export const MetricPane = ({}) => {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const displayObj = {
    "Request ID": (
      <span className="text-sm-regular text-gray-4">{logItem?.id || "-"}</span>
    ),
    "Created at": (
      <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis">
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
    Status: (
      <StatusTag
        statusCode={logItem?.status_code}
        cached={(logItem?.cached_responses.length || 0) > 0}
        warning={(logItem?.warnings && logItem?.warnings != "{}") || false}
      />
    ),
    "API key": (
      <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis">
        {logItem?.api_key || "N/A"}
      </span>
    ),
    "Customer ID": (
      <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis">
        {logItem?.customer_identifier || "N/A"}
      </span>
    ),
    Model:
      logItem?.model && logItem?.model !== "None" ? (
        <ModelTag model={logItem?.model} />
      ) : (
        <span className="text-sm-regular text-gray-4">N/A</span>
      ),

    Cached:
      (logItem?.cached_responses?.length || 0) > 0 ? (
        <CheckAll />
      ) : (
        <span className="text-sm-regular text-gray-4">{"No"}</span>
      ),

    "Prompt tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed
          ? "-"
          : logItem?.prompt_tokens?.toLocaleString() || "-"}
      </span>
    ),
    "Completion tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed
          ? "-"
          : logItem?.completion_tokens?.toLocaleString() || "-"}
      </span>
    ),
    "Total tokens": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed
          ? "-"
          : (
              (logItem?.prompt_tokens &&
                logItem?.prompt_tokens &&
                logItem?.prompt_tokens + logItem?.completion_tokens) ||
              "-"
            ).toLocaleString()}
      </span>
    ),
    Cost: (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed ? "-" : "$" + logItem?.cost.toFixed(6) || "-"}
      </span>
    ),
    "Routing time": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed
          ? "-"
          : (logItem?.routing_time.toFixed(3) || "-") + "s"}
      </span>
    ),

    TTFT: (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed ||
        (logItem?.time_to_first_token && logItem?.time_to_first_token < 0)
          ? "-"
          : (logItem?.time_to_first_token?.toFixed(2) || "-") + "s"}
      </span>
    ),
    TPOT: (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed ||
        !logItem?.token_per_second ||
        (logItem?.token_per_second && logItem?.token_per_second < 0)
          ? "-"
          : ((1 / logItem?.token_per_second).toFixed(2) || "-") + "s"}
      </span>
    ),
    "Generation time": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed ||
        !logItem?.time_to_first_token ||
        !logItem?.token_per_second ||
        logItem?.token_per_second < 0 ||
        logItem?.time_to_first_token < 0
          ? "-"
          : ((logItem?.latency).toFixed(2) || "-") + "s"}
      </span>
    ),
    // Latency: (
    //   <span className="text-sm-regular text-gray-4">
    //     {logItem?.failed ? "-" : (logItem?.latency.toFixed(3) || "-") + "s"}
    //   </span>
    // ),
    Speed: (
      <span className="text-sm-regular text-gray-4">
        {!logItem?.token_per_second || logItem?.token_per_second < 0
          ? "-"
          : (logItem?.token_per_second?.toFixed(3) || "-") + "T/s"}
      </span>
    ),
  };
  return (
    <>
      {logItem?.failed && (
        <>
          <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch ">
            <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
              Error message
              <CopyButton text={logItem?.error_message || ""} />
            </div>
            <div className="flex items-start gap-[10px] self-stretch py-xxxs px-xxs bg-gray-2 text-red text-sm-regular rounded-sm ">
              <p className="break-all  flex self-stretch text-wrap max-h-[400px] overflow-auto">
                {logItem?.error_message}
              </p>
            </div>
          </div>
          <Divider />
        </>
      )}
      {logItem?.warnings && logItem?.warnings != "{}" && (
        <>
          <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch ">
            <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
              Warning message
              <CopyButton text={logItem?.warnings || ""} />
            </div>
            <div className="flex items-start gap-[10px]  py-xxxs px-xxs bg-gray-2 text-orange text-sm-regular rounded-sm self-stretch ">
              <p className="break-all  flex self-stretch text-wrap max-h-[400px] overflow-auto">
                {logItem?.warnings}
              </p>
            </div>
          </div>
          <Divider />
        </>
      )}
      <div className="flex-col py-sm px-lg items-start gap-xs self-stretch">
        {Object.keys(displayObj).map((key, index) => {
          return (
            <div
              className="flex h-[24px] justify-between items-center self-stretch cursor-pointer gap-xs"
              onClick={() => {
                const text =
                  key == "Model"
                    ? logItem?.model
                    : key == "Status"
                    ? logItem?.status_code
                    : displayObj[key].props.children;
                navigator.clipboard.writeText(text);
              }}
              key={index}
            >
              <div className="flex items-center gap-xxs flex-shrink-0">
                <span className="text-sm-md text-gray-5">{key}</span>
                {key === "Customer ID" && (
                  <Tooltip
                    side="right"
                    sideOffset={8}
                    delayDuration={1}
                    skipDelayDuration={1}
                    content={
                      <>
                        <span className="text-gray-4 caption">
                          Identifier for customer
                        </span>
                      </>
                    }
                  >
                    <div>
                      <Info />
                    </div>
                  </Tooltip>
                )}
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
                {key === "TPOT" && (
                  <Tooltip
                    side="right"
                    sideOffset={8}
                    delayDuration={1}
                    skipDelayDuration={1}
                    content={
                      <>
                        <span className="text-gray-4 caption">
                          Average time to generate an output token
                        </span>
                      </>
                    }
                  >
                    <div>
                      <Info />
                    </div>
                  </Tooltip>
                )}
                {key === "Generation time" && (
                  <Tooltip
                    side="right"
                    sideOffset={8}
                    delayDuration={1}
                    skipDelayDuration={1}
                    content={
                      <>
                        <span className="text-gray-4 caption">
                          TTFT + TPOT * (# output tokens)
                        </span>
                      </>
                    }
                  >
                    <div>
                      <Info />
                    </div>
                  </Tooltip>
                )}
                {key === "Speed" && (
                  <Tooltip
                    side="right"
                    sideOffset={8}
                    delayDuration={1}
                    skipDelayDuration={1}
                    content={
                      <>
                        <span className="text-gray-4 caption">
                          # output tokens per second
                        </span>
                      </>
                    }
                  >
                    <div>
                      <Info />
                    </div>
                  </Tooltip>
                )}
                {key === "Routing time" && (
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
                )}
                {key === "Latency" && (
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
                )}
              </div>
              {displayObj[key]}
            </div>
          );
        })}
      </div>
      <Divider />
      <RequestParams {...logItem?.full_request} />
      <Divider />
      <Evaluation
        sentimentScore={logItem?.sentiment_score}
        groundnessScore={logItem?.groundness}
      />
      <Divider />
      {/* <Classification /> */}
      {/* <Divider /> */}
      {logItem?.metadata && Object.keys(logItem?.metadata).length > 0 && (
        <>
          <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch ">
            <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
              Metadata
              <CopyButton text={JSON.stringify(logItem?.metadata) || ""} />
            </div>
            <div className="flex items-start gap-[10px] self-stretch py-xxxs px-xxs bg-gray-2 text-gray-4  text-sm-regular rounded-sm ">
              <p className="break-all  flex self-stretch text-wrap max-h-[400px] overflow-auto whitespace-pre-wrap select-text">
                {JSON.stringify(logItem?.metadata)}
              </p>
            </div>
          </div>
          <Divider />
        </>
      )}
    </>
  );
};
