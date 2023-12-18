import { Button, DropDownMenu, ModelIcon } from "src/components";
import React, { useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentModel,
  setCacheAnswer,
  setMessages,
  setLastMessage,
  removeLastMessage,
  appendMessage,
} from "src/store/actions/playgroundAction";
import { sendStreamingTextThunk } from "src/store/thunks/streamingTextThunk";
import store from "src/store/store";
export const CurrentModel = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.playground.messages);
  const streaming = useSelector((state) => state.playground.streaming);
  const currentModel = useSelector((state) => state.playground.currentModel);
  const cacheAnswers = useSelector((state) => state.playground.cacheAnswers);
  const systemPrompt = useSelector((state) => state.playground.prompt);
  const models = [
    {
      name: "OpenAI - GPT-3.5-turbo",
      value: "gpt-3.5-turbo",
      icon: ModelIcon("openai"),
    },
    {
      name: "OpenAI - GPT-4-32k",
      value: "gpt-4-32k",
      icon: ModelIcon("openai"),
    },
    {
      name: "OpenAI - GPT-4",
      value: "gpt-4",
      icon: ModelIcon("openai"),
    },
    {
      name: "Claude 2.1",
      value: "claude-2.1",
      icon: ModelIcon("anthropic"),
    },
    {
      name: "OpenAI - GPT-4-1106-preview",
      value: "gpt-4-1106-preview",
      icon: ModelIcon("openai"),
    },
    {
      name: "Claude Instant 1",
      value: "claude-instant-1",
      icon: ModelIcon("anthropic"),
    },
    {
      name: "Claude Instant 1.2",
      value: "claude-instant-1.2",
      icon: ModelIcon("anthropic"),
    },

    {
      name: "OpenAI - GPT-3.5-turbo-16k",
      value: "gpt-3.5-turbo-16k",
      icon: ModelIcon("openai"),
    },
    {
      name: "Chat Bison",
      value: "chat-bison",
      icon: ModelIcon("google"),
    },
    {
      name: "J2 Light",
      value: "j2-light",
      icon: ModelIcon("labs"),
    },
    {
      name: "Command Nightly",
      value: "command-nightly",
      icon: ModelIcon("cohere"),
    },
    {
      name: "J2 Mid",
      value: "j2-mid",
      icon: ModelIcon("labs"),
    },
    {
      name: "J2 Ultra",
      value: "j2-ultra",
      icon: ModelIcon("labs"),
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
        width="300"
        trigger={
          <Button
            variant="r4-black"
            text={current.name}
            icon={current.icon}
            iconPosition="left"
            padding="py-xxxs px-xxs"
            onClick={() => setOpen(!open)}
            disabled={streaming}
          />
        }
        items={
          <>
            {models.map((model, index) => (
              <DropdownMenuPrimitive.Item key={index} asChild>
                <Button
                  variant="panel"
                  text={model.name}
                  icon={model.icon}
                  iconFill="fill-gray-white"
                  onClick={() => {
                    if (streaming) return;
                    setCurrent({
                      name: model.name,
                      value: model.value,
                      icon: model.icon,
                    });
                    dispatch(setCurrentModel(model.value));
                    const lastUserMessageIndex = messages.reduce(
                      (lastIndex, message, currentIndex) => {
                        if (message.role === "user") {
                          return currentIndex;
                        }
                        return lastIndex;
                      },
                      -1
                    );
                    console.log("lastMessageIndex", lastUserMessageIndex);
                    console.log("cacheAnswers", cacheAnswers[model.value]);
                    if (
                      !cacheAnswers[model.value] ||
                      cacheAnswers[model.value].index != lastUserMessageIndex
                    ) {
                      // TODO: if the model has not been cached or the cached index is not the last message index call api to get the answer

                      store.dispatch(removeLastMessage());

                      sendStreamingTextThunk({
                        params: {
                          messages: messages,
                          stream: true,
                          model: model.value,
                        },
                        prompt: systemPrompt,
                        callback: () => {
                          const currentModel =
                            store.getState().playground.currentModel;
                          const streamingText =
                            store.getState().streamingText.streamingText;
                          const newMessage = {
                            role: currentModel,
                            content: streamingText,
                          };
                          store.dispatch(appendMessage(newMessage));
                          const cache = {
                            answer: streamingText,
                            index: lastUserMessageIndex,
                          };
                          store.dispatch(setCacheAnswer(currentModel, cache));
                        },
                        dispatch: store.dispatch,
                        getState: store.getState,
                      });
                    } else {
                      // TODO: if the model has been cached and the cached index is the last message index, set the answer to the last message
                      store.dispatch(
                        setLastMessage({
                          role: model.value,
                          content: cacheAnswers[model.value].answer,
                        })
                      );
                    }
                  }}
                />
              </DropdownMenuPrimitive.Item>
            ))}
          </>
        }
      />
    </div>
  );
};
