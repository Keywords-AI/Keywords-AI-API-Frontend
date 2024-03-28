import React, { useEffect, useState } from "react";
import { Button, DotsButton, SwitchButton } from "src/components/Buttons";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";
import DashboardFilter from "./DashboardFilter";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { getDashboardData } from "src/store/actions";
import MainChart from "./MainChart";
import ChartSelect from "./ChartSelect";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Tooltip from "src/components/Misc/Tooltip";
import { AlphanumericKey } from "src/components/Icons/iconsDS";
import cn from "src/utilities/classMerge";
import { useHotkeys } from "react-hotkeys-hook";
import { setQueryParams } from "src/utilities/navigation";

type Props = {};

export const Dashboard = ({}: Props) => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  return (
    <div className=" flex-col flex-1 self-stretch h-full">
      <div className="shrink-0">
        <TopBar />
      </div>
      <div className="h-full overflow-auto">
        <MainChart />
      </div>
    </div>
  );
};

const TopBar = () => {
  const urlParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [isTest, setIsTest] = useState(
    localStorage.getItem("is_test") === "true"
  );

  useEffect(() => {
    const testMode = localStorage.getItem("is_test") === "true";
    setIsTest(testMode);
  }, []);

  useHotkeys(
    "S",
    () => {
      const newTestMode = localStorage.getItem("is_test") !== "true";
      localStorage.setItem("is_test", newTestMode ? "true" : "false");
      setIsTest(newTestMode);
      dispatch(getDashboardData());
    },
    {}
  );
  const firstTime = useTypedSelector(
    (state) => !state.organization?.has_api_call
  );
  const [hoverTestMode, setHoverTestMode] = useState(false);
  const BCItems = [
    {
      label: "Dashboard",
      link: "/platform/dashboard",
    },
    localStorage.getItem("is_test") === "true"
      ? {
          label: "Test env",
        }
      : {
          label: "Prod env",
        },
  ];
  return (
    <>
      {isTest && (
        <div className="flex flex-row py-xs px-lg items-center gap-xxs self-stretch bg-primary relative h-[44px]">
          <span className="text-sm-md text-gray-5">Test environment </span>
          <span className="text-sm-regular text-gray-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Requests through Playground and API keys with environment = “Test”.
          </span>
        </div>
      )}
      <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch shadow-border shadow-gray-2 w-full h-[52px]">
        <div className="flex items-center gap-sm">
          <BCrumb items={BCItems} />
        </div>
        <div className="flex items-center gap-xxs">
          {firstTime ? (
            <>
              <Button
                variant="r4-gray-2"
                text="View docs"
                onClick={() => window.open("https://docs.keywordsai.co/")}
              />
              <Button
                variant="r4-primary"
                text="Get API keys"
                onClick={() => navigate("/platform/api/api-keys")}
              />
            </>
          ) : (
            <>
              <Tooltip
                side="bottom"
                sideOffset={4}
                align="center"
                delayDuration={1}
                content={
                  <>
                    <p className="caption text-gray-4">Switch environment</p>
                    <AlphanumericKey value={"S"} />
                  </>
                }
              >
                <div
                  className={cn(
                    "flex flex-row gap-xxs items-center py-xxxs px-xxs rounded-sm hover:bg-gray-3 cursor-pointer",
                    localStorage.getItem("is_test") === "true"
                      ? "bg-gray-3"
                      : ""
                  )}
                  onMouseEnter={() => setHoverTestMode(true)}
                  onMouseLeave={() => setHoverTestMode(false)}
                  onClick={() => {
                    const newTestMode =
                      localStorage.getItem("is_test") !== "true";
                    localStorage.setItem(
                      "is_test",
                      newTestMode ? "true" : "false"
                    );
                    setIsTest(newTestMode);
                    setQueryParams({ is_test: newTestMode });
                    dispatch(getDashboardData());
                  }}
                >
                  {!hoverTestMode && !isTest && (
                    <span className="text-gray-4 text-sm-regular">
                      Test env
                    </span>
                  )}
                  {hoverTestMode && !isTest && (
                    <span className="text-gray-5 text-sm-regular">
                      Test env
                    </span>
                  )}
                  {isTest && (
                    <span className="text-primary text-sm-md">Test env</span>
                  )}
                  <SwitchButton
                    hovered={hoverTestMode}
                    checked={isTest}
                    // onCheckedChange={(checked) => {}}
                  />
                </div>
              </Tooltip>
              <DashboardFilter />
              <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
              <ChartSelect />
            </>
          )}
        </div>
      </div>
    </>
  );
};
