import { CopyButton } from "src/components/Buttons";
import { Check, CheckAll, Info } from "src/components/Icons";
import { ModelTag, StatusTag, Tag } from "src/components/Misc";
import Tooltip from "src/components/Misc/Tooltip";
import { Divider } from "src/components/Sections";
import { useTypedSelector } from "src/store/store";
import { RequestParams } from "./RequestParams";

import Accordion from "src/components/Sections/Accordion/Accordion";
import MetadataPane from "./MetadataPane";
import { useEffect, useState } from "react";
import cn from "src/utilities/classMerge";
import { useDispatch } from "react-redux";
import { dispatchNotification } from "src/store/actions";

export const MetricPane = ({}) => {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const isAdmin = useTypedSelector((state) => state.user?.is_admin);
  const [accordion1, setAccordion1] = useState("open");
  const [accordion2, setAccordion2] = useState("open");
  const [isHovered, setIsHovered] = useState(false);
  // const displayObj = {
  //   "Request ID": (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.id || "-"}
  //     </span>
  //   ),
  //   "Created at": (
  //     <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
  //       {new Date(logItem?.timestamp || "Aug 25, 8:03 PM").toLocaleString(
  //         "en-US",
  //         {
  //           month: "short",
  //           day: "2-digit",
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           hour12: true,
  //         }
  //       )}
  //     </span>
  //   ),
  //   Status: (
  //     <StatusTag
  //       statusCode={logItem?.status_code}
  //       cached={(logItem?.cached_responses.length || 0) > 0}
  //       warning={(logItem?.warnings && logItem?.warnings != "{}") || false}
  //     />
  //   ),
  //   Organization: (
  //     <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
  //       {logItem?.organization || "N/A"}
  //     </span>
  //   ),
  //   User: (
  //     <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
  //       {logItem?.organization || "N/A"}
  //     </span>
  //   ),
  //   "API key": (
  //     <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
  //       {logItem?.api_key || "N/A"}
  //     </span>
  //   ),
  //   "Customer ID": (
  //     <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
  //       {logItem?.customer_identifier || "N/A"}
  //     </span>
  //   ),
  //   Model:
  //     logItem?.model && logItem?.model !== "None" ? (
  //       <ModelTag model={logItem?.model} />
  //     ) : (
  //       <span className="text-sm-regular text-gray-4">N/A</span>
  //     ),

  //   Cached:
  //     (logItem?.cached_responses?.length || 0) > 0 ? (
  //       <CheckAll />
  //     ) : (
  //       <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //         {"No"}
  //       </span>
  //     ),

  //   "Prompt tokens": (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed
  //         ? "-"
  //         : logItem?.prompt_tokens?.toLocaleString() || "-"}
  //     </span>
  //   ),
  //   "Completion tokens": (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed
  //         ? "-"
  //         : logItem?.completion_tokens?.toLocaleString() || "-"}
  //     </span>
  //   ),
  //   "Total tokens": (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed
  //         ? "-"
  //         : (
  //             (logItem?.prompt_tokens &&
  //               logItem?.prompt_tokens &&
  //               logItem?.prompt_tokens + logItem?.completion_tokens) ||
  //             "-"
  //           ).toLocaleString()}
  //     </span>
  //   ),
  //   Cost: (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed ? "-" : "$" + logItem?.cost.toFixed(6) || "-"}
  //     </span>
  //   ),
  //   "Routing time":
  //     logItem?.routing_time > 0 ? (
  //       <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //         {logItem?.failed || logItem?.routing_time <= 0
  //           ? "-"
  //           : (logItem?.routing_time.toFixed(3) || "-") + "s"}
  //       </span>
  //     ) : null,

  //   TTFT: (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed ||
  //       (logItem?.time_to_first_token && logItem?.time_to_first_token < 0)
  //         ? "-"
  //         : (logItem?.time_to_first_token?.toFixed(2) || "-") + "s"}
  //     </span>
  //   ),
  //   TPOT: (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed ||
  //       !logItem?.token_per_second ||
  //       (logItem?.token_per_second && logItem?.token_per_second < 0)
  //         ? "-"
  //         : ((1 / logItem?.token_per_second).toFixed(2) || "-") + "s"}
  //     </span>
  //   ),
  //   "Generation time": (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {logItem?.failed ||
  //       !logItem?.latency ||
  //       logItem?.latency < 0 ||
  //       logItem?.latency < 0
  //         ? "-"
  //         : ((logItem?.latency).toFixed(2) || "-") + "s"}
  //     </span>
  //   ),

  //   Speed: (
  //     <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
  //       {!logItem?.token_per_second || logItem?.token_per_second < 0
  //         ? "-"
  //         : (logItem?.token_per_second?.toFixed(3) || "-") + "T/s"}
  //     </span>
  //   ),
  // };
  const displayArray = [
    {
      key: "Request ID",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.id || "-"}
        </span>
      ),
    },
    {
      key: "Created at",
      value: (
        <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
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
    },
    {
      key: "Status",
      value: (
        <StatusTag
          statusCode={logItem?.status_code}
          cached={(logItem?.cached_responses.length || 0) > 0}
          warning={(logItem?.warnings && logItem?.warnings != "{}") || false}
        />
      ),
    },
    isAdmin && {
      key: "Organization",
      value: (
        <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5  whitespace-nowrap">
          {logItem?.organization || "N/A"}
        </span>
      ),
    },
    isAdmin && {
      key: "User",
      value: (
        <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5  whitespace-nowrap">
          {logItem?.organization || "N/A"}
        </span>
      ),
    },
    {
      key: "API key",
      value: (
        <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
          {logItem?.api_key || "N/A"}
        </span>
      ),
    },
    {
      key: "Customer ID",
      value: (
        <span className="text-sm-regular text-gray-4 overflow-hidden overflow-ellipsis group-hover:text-gray-5">
          {logItem?.customer_identifier || "N/A"}
        </span>
      ),
    },
    {
      key: "Model",
      value:
        logItem?.model && logItem?.model !== "None" ? (
          <ModelTag model={logItem?.model} />
        ) : (
          <span className="text-sm-regular text-gray-4">N/A</span>
        ),
    },
    (logItem?.cached_responses?.length || 0) > 0 && {
      key: "Cached",
      value:
        (logItem?.cached_responses?.length || 0) > 0 ? (
          <CheckAll />
        ) : (
          <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
            {"No"}
          </span>
        ),
    },
    logItem?.stream != undefined && {
      key: "Streamed",
      value: logItem?.stream ? (
        <Check fill="fill-success" />
      ) : (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {"No"}
        </span>
      ),
    },
    {
      key: "Prompt tokens",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed
            ? "-"
            : logItem?.prompt_tokens?.toLocaleString() || "-"}
        </span>
      ),
    },
    {
      key: "Completion tokens",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed
            ? "-"
            : logItem?.completion_tokens?.toLocaleString() || "-"}
        </span>
      ),
    },
    {
      key: "Total tokens",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
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
    },
    {
      key: "Cost",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed ? "-" : "$" + logItem?.cost.toFixed(6) || "-"}
        </span>
      ),
    },
    {
      key: "Routing time",
      value:
        logItem?.routing_time > 0 ? (
          <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
            {logItem?.failed || logItem?.routing_time <= 0
              ? "-"
              : (logItem?.routing_time.toFixed(3) || "-") + "s"}
          </span>
        ) : null,
    },
    {
      key: "TTFT",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed ||
          (logItem?.time_to_first_token && logItem?.time_to_first_token < 0)
            ? "-"
            : (logItem?.time_to_first_token?.toFixed(2) || "-") + "s"}
        </span>
      ),
    },
    logItem?.stream && {
      key: "TPOT",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed ||
          !logItem?.token_per_second ||
          (logItem?.token_per_second && logItem?.token_per_second < 0)
            ? "-"
            : ((1 / logItem?.token_per_second).toFixed(2) || "-") + "s"}
        </span>
      ),
    },
    {
      key: "Generation time",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {logItem?.failed ||
          !logItem?.latency ||
          logItem?.latency < 0 ||
          logItem?.latency < 0
            ? "-"
            : ((logItem?.latency).toFixed(2) || "-") + "s"}
        </span>
      ),
    },
    logItem?.stream && {
      key: "Speed",
      value: (
        <span className="text-sm-regular text-gray-4 group-hover:text-gray-5">
          {!logItem?.token_per_second || logItem?.token_per_second < 0
            ? "-"
            : (logItem?.token_per_second?.toFixed(3) || "-") + "T/s"}
        </span>
      ),
    },
  ];
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      dispatchNotification({ title: "Copied to clickboard", type: "success" })
    );
  };
  if (!logItem) return null;

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
      <div className="flex-col py-sm pt-[18px] px-lg items-start gap-xs self-stretch">
        {displayArray.map(({ key, value }, index) => {
          if (!value) return null;

          return (
            <div
              className="flex h-[24px] justify-between items-center self-stretch cursor-pointer gap-xs group"
              onClick={() => {
                const text =
                  key == "Model"
                    ? logItem?.model
                    : key == "Status"
                    ? logItem?.status_code
                    : value.props.children;
                navigator.clipboard.writeText(text);
                onSubmit();
              }}
              key={index}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center gap-xxs flex-shrink-0 ">
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
              {value}
            </div>
          );
        })}
      </div>
      <Divider />
      {logItem?.metadata && Object.keys(logItem?.metadata || {}).length > 0 && (
        <>
          <Accordion
            className={cn(
              "flex-col items-center justify-center gap-xxs self-stretch px-lg pt-sm ",
              accordion1 === "open" ? "pb-md" : "pb-sm"
            )}
            defaultOpen
            value={accordion1}
            onValueChange={setAccordion1}
            content={{
              trigger: "Custom metadata",
              content: <MetadataPane />,
              contentClassName: "flex-col items-start gap-sm self-stretch",
            }}
          />
          <Divider />
        </>
      )}

      <Accordion
        className={cn(
          "flex-col items-center justify-center gap-xxs self-stretch px-lg pt-sm ",
          accordion2 === "open" ? "pb-md" : "pb-sm"
        )}
        defaultOpen
        value={accordion2}
        onValueChange={setAccordion2}
        content={{
          trigger: "Request parameters",
          content: <RequestParams {...logItem?.full_request} />,
          contentClassName: "flex-col items-start gap-sm self-stretch",
        }}
      />
    </>
  );
};
