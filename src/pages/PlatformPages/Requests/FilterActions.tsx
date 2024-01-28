import React, { useEffect, useState } from "react";
import { DropDownMenu } from "src/components";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState, RawFilterOption, LogItem } from "src/types";
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
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const prompt = data.prompt;
    selectFilterValue(prompt);
  };
  const Items = () => {
    return (
      <React.Fragment>
        {Object.keys(filterOptions).map((key, index) => {
          return (
            <Button
              key={index}
              variant="panel"
              text={filterOptions[key].display_name}
              onClick={() => selectMetric(key as keyof LogItem)}
            />
          );
        })}
      </React.Fragment>
    );
  };

  const ItemsSecond = () => {
    return (
      <React.Fragment>
        {filterType &&
          (filterOptions[filterType] as RawFilterOption).value_field_type ===
            "text" && (
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <TextInput {...register("prompt")} placeholder="Prompt message keywords..." />
            </form>
          )}
        {filterType &&
          (filterOptions[filterType] as RawFilterOption).value_choices.map(
            (valueChoice, index) => (
              <Button
                key={index}
                variant="panel"
                text={valueChoice.name}
                onClick={() => selectFilterValue(valueChoice.value)}
              />
            )
          )}
      </React.Fragment>
    );
  };
  const selectMetric = (metric: keyof LogItem) => {
    setFilterType(metric);
  };
  const selectFilterValue = (filterValue: any) => {
    dispatch(
      addFilter({
        display_name:
          filterOptions[filterType as keyof LogItem]?.display_name ?? "failed",
        metric: filterType!,
        operator: filterOptions[filterType as keyof LogItem]?.operator_choices[0].value as string ?? "contains",
        value: filterValue,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
    setFilterType(undefined);
    setStart(false);
  };
  const handleDropdownOpen = (open) => {
    console.log("opening dropdown",open);
    setStart(open);
    setFilterType(undefined);
  };
    let trigger: React.ReactNode;
  switch (type) {
    case "create":
      trigger = (
        <Button
          variant="small"
          icon={Add}
          text="Create"
        />
      );
      break;
    case "add":
      trigger = (
        <DotsButton
          icon={Add}
          onClick={() => handleDropdownOpen(!start)}
        />
      );
      break;
    default:
      trigger = (
        <Button
          variant="small"
          icon={Filter}
          text="Filter"
        />
      );
      break;
  }

  return (
    <DropDownMenu
      open={start}
      setOpen={handleDropdownOpen}
      trigger={trigger}
      align="start"
      items={filterType ? <ItemsSecond /> : <Items />}
    />
  );
}
