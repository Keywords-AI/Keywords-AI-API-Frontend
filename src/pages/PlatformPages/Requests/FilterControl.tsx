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
import { Button, IconButton, SwitchButton } from "src/components/Buttons";
import store, { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  getRequestLogs,
  addFilter,
  setCurrentFilter,
  setFilters,
  updateFilter,
  deleteFilter,
} from "src/store/actions";
import { getQueryParam, setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { Operator, RootState } from "src/types";
import { get, useForm } from "react-hook-form";
import { FilterPanel } from "./FilterPanel";
import { toLocalISOString } from "src/utilities/stringProcessing";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { Switch } from "@radix-ui/react-switch";
import Tooltip from "src/components/Misc/Tooltip";
import cn from "src/utilities/classMerge";
const typeChoices = [
  { name: "Total", value: "total" },
  { name: "Average", value: "average" },
];

export default function FilterControl() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const timeRange = urlParams.get("time_range_type");
  const is_test = urlParams.get("is_test") === "true" ? true : false;
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
  useHotkeys(
    "M",
    () => {
      setQueryParams({ is_test: !is_test }, navigate);
    },
    {}
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
  const [hoverTestMode, setHoverTestMode] = useState(false);

  return (
    <div className="flex flex-row gap-xxs items-center">
      <Tooltip
        side="bottom"
        sideOffset={8}
        align="end"
        delayDuration={1}
        content={
          <>
            <p className="caption text-gray-4">Switch mode</p>
            <AlphanumericKey value={"M"} />
          </>
        }
      >
        <div
          className={cn ("flex flex-row gap-xxs items-center py-xxxs px-xxs rounded-sm hover:bg-gray-2 cursor-pointer", is_test ? "bg-gray-2" : "" )}
          onMouseEnter={() => setHoverTestMode(true)}
          onMouseLeave={() => setHoverTestMode(false)}
          onClick={() => {
            setQueryParams({ is_test: !is_test }, navigate);
            dispatch(getRequestLogs());
          }}
        >
          {!hoverTestMode && !is_test && (
            <span className="text-gray-4 text-sm-regular">Test env</span>
          )}
          {hoverTestMode && !is_test && (
            <span className="text-gray-5 text-sm-regular">Test env</span>
          )}
          {is_test && (
            <span className="text-primary text-sm-md">Test env</span>
          )}
          <SwitchButton hovered={hoverTestMode} checked={is_test} />
        </div>
      </Tooltip>

      <div className="w-[1px] h-[28px] bg-gray-2"></div>
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

              const latestTimeFilter = store
                .getState()
                .requestLogs.filters.find(
                  (item) => item.metric === "timestamp"
                );
              if (!latestTimeFilter) return;
              // dispatch(setCurrentFilter({ metric: undefined, id: "" }));
              dispatch(deleteFilter(latestTimeFilter.id));
            } else {
              // activate

              let today = new Date();
              today.setHours(0, 0, 0, 0);
              const filters = store.getState().requestLogs.filters;
              const sameTypeFilter = filters.find(
                (filter) => filter.metric === "timestamp"
              );
              const filterOptions = store.getState().requestLogs.filterOptions;
              if (sameTypeFilter) {
                dispatch(
                  updateFilter({
                    display_name:
                      filterOptions["timestamp"]?.display_name ?? "failed",
                    metric: "timestamp",
                    operator:
                      (filterOptions["timestamp"]?.operator_choices?.[0]
                        ?.value as string) ?? "contains",
                    value: Array.from(new Set([toLocalISOString(today)])),
                    id: sameTypeFilter.id,
                    value_field_type:
                      filterOptions["timestamp"]?.value_field_type ??
                      "selection",
                  })
                );
              } else {
                dispatch(
                  addFilter({
                    display_name:
                      filterOptions["timestamp"]?.display_name ?? "failed",
                    metric: "timestamp",
                    operator:
                      (filterOptions["timestamp"]?.operator_choices?.[0]
                        ?.value as string) ?? "contains",
                    value: [toLocalISOString(today)],
                    id: Math.random().toString(36).substring(2, 15),
                    value_field_type:
                      filterOptions["timestamp"]?.value_field_type ??
                      "selection",
                  })
                );
              }
            }
          }}
        />
        <FilterPanel />
      </div>
    </div>
  );
}
