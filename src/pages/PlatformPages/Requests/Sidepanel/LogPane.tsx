import { CopyButton } from "src/components/Buttons";
import { Divider } from "src/components/Sections";
import LogMessage from "./LogMessage";
import { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export const LogPane = ({}) => {
  const getMessageType = (role: string) => {
    if (role === "[system]" || role === "system") {
      return "System";
    } else if (role === "user") {
      return "User";
    }
    return "Response";
  };
  const dispatch = useTypedDispatch();
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const [completeInteraction, setCompleteInteraction] = useState<any[]>(
    logItem?.prompt_messages
      ? [
          ...logItem.prompt_messages.concat([
            { ...logItem?.completion_message },
          ]),
        ]
      : []
  );
  const systemPrompt = logItem?.prompt_messages.find(
    (item) => item.role === "system"
  );
  useEffect(() => {
    if (systemPrompt) {
      setCompleteInteraction(
        completeInteraction.filter((item) => item !== systemPrompt)
      );
    }
  }, [systemPrompt]);

  return (
    <>
      {systemPrompt && (
        <>
          <div className="flex-col px-lg pt-sm pb-md gap-xxxs self-stretch items-start">
            <div className="flex justify-between items-center self-stretch">
              <p className="text-sm-md text-gray-5">
                {getMessageType(systemPrompt.role)}
              </p>
              <CopyButton text={systemPrompt.content} />
            </div>
            <div className="flex py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
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
              className="flex-col items-start gap-xxxs self-stretch"
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
              <div className="flex py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
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
  );
};
