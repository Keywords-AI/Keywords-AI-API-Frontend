import React, { useEffect, useRef, useState } from "react";
import { TextInputSmall, TextInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import {
  Search,
  Down,
  Display,
  AlphanumericKey,
  Close,
} from "src/components/Icons";
import { Button, IconButton } from "src/components/Buttons";
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
import { toLocalISOString } from "src/utilities/stringProcessing";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
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

  const { register, setValue } = useForm();
  const [searchText, setSearchText] = useState("");
  const { enableScope, disableScope } = useHotkeysContext();
  useHotkeys(
    "/",
    () => {
      if (inputRef.current) {
        if (document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        } else {
          inputRef.current.blur();
        }
      }
    },
    {
      scopes: "small_search_prompt",
      preventDefault: true,
    }
  );
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
  useEffect(() => {
    enableScope("small_search_prompt");
    return () => {
      disableScope("small_search_prompt");
    };
  }, []);
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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-row gap-xxs rounded-xs items-center">
      <TextInputSmall
        placeholder="Search prompt..."
        icon={Search}
        {...register("prompt", {
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
        })}
        name="prompt"
        ref={inputRef}
        value={searchText}
        width="w-[192px]"
        onKeyDown={onKeyDown}
        rightIcon={<AlphanumericKey value="/" />}
        CloseButton
        handleClose={() => setSearchText("")}
      />
      <Button
        variant="small"
        text="Today"
        type="button"
        active={active}
        onClick={() => {
          setQueryParams({ time_range_type: "" }, navigate);
          if (active) {
            // deactivate

            dispatch(setFilters([]));
          } else {
            // activate
            dispatch(
              setFilters(
                filters.filter((filter) => filter.metric !== "timestamp")
              )
            );
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            dispatch(
              addFilter({
                metric: "timestamp",
                value: [toLocalISOString(today)],
                operator: "gte" as Operator,
                value_field_type: "datetime-local",
                display_name: "Time",
                id: Math.random().toString(36).substring(2, 15),
              })
            );
            dispatch(setCurrentFilter({ metric: undefined, id: "" }));
          }

          // dispatch(getRequestLogs());
        }}
      />
      <FilterPanel />
    </div>
  );
}
