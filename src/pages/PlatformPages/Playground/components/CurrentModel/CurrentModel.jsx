import { Button, DropDownMenu, ModelIcon } from "src/components";
import React, { useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentModel,
  setLastMessage,
  removeLastMessage,
  appendMessage,
  setCurrentBrand,
  regeneratePlaygroundResponse,
} from "src/store/actions/playgroundAction";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    messages: state.playground.messages,
    streaming: state.playground.streaming,
    cacheAnswers: state.playground.cacheAnswers,
    currentModel: state.playground.currentModel,
  };
};
const mapDispatchToProps = {};

const findModel = (models, modelName) => {
  return models.find((model) => model.value === modelName) || models[0];
}
const NotConnectedCurrentModel = ({ messages, streaming, cacheAnswers, currentModel }) => {
  const dispatch = useDispatch();
  const models = [
    {
      name: "OpenAI - GPT-3.5-turbo",
      value: "gpt-3.5-turbo",
      brand: "openai",
    },
    {
      name: "OpenAI - GPT-4-32k",
      value: "gpt-4-32k",
      brand: "openai",
    },
    {
      name: "OpenAI - GPT-4",
      value: "gpt-4",
      brand: "openai",
    },
    {
      name: "Claude 2.1",
      value: "claude-2.1",
      brand: "anthropic",
    },
    {
      name: "Claude 2",
      value: "claude-2",
      brand: "anthropic",
    },
    {
      name: "OpenAI - GPT-4-1106-preview",
      value: "gpt-4-1106-preview",
      brand: "openai",
    },
    {
      name: "Claude Instant 1",
      value: "claude-instant-1",
      brand: "anthropic",
    },
    {
      name: "Claude Instant 1.2",
      value: "claude-instant-1.2",
      brand: "anthropic",
    },

    {
      name: "OpenAI - GPT-3.5-turbo-16k",
      value: "gpt-3.5-turbo-16k",
      brand: "openai",
    },
    {
      name: "Chat Bison",
      value: "chat-bison",
      brand: "bison",
    },
    {
      name: "J2 Light",
      value: "j2-light",
      brand: "labs",
    },
    {
      name: "Command Nightly",
      value: "command-nightly",
      brand: "cohere",
    },
    {
      name: "J2 Mid",
      value: "j2-mid",
      brand: "labs",
    },
    {
      name: "J2 Ultra",
      value: "j2-ultra",
      brand: "labs",
    },
  ];
  useEffect(() => {
    dispatch(setCurrentModel(models[0].value));
    dispatch(setCurrentBrand(models[0].brand));
  }, []);
  useEffect(() => {
    if (currentModel) {
      const model = findModel(models, currentModel);
      setCurrent(model);
    }
  }, [currentModel]);
  const [current, setCurrent] = React.useState(findModel(models, currentModel));
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
            variant="r4-gray-2"
            text={current.name}
            icon={ModelIcon(current.brand)}
            iconSize="md"
            iconPosition="left"
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
                  icon={ModelIcon(model.brand)}
                  onClick={() => {
                    if (streaming) return;
                    setCurrent({
                      name: model.name,
                      value: model.value,
                      icon: ModelIcon(model.brand),
                    });

                    dispatch(setCurrentModel(model.value));
                    dispatch(setCurrentBrand(model.brand));
                    let lastUserMessageIndex = messages.reduce(
                      (lastIndex, message, currentIndex) => {
                        if (message.role === "user") {
                          return currentIndex;
                        }
                        return lastIndex;
                      },
                      -1
                    );
                    if (lastUserMessageIndex > 0) lastUserMessageIndex -= 2;
                    if (
                      !cacheAnswers[model.value]
                      || cacheAnswers[model.value].index != lastUserMessageIndex
                    ) {
                      // TODO: if the model has not been cached or the cached index is not the last message index call api to get the answer
                      dispatch(regeneratePlaygroundResponse());
                    } else {
                      // TODO: if the model has been cached and the cached index is the last message index, set the answer to the last message
                      dispatch(removeLastMessage());
                      dispatch(
                        setLastMessage({
                          role: model.value,
                          content: cacheAnswers[model.value].answer,
                        })
                      );
                      dispatch(
                        appendMessage({ role: "user", content: "" })
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

export const CurrentModel = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectedCurrentModel);