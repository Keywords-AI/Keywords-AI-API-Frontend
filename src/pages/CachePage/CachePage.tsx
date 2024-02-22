import React, { useEffect, useState } from "react";
import { Button, DotsButton } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import {
  AlphanumericKey,
  Dots,
  Down,
  Rocket,
} from "src/components/Icons/iconsDS";
import { SelectInput } from "src/components/Inputs";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { ModelTag } from "src/components/Misc";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { setCurrentTimeRange } from "src/store/actions/cachePageAction";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const metrics = [
    {
      name: "Cache hits",
      value: 242,
    },
    {
      name: "Time saved",
      value: "402.68ms",
    },
    {
      name: "Tokens saved",
      value: 24153421,
    },
    {
      name: "Cost saved",
      value: "$2.40",
    },
  ];
  return (
    <div aria-label="frame 1989" className="flex pl-lg self-stretch">
      <div className="flex-col py-md items-start gap-xxs self-stretch text-gray-5 display-xl">
        🤑
      </div>
      <div className="flex items-start flex-1">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.name as string}
            number={metric.value}
          />
        ))}
      </div>
    </div>
  );
};

const TimeRangeSelect = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const handleTimePeriodSelection = (value) => {
    dispatch(setCurrentTimeRange(value, setQueryParams, navigate));
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const { enableScope, disableScope } = useHotkeysContext();
  const currentTimeRange = useTypedSelector(
    (state: RootState) => state.cachePage.timeRange
  );
  const displayTime = (timeRange) => {
    if (timeRange === "monthly") {
      return (
        <span>
          <span className="text-md-md text-gray-5">
            {new Date().toLocaleDateString("en-US", { month: "long" })}{" "}
          </span>
          <span className="text-md-regular text-gray-5">
            {new Date().toLocaleDateString("en-US", { year: "numeric" })}
          </span>
        </span>
      );
    } else if (timeRange === "weekly") {
      const currentDate = new Date();
      // const startOfWeek = currentDate.getDate() - currentDate.getDay() + 1;

      return (
        <span className="text-md-md text-gray-5">
          Week of{" "}
          <span className="text-md-md text-gray-5">
            {new Date().toLocaleDateString("en-US", { month: "long" })}{" "}
          </span>
          <span className="text-md-md text-gray-5">
            {new Date().toLocaleDateString("en-US", { day: "numeric" })}
            {", "}
          </span>
          <span className="text-md-regular text-gray-5">
            {new Date().toLocaleDateString("en-US", { year: "numeric" })}
          </span>
        </span>
      );
    } else if (timeRange === "daily") {
      return (
        <span>
          <span className="text-md-md text-gray-5">
            {new Date().toLocaleDateString("en-US", { month: "long" })}{" "}
          </span>
          <span className="text-md-md text-gray-5">
            {new Date().toLocaleDateString("en-US", { day: "numeric" })}
            {", "}
          </span>
          <span className="text-md-regular text-gray-5">
            {new Date().toLocaleDateString("en-US", { year: "numeric" })}
          </span>
        </span>
      );
    } else if (timeRange === "yearly") {
      return (
        <span className="text-md-regular text-gray-5">
          {new Date().toLocaleDateString("en-US", { year: "numeric" })}
        </span>
      );
    }
  };
  const timeChoices = [
    { name: "Day", value: "daily", secText: "1" },
    { name: "Week", value: "weekly", secText: "2" },
    { name: "Month", value: "monthly", secText: "3" },
    { name: "Year", value: "yearly", secText: "4" },
  ];
  useHotkeys(
    "t",
    () => {
      setShowDropdown((prev) => !prev);
    },
    {
      scopes: "cahcePage",
    }
  );
  useEffect(() => {
    enableScope("cahcePage");
    return () => {
      disableScope("cahcePage");
    };
  }, []);
  return (
    <div className="flex px-lg py-xs justify-between items-center self-stretch shadow-border-tb shadow-gray-2 ">
      <div className="flex items-center gap-xxxs text-md-medium">
        {displayTime(currentTimeRange)}
      </div>
      <SelectInput
        headLess
        trigger={() => (
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            delayDuration={1}
            content={
              <>
                <p className="caption text-gray-4">Timeline</p>
                <AlphanumericKey value={"T"} />
              </>
            }
          >
            <Button
              text={
                timeChoices.find((e) => e.value === currentTimeRange)?.name ||
                "Day"
              }
              variant="small"
              icon={Down}
              iconPosition="right"
            />
          </Tooltip>
        )}
        placeholder="Month"
        align="end"
        value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        optionsWidth="w-[120px]"
        useShortCut
        open={showDropdown}
        choices={timeChoices}
        handleSelected={handleTimePeriodSelection}
      />
    </div>
  );
};
const Table = () => {
  const headers = ["Top caches"];
  const cacheList = [
    {
      userPrompt: "Enter your name",
      hitCounts: 10,
      createdTime: new Date("2022-01-01T00:00:00"),
      lastHitTime: new Date("2022-01-10T00:00:00"),
      model: "gpt-4",
    },
    {
      userPrompt: "Enter your email",
      hitCounts: 20,
      createdTime: new Date("2022-01-02T00:00:00"),
      lastHitTime: new Date("2022-01-12T00:00:00"),
      model: "claude-instant-1.2",
    },
    {
      userPrompt: "Enter your password",
      hitCounts: 30,
      createdTime: new Date("2022-01-03T00:00:00"),
      lastHitTime: new Date("2022-01-13T00:00:00"),
      model: "mistral/mistral-tiny",
    },
  ];
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };
  const Row = ({ userPrompt, hitCounts, createdTime, lastHitTime, model }) => {
    const Dot = () => (
      <svg
        width="2"
        height="2"
        viewBox="0 0 2 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.982132C0.734784 0.982132 0.48043 1.08749 0.292893 1.27503C0.105357 1.46256 0 1.71692 0 1.98213C0 2.53713 0.45 2.98213 1 2.98213C1.555 2.98213 2 2.53713 2 1.98213C2 1.71692 1.89464 1.46256 1.70711 1.27503C1.51957 1.08749 1.26522 0.982132 1 0.982132Z"
          fill="#B1B3BC"
        />
      </svg>
    );

    return (
      <div
        aria-label="row"
        className="flex min-w-[200px] px-lg py-xxs justify-between items-center self-stretch bg-gray-1 shadow-border-b shadow-gray-2"
      >
        <div className="flex-col items-start gap-xxxs">
          <div className="flex items-center gap-xxxs text-sm-md text-center text-gray-5">
            {userPrompt}
          </div>
          <div className="flex items-center gap-xxs">
            <Rocket size="sm" />
            <p className="text-sm-regular text-gray-4">{hitCounts}</p>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-xxs">
            <p className="caption text-center text-gray-4">{`Created: ${formatDate(
              createdTime
            )}`}</p>
            <Dot />
            <p className="caption text-center text-gray-4">{`Last hit: ${formatDate(
              lastHitTime
            )}`}</p>
          </div>
          <div className="flex items-center gap-xxs">
            <ModelTag model={model} />
            <DotsButton icon={Dots} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex-col items-start self-stretch">
      <div
        aria-label="headers"
        className="flex px-lg py-xs items-start gap-sm self-stretch bg-gray-2"
      >
        {headers.map((e, index) => (
          <p key={index} className="text-sm-md text-gray-4 flex-1">
            {e}
          </p>
        ))}
      </div>
      <>
        {cacheList.map((e, i) => (
          <Row key={i} {...e} />
        ))}
      </>
    </div>
  );
};
export default function CachePage() {
  return (
    <div
      aria-label="frame 1733"
      className="flex-col items-start  self-stretch h-[calc(100vh-52px)] flex-1 bg-gray-1"
    >
      <TopBar />
      <TimeRangeSelect />
      <Table />
    </div>
  );
}
