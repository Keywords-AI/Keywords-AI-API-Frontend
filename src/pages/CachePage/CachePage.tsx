import React, { useEffect, useState } from "react";
import { Button } from "src/components/Buttons";
import MetricCard from "src/components/Cards/MetricCard";
import { AlphanumericKey, Down } from "src/components/Icons/iconsDS";
import { SelectInput } from "src/components/Inputs";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
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
  const handleTimePeriodSelection = () => {};
  const [showDropdown, setShowDropdown] = useState(false);
  const { enableScope, disableScope } = useHotkeysContext();
  useHotkeys(
    "t",
    () => {
      setShowDropdown((prev) => !prev);
    },
    {
      scopes: "dashboard",
    }
  );
  useEffect(() => {
    enableScope("dashboard");
    return () => {
      disableScope("dashboard");
    };
  }, []);
  return (
    <div className="flex px-lg py-xs justify-between items-center self-stretch">
      <div className="flex items-center gap-xxxs text-md-medium">Time</div>
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
              text={"timeline"}
              variant="small"
              icon={Down}
              iconPosition="right"
            />
          </Tooltip>
        )}
        placeholder="Month"
        align="end"
        value={"currentTimeRange"}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        optionsWidth="w-[120px]"
        useShortCut
        open={showDropdown}
        choices={[
          { name: "Day", value: "daily", secText: "1" },
          { name: "Week", value: "weekly", secText: "2" },
          { name: "Month", value: "monthly", secText: "3" },
          { name: "Year", value: "yearly", secText: "4" },
        ]}
        handleSelected={handleTimePeriodSelection}
      />
    </div>
  );
};
const Table = () => {
  return <div>Table</div>;
};
export default function CachePage() {
  return (
    <div
      aria-label="frame 1733"
      className="flex-col items-start  self-stretch h-[calc(100vh-52px)] flex-1 "
    >
      <TopBar />
      <TimeRangeSelect />
      <Table />
    </div>
  );
}
