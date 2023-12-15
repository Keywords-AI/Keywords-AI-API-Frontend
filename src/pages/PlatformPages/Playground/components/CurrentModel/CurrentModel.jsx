import { Button, DropDownMenu, ModelIcon } from "src/components";
import React, { useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentModel,
  setCacheAnswer,
  setMessages,
} from "src/store/actions/playgroundAction";
export const CurrentModel = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const streaming = useSelector((state) => state.playground.streaming);
  const currentModel = useSelector((state) => state.playground.currentModel);
  const cacheAnswers = useSelector((state) => state.playground.cacheAnswers);
  const models = [
    {
      name: "OpenAI - gpt-3.5-turbo",
      value: "gpt-3.5-turbo",
      icon: ModelIcon("openai"),
    },
    {
      name: "Claude 2",
      value: "claude-2",
      icon: ModelIcon("ai21"),
    },
  ];
  useEffect(() => {
    dispatch(setCurrentModel(models[0].value));
  }, []);
  const [current, setCurrent] = React.useState(models[0]);
  const [open, setOpen] = React.useState(false);
  const firstTime = useSelector((state) => state.playground.firstTime);
  if (firstTime) {
    return null;
  }
  return (
    <div className="flex-col items-start gap-xxs self-stretch">
      <p className="text-sm-regular text-center text-gray-4">Current model</p>
      <DropDownMenu
        open={open}
        setOpen={setOpen}
        trigger={
          <Button
            variant="r4-black"
            text={current.name}
            icon={current.icon}
            padding="py-xxxs px-xxs"
            onClick={() => setOpen(!open)}
          />
        }
        items={
          <>
            {models.map((model, index) => (
              <DropdownMenuPrimitive.Item key={index} asChild>
                <div
                  className="flex items-center gap-xxs py-xxs px-xs rounded-sm hover:bg-gray-3 hover:cursor-pointer text-gray-white outline-none self-stretch group"
                  onClick={() => {
                    if (streaming) return;
                    setCurrent({
                      name: model.name,
                      value: model.value,
                      icon: model.icon,
                    });
                    dispatch(setCurrentModel(model.value));
                    const updatedMessages = [...messages];
                    const lastMessageIndex = updatedMessages.length - 1;
                    if (
                      !cacheAnswers[model.value] ||
                      cacheAnswers[model.value].index != lastMessageIndex
                    ) {
                      // TODO: if the model has not been cached or the cached index is not the last message index call api to get the answer
                    } else {
                      // TODO: if the model has been cached and the cached index is the last message index, set the answer to the last message
                      dispatch(
                        setMessages(
                          updatedMessages.map((message, index) => {
                            if (index === lastMessageIndex) {
                              return {
                                ...message,
                                content: cacheAnswers[model.value].answer,
                              };
                            }
                            return message;
                          })
                        )
                      );
                    }
                  }}
                >
                  <div className="flex w-[16px] justify-center items-center gap-[10px]">
                    {React.createElement(model.icon)}
                  </div>

                  <p className="text-sm-regular text-gray-4 group-hover:text-gray-white">
                    {model.name}
                  </p>
                </div>
              </DropdownMenuPrimitive.Item>
            ))}
          </>
        }
      />
    </div>
  );
};
