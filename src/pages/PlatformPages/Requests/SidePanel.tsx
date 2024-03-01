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
import SearchLog from "./SearchLog";
import LogMessage from "./LogMessage";

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
    Status: StatusTag({ statusCode: logItem?.status_code }),
    "API key": (
      <span className="text-sm-regular text-gray-4">
        {logItem?.api_key || "N/A"}
      </span>
    ),
    "Customer ID": (
      <span className="text-sm-regular text-gray-4">
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
      logItem?.cached_responses?.length || 0 > 0 ? (
        <Tag
          text={"Cached"}
          backgroundColor="bg-primary/10"
          textColor="text-primary"
          border=""
        />
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
    Latency: (
      <span className="text-sm-regular text-gray-4">
        {logItem?.failed ? "-" : (logItem?.latency.toFixed(3) || "-") + "s"}
      </span>
    ),
    Speed: (
      <span className="text-sm-regular text-gray-4">
        {!logItem?.token_per_second || logItem?.token_per_second < 0
          ? "-"
          : (logItem?.token_per_second?.toFixed(3) || "-") + "T/s"}
      </span>
    ),
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
        {!displayLog && (
          <>
            {logItem?.failed && (
              <>
                <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch">
                  <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
                    Error message
                    <CopyButton text={logItem?.error_message || ""} />
                  </div>
                  <div className="flex items-start gap-[10px] self-stretch py-xxxs px-xxs bg-gray-2 text-red text-sm-regular rounded-sm">
                    {logItem?.error_message}
                  </div>
                </div>
                <Divider />
              </>
            )}
            {logItem?.warnings && logItem?.warnings != "{}" && (
              <>
                <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch">
                  <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
                    Warning message
                    <CopyButton text={logItem?.warnings || ""} />
                  </div>
                  <div className="flex items-start gap-[10px] self-stretch py-xxxs px-xxs bg-gray-2 text-orange text-sm-regular rounded-sm">
                    {logItem?.warnings}
                  </div>
                </div>
                <Divider />
              </>
            )}
            <div className="flex-col py-sm px-lg items-start gap-xs self-stretch">
              {Object.keys(displayObj).map((key, index) => {
                return (
                  <div
                    className="flex h-[24px] justify-between items-center self-stretch"
                    key={index}
                  >
                    <div className="flex items-center gap-xxs">
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
          </>
        )}
        {displayLog && (
          <>
            {/* <div
              ref={logRef}
              className="flex py-xs px-lg justify-between items-start self-stretch"
            >
              <p className="text-sm-md text-gray-5">Cache response</p>
              <SwitchButton
                checked={checked}
                onCheckedChange={handleCheckCacheReponse}
              />
            </div> */}
            {systemPrompt && (
              <>
                <div className="flex-col px-lg pt-sm pb-md gap-xxxs self-stretch items-start">
                  <div className="flex justify-between items-center self-stretch">
                    <p className="text-sm-md text-gray-5">
                      {getMessageType(systemPrompt.role)}
                    </p>

                    <CopyButton text={systemPrompt.content} />
                  </div>
                  <div className="flex  py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
                    <p className="break-words overflow-auto">
                      {systemPrompt.content}
                    </p>
                  </div>
                </div>
                <Divider color="bg-gray-2" />
              </>
            )}

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
                      <div className="flex items-center gap-xxs">
                        <p className="text-sm-md text-gray-5">
                          {getMessageType(message.role)}
                        </p>
                        {/* <CacheButton
                          message={message}
                          completeInteraction={completeInteraction}
                          index={index}
                          logId={logItem?.id}
                          systemPrompt={systemPrompt?.content}
                        /> */}
                      </div>

                      <CopyButton text={message.content} />
                    </div>
                    <div className="flex  py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
                      <LogMessage
                        MessageContent={
                          jsonMode
                            ? JSON.stringify(message, null, "\t")
                            : message.content
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {!displayLog && (
        <>
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
        </>
      )}
    </div>
  );
};

const Evaluation = ({
  sentimentScore = 0,
  groundnessScore = 85,
}: {
  sentimentScore?: number;
  groundnessScore?: number;
}) => {
  const isFreeUser = useTypedSelector((state: RootState) => {
    const planLevel = state.organization?.organization_subscription?.plan_level ?? 0;
    return planLevel < 2;
  });
  groundnessScore = parseFloat(groundnessScore.toFixed(2));
  const navigate = useNavigate();
  return (
    <div
      aria-label="frame 1974"
      className="flex-col  px-lg py-sm items-start gap-xs self-stretch"
    >
      {/* <div className="flex h-[24px] justify-between items-center self-stretch">
        <Tooltip
          side="right"
          sideOffset={8}
          delayDuration={1}
          skipDelayDuration={1}
          content={
            <>
              <span className="text-gray-4 caption">
                Failure threshold = 0.85
              </span>
            </>
          }
        >
          <div className="flex items-center gap-xxs text-sm-md text-gray-5">
            Groundedness
            <Info />
          </div>
        </Tooltip>
        <div className="flex items-center gap-xxxs">
          {isFreeUser ? (
            <Tag
              text={"Upgrade"}
              backgroundColor="bg-primary/10"
              textColor="text-primary"
              border=""
            />
          ) : groundnessScore > 0 ? (
            <div className="flex items-center gap-xxxs">
              <Tag
                text={`${groundnessScore}`}
                backgroundColor={
                  groundnessScore >= 85 ? "bg-green/10" : "bg-red/10"
                }
                textColor={groundnessScore >= 85 ? "text-green" : "text-red"}
                border=""
              />
              <Tag
                text={` Grounded`}
                backgroundColor={
                  groundnessScore >= 85 ? "bg-green/10" : "bg-red/10"
                }
                textColor={groundnessScore >= 85 ? "text-green" : "text-red"}
                border=""
              />
            </div>
          ) : (
            <p className="text-sm-regular text-gray-4">N/A</p>
          )}
        </div>
      </div> */}

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-sm-md text-gray-5">
          Sentiment
        </div>

        <div className="flex items-center gap-xxxs">
          {isFreeUser ? (
            <Tag
              text={"Upgrade"}
              backgroundColor="bg-primary/10"
              textColor="text-primary"
              border=""
              onClick={() => {
                navigate("/platform/api/plans");
              }}
            />
          ) : sentimentScore ? (
            <SentimentTag sentiment_score={sentimentScore} />
          ) : (
            <p className="text-sm-regular text-gray-4">N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Classification = () => {
  return (
    <div
      aria-label="frame 1973"
      className="flex-col py-sm px-lg items-start gap-xxxs self-stretch"
    >
      hi2
    </div>
  );
};

const CacheButton = ({
  message,
  completeInteraction,
  index,
  logId,
  systemPrompt,
}) => {
  const logItem = useTypedSelector((state: RootState) =>
    state.requestLogs.logs.find((log) => log.id === logId)
  );

  const [isCached, setIsCached] = useState(
    logItem?.cached_responses.some((item) => item.request_index === index)
  );
  useEffect(() => {
    setIsCached(
      logItem?.cached_responses.some((item) => item.request_index === index)
    );
  }, [logId]);

  const dispatch = useTypedDispatch();
  const handleCheckCacheReponse = (
    checked: boolean,
    index: number,
    message: string
  ) => {
    try {
      dispatch(setCacheResponse(checked, index, message));
      setIsCached(checked);
    } catch (error) {
      console.error("Error setting cache response", error);
    }
  };
  return (
    <>
      {getMessageType(message.role) === "Response" &&
        index !== completeInteraction.length - 1 &&
        (isCached ? (
          <Button
            variant="footer"
            text={"Uncache"}
            textColor="text-red"
            padding="p-0"
            onClick={() =>
              handleCheckCacheReponse(
                false,
                index,
                systemPrompt + " " + message.content
              )
            }
          />
        ) : (
          <Button
            variant="footer"
            text={"Cache"}
            textColor="text-primary"
            padding="p-0"
            onClick={() =>
              handleCheckCacheReponse(
                true,
                index,
                systemPrompt + " " + message.content
              )
            }
          />
        ))}
    </>
  );
};

const RequestParams = ({
  presence_penalty,
  frequency_penalty,
  temperature,
  max_tokens,
  top_p,
  stop_sequence,
}) => {
  return (
    <div className="flex-col py-sm px-lg items-start gap-xs self-stretch">
      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Temperature
        </div>
        <div className=" text-gray-4 text-sm-regular">{temperature || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Maximum length
        </div>
        <div className=" text-gray-4 text-sm-regular">{max_tokens || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Top P
        </div>
        <div className=" text-gray-4 text-sm-regular">{top_p || "-"}</div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Frequency penalty
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {frequency_penalty || "-"}
        </div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Presence penalty
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {presence_penalty || "-"}
        </div>
      </div>

      <div className="flex h-[24px] justify-between items-center self-stretch">
        <div className="flex items-center gap-xxs text-gray-5 text-sm-md ">
          Stop sequences
        </div>
        <div className=" text-gray-4 text-sm-regular">
          {stop_sequence || "-"}
        </div>
      </div>
    </div>
  );
};
