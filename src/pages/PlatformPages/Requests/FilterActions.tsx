import React, { useEffect, useState } from "react";
import { SelectInputMenu, SelectCheckBoxMenu } from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  RootState,
  RawFilterOption,
  LogItem,
  Choice,
  Operator,
} from "src/types";
import { addFilter } from "src/store/actions";
import { InputFieldFilter } from "./FilterValueField";
import { setFilterType, setCurrentFilter } from "src/store/actions";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const dispatch = useTypedDispatch();
  const filterOptions = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOptions
  );
  const filterType = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter?.metric
  );
  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const changeFieldType =
    filterOptions?.[filterType ?? "failed"]?.value_field_type ?? "selection";
  const firstStepItems = Object.keys(filterOptions).map(
    (key, index): Choice | undefined => {
      return {
        name: filterOptions[key].display_name,
        value: key,
        onClick: () => {
          selectMetric(key as keyof LogItem);
        },
      };
    }
  );
  const secondStepItems = filterType
    ? filterOptions[filterType]?.value_choices?.map(
        (valueChoice, index): Choice => {
          if (!valueChoice) return null;
          return {
            name: valueChoice.name,
            value: valueChoice.value,
          };
        }
      )
    : [];

  const selectMetric = (metric: keyof LogItem) => {
    dispatch(setFilterType(metric));
    dispatch(
      setCurrentFilter({
        metric,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };

  const selectFilterValue = (filterValue: string[] | number[] | boolean[]) => {
    if (filterValue) {
      dispatch(setCurrentFilter({ ...currentFilter, value: filterValue}));
    }
  };

  const handleDropdownOpen = (open) => {
    setStart(open);
    if (currentFilter?.metric && currentFilter.value) {
      dispatch(
        addFilter({
          display_name:
            filterOptions[currentFilter.metric]?.display_name ??
            "failed",
          metric: filterType!,
          operator:
            (filterOptions[currentFilter.metric]?.operator_choices?.[0]
              ?.value as string) ?? "contains",
          value: currentFilter.value,
          id: currentFilter.id,
          value_field_type:
            filterOptions[currentFilter.metric]?.value_field_type ??
            "selection",
        })
      );
    }
    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
  };

  let trigger: React.ReactNode;
  switch (type) {
    case "create":
      trigger = <Button variant="small" icon={Add} text="Create" />;
      break;
    case "add":
      trigger = (
        <DotsButton icon={Add} onClick={() => handleDropdownOpen(!start)} />
      );
      break;
    default:
      trigger = <Button variant="small-dashed" icon={Filter} text="Filter" />;
      break;
  }
  return (
    <>
      {!filterType || (filterType && changeFieldType === "selection") ? (
        <SelectInputMenu
          trigger={trigger}
          open={start}
          setOpen={handleDropdownOpen}
          onChange={selectFilterValue}
          align="start"
          items={filterType ? secondStepItems || [] : firstStepItems}
          multiple={filterType ? true : false}
        />
      ) : (
        <InputFieldFilter
          filterOption={filterOptions[filterType]!}
          defaultOperator={
            filterOptions[filterType]?.operator_choices?.[0]?.value as Operator
          }
        />
      )}
    </>
  );
}
