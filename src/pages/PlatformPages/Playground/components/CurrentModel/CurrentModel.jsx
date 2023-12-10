import { Button, DropDownMenu, ModelIcon } from "src/components";
import React, { useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { setCurrentModel } from "src/store/actions/playgroundAction";
export const CurrentModel = () => {
  const dispatch = useDispatch();
  const models = [
    {
      name: "OpenAI - gpt-3.5-turbo",
      value: "openai",
      icon: ModelIcon("openai"),
    },
    {
      name: "Model 2",
      value: "model2",
      icon: ModelIcon("ai21"),
    },
    {
      name: "Model 3",
      value: "model3",
      icon: ModelIcon("openai"),
    },
  ];
  useEffect(() => {
    dispatch(setCurrentModel(models[0].value));
  }, []);
  const [current, setCurrent] = React.useState(models[0]);
  const [open, setOpen] = React.useState(false);
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
                  className="flex items-center gap-xxs py-xxs px-xs rounded-sm hover:bg-gray-3 hover:cursor-pointer text-gray-white outline-none self-stretch"
                  onClick={() => {
                    setCurrent({
                      name: model.name,
                      value: model.value,
                      icon: model.icon,
                    });
                    dispatch(setCurrentModel(model.value));
                  }}
                >
                  <div className="flex w-[16px] justify-center items-center gap-[10px]">
                    {React.createElement(model.icon)}
                  </div>

                  <p className="text-sm-md text-gray-4">{model.name}</p>
                </div>
              </DropdownMenuPrimitive.Item>
            ))}
          </>
        }
      />
    </div>
  );
};
