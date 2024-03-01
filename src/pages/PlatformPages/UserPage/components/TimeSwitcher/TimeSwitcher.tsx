import { useState } from "react";
import { Button } from "src/components/Buttons";
import { AlphanumericKey, Down } from "src/components/Icons/iconsDS";
import { SelectInput } from "src/components/Inputs";
import Tooltip from "src/components/Misc/Tooltip";
import { setUsersLogDataTimeRange } from "src/store/actions/usersPageAction";
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export interface TimeSwitcherProps {}

export function TimeSwitcher({}: TimeSwitcherProps) {
  const dispatch = useTypedDispatch();
  const timeValueToName = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month",
    yearly: "Year",
  };
  const currentTimeRange = useTypedSelector(
    (state) => state.usersPage.timeRane
  );
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="flex-row gap-xxs rounded-xs items-center">
      <Button
        variant="small"
        text="Today"
        active={currentTimeRange === "daily"}
        onClick={() => {
          dispatch(setUsersLogDataTimeRange("daily"));
        }}
      />
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
              text={timeValueToName[currentTimeRange]}
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
        choices={[
          { name: "Day", value: "daily", secText: "1" },
          { name: "Week", value: "weekly", secText: "2" },
          { name: "Month", value: "monthly", secText: "3" },
          { name: "Year", value: "yearly", secText: "4" },
        ]}
        handleSelected={(value) => {
          dispatch(setUsersLogDataTimeRange(value as string));
        }}
      />
    </div>
  );
}
