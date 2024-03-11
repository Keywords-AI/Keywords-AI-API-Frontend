import React from "react";
import { CopyButton } from "src/components/Buttons";
import { useTypedSelector } from "src/store/store";
import LogMessage from "./LogMessage";

type Props = {};

export default function MetadataPane({}: Props) {
  const logItem = useTypedSelector(
    (state) =>
      state.requestLogs.logs.find(
        (log) => log.id === state.requestLogs?.selectedRequest?.id
      ) || state.requestLogs.selectedRequest
  );
  const jsonMode = useTypedSelector((state) => state.requestLogs.jsonMode);
  const sample = {
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
    },
    phoneNumbers: [
      {
        type: "home",
        number: "212 555-1234",
      },
      {
        type: "office",
        number: "646 555-4567",
      },
    ],
    email: "johndoe@example.com",
  };
  return (
    <>
      {logItem?.metadata &&
        Object.keys(logItem?.metadata || {}).length > 0 &&
        (jsonMode ? (
          <>
            <div className="flex-col py-sm px-lg items-start gap-xxxs self-stretch ">
              <div className="flex justify-between items-center self-stretch text-sm-md text-gray-5">
                {"JSON"}
                <CopyButton text={JSON.stringify(logItem?.metadata) || ""} />
              </div>
              <div className="flex items-start gap-[10px] self-stretch py-xxxs px-xxs bg-gray-2 text-gray-4  text-sm-regular rounded-sm ">
                <p className="break-all  flex self-stretch text-wrap max-h-[400px] overflow-auto whitespace-pre-wrap select-text w-full font-roboto-mono">
                  {JSON.stringify(logItem?.metadata)}
                  {/* {`{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "email": "johndoe@example.com"
}`} */}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-col px-lg pt-sm pb-md items-start gap-sm self-stretch">
            {Object.entries(logItem?.metadata).map(([key, value]) => (
              <div
                key={key}
                className="flex-col  items-start gap-xxxs self-stretch"
              >
                <div className="flex justify-between items-center self-stretch text-gray-5 text-sm-md">
                  {key}
                  <CopyButton
                    text={
                      typeof value == "string" ? value : JSON.stringify(value)
                    }
                  />
                </div>
                <div className="flex py-xxxs px-xxs items-start gap-[10px] self-stretch rounded-sm bg-gray-2 text-gray-4 text-sm-regular break-words">
                  <LogMessage
                    MessageContent={
                      typeof value == "string" ? value : JSON.stringify(value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
    </>
  );
}
