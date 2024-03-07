import React from "react";
import { CopyButton } from "src/components/Buttons";
import { useTypedSelector } from "src/store/store";

type Props = {};

export default function MetadataPane({}: Props) {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  return (
    <>
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
        </>
      )}
    </>
  );
}
