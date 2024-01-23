import React, { useState } from "react";
import { TextInputSmall, SelectInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Search, Down, Display } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  setDisplayTimeRange,
  getDashboardData,
  setDisplayMetric,
  setDisplayType,
  setDisplayBreakdown,
} from "src/store/actions";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "src/types";
import { Metrics } from "src/utilities/constants";
import { useForm } from "react-hook-form";

const typeChoices = [
  { name: "Total", value: "total" },
  { name: "Average", value: "average" },
];

const breakdownChoices = [
  { name: "None", value: "none" },
  {
    name: "By model",
    value: "by_model",
  },
  { name: "By key", value: "by_key" },
  // { name: "By token type", value: "by_token_type" }, //only for total tokens
];

export default function DashboardFilter() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const performance_param = new URLSearchParams(location.search).get("metric");
  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };
  const currentMetric = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.metric
  );
  const currentTimeRange = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.timeRange
  );
  const currentType = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.type
  );
  const currentBreakdown = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.breakDown
  );

  let filteredtypeChoices: any[] = [];
  if (
    currentMetric === "number_of_requests" ||
    currentMetric === "error_count"
  ) {
    filteredtypeChoices = typeChoices.filter(
      (choice) => choice.value !== "average"
    );
  } else {
    filteredtypeChoices = typeChoices;
  }

  const filteredBreakdownChoices = breakdownChoices;

  const { register, handleSubmit, watch } = useForm();
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div className="flex-row gap-xxs rounded-xs items-center">
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
        optionsWidth="w-[120px]"
        choices={[
          { name: "Day", value: "daily", secText: "1" },
          { name: "Week", value: "weekly", secText: "2" },
          { name: "Month", value: "monthly", secText: "3" },
          { name: "Year", value: "yearly", secText: "4" },
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
                alignOffset={-40}
                optionsWidth="w-[180px]"
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
                    icon: Metrics.number_of_requests.icon,
                    secText: "1",
                  },
                  {
                    name: Metrics.error_count.name,
                    value: Metrics.error_count.value,
                    icon: Metrics.error_count.icon,
                    secText: "2",
                  },
                  {
                    name: Metrics.average_latency.name,
                    value: Metrics.average_latency.value,
                    icon: Metrics.average_latency.icon,
                    secText: "3",
                  },
                  {
                    name: Metrics.total_prompt_tokens.name,
                    value: Metrics.total_prompt_tokens.value,
                    icon: Metrics.total_prompt_tokens.icon,
                    secText: "4",
                  },
                  {
                    name: Metrics.total_completion_tokens.name,
                    value: Metrics.total_completion_tokens.value,
                    icon: Metrics.total_completion_tokens.icon,
                    secText: "5",
                  },
                  {
                    name: Metrics.total_tokens.name,
                    value: Metrics.total_tokens.value,
                    icon: Metrics.total_tokens.icon,
                    secText: "6",
                  },
                  {
                    name: Metrics.total_cost.name,
                    value: Metrics.total_cost.value,
                    icon: Metrics.total_cost.icon,
                    secText: "7",
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
                    alignOffset={-40}
                    icon={Down}
                    padding="py-xxxs px-xxs"
                    gap="gap-xxs"
                    width="min-w-[140px]"
                    optionsWidth="w-[180px]"
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
                optionsWidth="w-[180px]"
                alignOffset={-40}
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
