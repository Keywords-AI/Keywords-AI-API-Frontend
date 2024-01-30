import React, { useEffect, useState } from "react";
import { DropDownMenu } from "src/components";
import { SelectInputMenu, SelectCheckBoxMenu } from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState, RawFilterOption, LogItem, Choice } from "src/types";
import { getRequestLogs, addFilter } from "src/store/actions";
import { TextInput } from "src/components/Inputs";
import { useForm } from "react-hook-form";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const [filterType, setFilterType] = useState<keyof LogItem | undefined>(
    undefined
  );
  const dispatch = useTypedDispatch();
  const filterOptions = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOptions
  );

  const firstStepItems = Object.keys(filterOptions).map(
    (key, index): Choice | undefined => {
      if (filterOptions[key].value_field_type !== "text") {
        return {
          name: filterOptions[key].display_name,
          value: key,
          onClick: () => {
            selectMetric(key as keyof LogItem);
          },
        };
      }
      return undefined;
    }
  );
  const secondStepItems = filterType
    ? (filterOptions[filterType] as RawFilterOption).value_choices.map(
        (valueChoice, index): Choice => {
          if (!valueChoice) return null;
          return {
            name: valueChoice.name,
            value: valueChoice.value
          };
        }
      )
    : [];

  const selectMetric = (metric: keyof LogItem) => {
    setFilterType(metric);
  };
  const selectFilterValue = (filterValue: string[] | number[] | boolean[]) => {
    if (filterValue) {
      dispatch(
        addFilter({
          display_name:
            filterOptions[filterType as keyof LogItem]?.display_name ??
            "failed",
          metric: filterType!,
          operator:
            (filterOptions[filterType as keyof LogItem]?.operator_choices?.[0]?.value as string) ?? "contains",
          value: filterValue,
          id: Math.random().toString(36).substring(2, 15),
        })
      );
    }
  };
  const handleDropdownOpen = (open) => {
    setStart(open);
    setFilterType(undefined);
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
    <SelectInputMenu
      trigger={trigger}
      open={start}
      setOpen={handleDropdownOpen}
      onChange={selectFilterValue}
      align="start"
      items={filterType ? secondStepItems : firstStepItems}
      multiple={filterType ? true : false}
    />
  );
}
