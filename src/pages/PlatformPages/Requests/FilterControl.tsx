import React from "react";
import { TextInputSmall, SelectInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Search, Down, Display } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { setDisplayTimeRange, getDashboardData } from "src/store/actions";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate } from "react-router-dom";

export default function FilterControl() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };
  return (
    <div className="flex-row gap-xxxs rounded-xs items-center">
      <TextInputSmall
        placeholder="Search prompt..."
        icon={Search}
        onChange={() => {}}
      />
      <Button
        variant="small"
        text="Today"
        onClick={() => handleTimePeriodSelection("daily")}
      />
      <SelectInput
        headLess
        placeholder="Month"
        align="end"
        value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[
          { name: "Day", value: "daily" },
          { name: "Week", value: "weekly" },
          { name: "Month", value: "monthly" },
          { name: "Year", value: "yearly" },
        ]}
        handleSelected={handleTimePeriodSelection}
      />
      <Popover
        trigger={
          <Button
            variant="small"
            text="Display"
            icon={Display}
            secIcon={Down}
            secIconPosition="right"
            onClick={() => setShowPopover((prev) => !prev)}
          />
        }
        open={showPopover}
        setOpen={setShowPopover}
        side="bottom"
        sideOffset={5}
        align="end"
        width="w-[320px]"
      >
        <form className={"flex flex-col gap-xxs items-end"}>
          <div className="flex flex-col items-start gap-xxs self-stretch">
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Metric</span>
              <SelectInput
                {...register("metric")}
                headLess
                placeholder="Request"
                align="start"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
                width="min-w-[140px]"
                onChange={(e) => {
                  dispatch(
                    setDisplayMetric(e.target.value, setQueryParams, navigate)
                  );
                  getDashboardData();
                }}
                value={currentMetric}
                choices={[
                  {
                    name: Metrics.number_of_requests.name,
                    value: Metrics.number_of_requests.value,
                  },
                  {
                    name: Metrics.error_count.name,
                    value: Metrics.error_count.value,
                  },
                  {
                    name: Metrics.average_latency.name,
                    value: Metrics.average_latency.value,
                  },
                  {
                    name: Metrics.total_cost.name,
                    value: Metrics.total_cost.value,
                  },
                  {
                    name: Metrics.total_tokens.name,
                    value: Metrics.total_tokens.value,
                  },
                  {
                    name: Metrics.total_completion_tokens.name,
                    value: Metrics.total_completion_tokens.value,
                  },
                  {
                    name: Metrics.total_prompt_tokens.name,
                    value: Metrics.total_prompt_tokens.value,
                  },
                ]}
              />
            </div>
            {performance_param !== Metrics.number_of_requests.value &&
              performance_param !== Metrics.error_count.value &&
              performance_param !== Metrics.average_latency.value && (
                <div className="flex justify-between items-center self-stretch ">
                  <span className="text-sm-regular text-gray-4">Type</span>
                  <SelectInput
                    {...register("type")}
                    headLess
                    placeholder="Total"
                    align="start"
                    icon={Down}
                    padding="py-xxxs px-xxs"
                    gap="gap-xxs"
                    width="min-w-[140px]"
                    value={currentType}
                    onChange={(e) =>
                      dispatch(
                        setDisplayType(e.target.value, setQueryParams, navigate)
                      )
                    }
                    choices={filteredtypeChoices}
                  />
                </div>
              )}
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Breakdown</span>
              <SelectInput
                {...register("breakdown")}
                headLess
                placeholder="None"
                align="start"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
                width="min-w-[140px]"
                value={currentBreakdown}
                onChange={(e) =>
                  dispatch(
                    setDisplayBreakdown(
                      e.target.value,
                      setQueryParams,
                      navigate
                    )
                  )
                }
                choices={filteredBreakdownChoices}
              />
            </div>
          </div>
        </form>
      </Popover>
    </div>
  );
}
