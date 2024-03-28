import {
  Left,
  Button,
  DropDownMenu,
  EditableBox,
  Low,
  High,
  Cost,
  Medium,
  Quality,
  Speed,
  Tokens,
} from "src/components";
import "./OptionSelector.css";
import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setModelOptions } from "src/store/actions/playgroundAction";
import { NumberInput } from "src/components/Inputs";
import { SwitchButton } from "src/components/Buttons";
export function OptionSelector({}) {
  const dispatch = useDispatch();
  const [optimizeOpen, setOptimizeOpen] = React.useState(false);
  const [creativityOpen, setCreativityOpen] = React.useState(false);
  const [token, setToken] = React.useState(
    useSelector((state) => state.playground.modelOptions.maxTokens)
  );
  const handleCheckChange = (value) => {
    console.log(value);
  };
  const [current, setCurrent] = React.useState([
    {
      name: "Speed",
      value: "speed",
      icon: Speed,
    },
    {
      name: "High",
      value: "high",
      icon: High,
    },
  ]);
  const updateRedux = (propertyName, value) => {
    dispatch(setModelOptions({ [propertyName]: value }));
  };
  const options = [
    {
      name: "Optimize",
      open: optimizeOpen,
      setOpen: setOptimizeOpen,

      options: [
        {
          name: "Speed",
          value: "speed",
          icon: Speed,
          action: function () {
            setCurrent((prev) => [
              { name: this.name, value: this.value, icon: this.icon },
              prev[1],
            ]);
            updateRedux("optimize", this.value);
          },
        },
        {
          name: "Quality",
          value: "quality",
          icon: Quality,
          action: function () {
            setCurrent((prev) => [
              { name: this.name, value: this.value, icon: this.icon },
              prev[1],
            ]);
            updateRedux("optimize", this.value);
          },
        },
        {
          name: "Cost",
          value: "cost",
          icon: Cost,
          action: function () {
            setCurrent((prev) => [
              { name: this.name, value: this.value, icon: this.icon },
              prev[1],
            ]);
            updateRedux("optimize", this.value);
          },
        },
        // {
        //   name: "Custom",
        //   value: "custom",
        //   icon: Custom,
        //   action: function () {
        //     setCurrent((prev) => [
        //       { name: this.name, value: this.value, icon: this.icon },
        //       prev[1],
        //     ]);
        //     updateRedux("optimize", this.value);
        //   },
        // },
      ],
    },
    {
      name: "Creativity",
      open: creativityOpen,
      setOpen: setCreativityOpen,

      options: [
        {
          name: "High",
          value: "high",
          icon: High,
          action: function () {
            setCurrent((prev) => [
              prev[0],
              { name: this.name, value: this.value, icon: this.icon },
            ]);
            updateRedux("creativity", this.value);
          },
        },
        {
          name: "Medium",
          value: "medium",
          icon: Medium,
          action: function () {
            setCurrent((prev) => [
              prev[0],
              { name: this.name, value: this.value, icon: this.icon },
            ]);
            updateRedux("creativity", this.value);
          },
        },
        {
          name: "Low",
          value: "low",
          icon: Low,
          action: function () {
            setCurrent((prev) => [
              prev[0],
              { name: this.name, value: this.value, icon: this.icon },
            ]);
            updateRedux("creativity", this.value);
          },
        },
      ],
    },
  ];

  const handleChange = (value) => {
    setToken(value);
    dispatch(setModelOptions({ max_tokens: value }));
  };
  return (
    <div className="flex items-start gap-lg">
      <div className="flex-col items-start gap-sm self-stretch justify-center">
        {options.map((item, index) => (
          <div className="flex items-center gap-lg py-xxs" key={index}>
            <p className="text-sm-regular text-gray-4">{item.name}</p>
          </div>
        ))}
        <div className="flex items-center gap-lg py-xxs">
          <p className="text-sm-regular text-gray-4">Max tokens</p>
        </div>
        <div className="flex items-center gap-lg py-xxs">
          <p className="text-sm-regular text-gray-4">Auto routing</p>
        </div>
      </div>
      <div className="flex-col items-start gap-sm h-full">
        {options.map((item, index) => (
          <DropDownMenu
            key={index}
            side="left"
            sideOffset={0}
            align="start"
            width="w-full"
            trigger={
              <Button
                variant="r4-gray-2"
                text={current[index].name}
                icon={current[index].icon}
                onClick={() => item.setOpen(true)}
                iconPosition="left"
              />
            }
            open={item.open}
            setOpen={item.setOpen}
            items={
              <React.Fragment>
                {item.options.map((option, index) => (
                  <DropdownMenuPrimitive.Item key={index} asChild>
                    <Button
                      variant="panel"
                      text={option.name}
                      icon={option.icon}
                      onClick={() => option.action()}
                      iconPosition="left"
                    />
                  </DropdownMenuPrimitive.Item>
                ))}
              </React.Fragment>
            }
          />
        ))}
        <div className="flex w-[88px] ">
          <NumberInput
            icon={Tokens}
            iconClassName="fill-gray-4"
            value={token}
            onChange={handleChange}
            onClick={() => setToken("")}
          />
        </div>
        <div className="flex h-[36px] items-center px-xs gap-[10px]">
          <SwitchButton onCheckedChange={handleCheckChange} />
        </div>
      </div>
    </div>
  );
}
