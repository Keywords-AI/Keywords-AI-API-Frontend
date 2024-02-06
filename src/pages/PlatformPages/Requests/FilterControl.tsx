import React, { useState } from "react";
import { TextInputSmall, TextInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Search, Down, Display } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  getRequestLogs,
  addFilter,
  setCurrentFilter,
  setFilters,
} from "src/store/actions";
import { getQueryParam, setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { Operator, RootState } from "src/types";
import { get, useForm } from "react-hook-form";
import { FilterPanel } from "./FilterPanel";

const typeChoices = [
  { name: "Total", value: "total" },
  { name: "Average", value: "average" },
];

export default function FilterControl() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const timeRange = new URLSearchParams(location.search).get("time_range_type");
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

  const { register } = useForm();
  const [searchText, setSearchText] = useState("");
  const onSubmit = (e: any) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    dispatch(
      addFilter({
        display_name: "Prompt",
        metric: "prompt_messages",
        value: [searchText],
        id: randomId,
        operator: "icontains",
        value_field_type: "text",
      })
    );
    setSearchText("");
  };
  // Use this instead of default form submit to avoid discontinuity in redux states
  // Error: A state mutation was detected between dispatches, in the path 'requestLogs.filters.1.value'.
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };
  const active =
    filters.find((filter) => {
      if (filter.metric === "timestamp") {
        const filterDate = new Date(filter.value[0] as string);
        const today = new Date();
        return (
          filterDate.getDate() === today.getDate() &&
          filterDate.getMonth() === today.getMonth() &&
          filterDate.getFullYear() === today.getFullYear()
        );
      }
    }) !== undefined;
  return (
    <div className="flex-row gap-xxs rounded-xs items-center">
      <TextInputSmall
        placeholder="Search prompt..."
        icon={Search}
        {...register("prompt", {
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
        })}
        value={searchText}
        width="w-[192px]"
        onKeyDown={onKeyDown}
      />
      <Button
        variant="small"
        text="Today"
        type="button"
        active={active}
        onClick={() => {
          if (active) {
            // deactivate
            // setQueryParams({ time_range_type: "" }, navigate);
            dispatch(setFilters([]));
          } else {
            // activate
            dispatch(
              setFilters(
                filters.filter(
                  (filter) => filter.metric !== "timestamp"
                )
              )
            );
            dispatch(
              addFilter({
                metric: "timestamp",
                value: [new Date().toISOString().substring(0, 16)],
                operator: "lte" as Operator,
                value_field_type: "datetime-local",
                display_name: "Time",
                id: Math.random().toString(36).substring(2, 15),
              })
            );
            dispatch(setCurrentFilter({ metric: undefined, id: "" }));
          }

          dispatch(getRequestLogs());
        }}
      />
      <FilterPanel />
    </div>
  );
}
