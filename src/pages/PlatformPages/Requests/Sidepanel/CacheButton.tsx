import { useEffect, useState } from "react";
import { Button } from "src/components/Buttons/Button/Button";
import { setCacheResponse } from "src/store/actions";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";

export const CacheButton = ({
    message,
    completeInteraction,
    index,
    logId,
    systemPrompt,
  }) => {
    const getMessageType = (role: string) => {
        if (role === "[system]") {
          return "System";
        } else if (role === "user") {
          return "User";
        }
        return "Response";
      };
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
  