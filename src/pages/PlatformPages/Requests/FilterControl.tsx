import React, { useState } from "react";
import { TextInputSmall, TextInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Search, Down, Display } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  setDisplayTimeRange,
  getDashboardData,
  getRequestLogs,
  setCurrentFilter,
  setFilters,
} from "src/store/actions";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "src/types";
import { get, useForm } from "react-hook-form";
import { FilterPanel } from "./FilterPanel";
import { Filters } from "./RequestFilters";

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

export default function FilterControl() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const handleTimePeriodSelection = (selectedValue) => {
    dispatch(setDisplayTimeRange(selectedValue, setQueryParams, navigate));
    getDashboardData();
  };
  const currentMetric = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.metric
  );
  const filters = useTypedSelector(
    (state: RootState) => state.requestLogs.filters
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

  const { register, handleSubmit, watch } = useForm();
  const [searchText, setSearchText] = useState("");
  const onSubmit = (data: any) => {
    const prompt = data.prompt;
    setQueryParams({ prompt }, navigate);
    setSearchText("");
    dispatch(getRequestLogs());
    const randomId = Math.random().toString(36).substring(2, 15);
    const filterData = {
      metric: "prompt",
      negation: false,
      value: "",
      id: randomId,
    };
    dispatch(setCurrentFilter(filterData));
    const updatedFilters = [...filters, filterData];
    dispatch(setFilters(updatedFilters));
    <Filters metric="prompt"/>
  };

  return (
    <div className="flex-row gap-xxs rounded-xs items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputSmall
          placeholder="Search prompt..."
          icon={Search}
          {...register("prompt", {
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
          })}
          value={searchText}
        />
      </form>
      <Button
        variant="small"
        text="Today"
        type="button"
        onClick={() => {
          setQueryParams({ time_range_type: "daily" }, navigate);
          dispatch(getRequestLogs());
        }}
      />
      <FilterPanel />
    </div>
  );
}
