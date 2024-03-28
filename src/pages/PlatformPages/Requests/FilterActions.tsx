import React, { useEffect, useState } from "react";
import {
  SelectInputMenu,
  SelectCheckBoxMenu,
  TextInput,
  SelectInput,
} from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, AlphanumericKey, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  RootState,
  RawFilterOption,
  LogItem,
  Choice,
  Operator,
} from "src/types";
import { addFilter, deleteFilter, updateFilter } from "src/store/actions";
import { InputFieldFilter } from "./FilterValueField";
import { setFilterType, setCurrentFilter } from "src/store/actions";
import { Modal } from "src/components/Dialogs";
import { set, useForm } from "react-hook-form";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeysContext, useHotkeys } from "react-hotkeys-hook";
import store from "src/store/store";
import { combineSlices } from "@reduxjs/toolkit";
import { Value } from "@radix-ui/react-select";
export function FilterActions({
  type,
  start,
  setStart,
  hidden,
}: {
  type: string;
  start: boolean;
  setStart: (prev: any) => void;
  hidden?: boolean;
}) {
  // const isLoading = useTypedSelector((state) => state.requestLogs.loading);
  // if (isLoading) return <></>;

  const dispatch = useTypedDispatch();
  const filterOptions = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOptions
  );

  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const filterType = currentFilter.metric;
  const filterLength = useTypedSelector(
    (state) => state.requestLogs.filters.length
  );
  // const filters = useTypedSelector(
  //   (state: RootState) => state.requestLogs.filters
  // );

  const { enableScope, disableScope } = useHotkeysContext();

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
    ? filterOptions[filterType]?.value_choices
        ?.map((valueChoice, index): Choice => {
          if (!valueChoice) return null;
          return {
            name: valueChoice.name,
            value: valueChoice.value,
          };
        })
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
    : [];
  const loading = useTypedSelector((state) => state.requestLogs.loading);
  const selectMetric = (metric: keyof LogItem) => {
    dispatch(
      setCurrentFilter({
        metric,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };

  const selectFilterValue = (filterValue: string[] | number[]) => {
    if (filterValue) {
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        dispatch(
          setCurrentFilter({
            ...store.getState().requestLogs.currentFilter,
            value: filterValue,
          })
        );
        const latestFilter = store.getState().requestLogs.currentFilter;
        if (!latestFilter || !latestFilter.metric || !latestFilter.value)
          return;
        const filters = store.getState().requestLogs.filters;
        const sameTypeFilter = filters.find(
          (filter) => filter.metric === latestFilter.metric
        );
        const filterOptions = store.getState().requestLogs.filterOptions;
        if (sameTypeFilter) {
          dispatch(
            updateFilter({
              display_name:
                filterOptions[latestFilter.metric]?.display_name ?? "failed",
              metric: latestFilter.metric!,
              operator:
                (filterOptions[latestFilter.metric]?.operator_choices?.[0]
                  ?.value as string) ?? "contains",
              value: Array.from(
                new Set([...sameTypeFilter.value, ...filterValue])
              ),
              id: sameTypeFilter.id,
              value_field_type:
                filterOptions[latestFilter.metric]?.value_field_type ??
                "selection",
            })
          );
        } else {
          dispatch(
            addFilter({
              display_name:
                filterOptions[latestFilter.metric]?.display_name ?? "failed",
              metric: latestFilter.metric,
              operator:
                (filterOptions[latestFilter.metric]?.operator_choices?.[0]
                  ?.value as string) ?? "contains",
              value: latestFilter.value,
              id: latestFilter.id,
              value_field_type:
                filterOptions[latestFilter.metric]?.value_field_type ??
                "selection",
            })
          );
        }
      } else {
        const latestFilter = store.getState().requestLogs.currentFilter;
        dispatch(setCurrentFilter({ metric: undefined, id: "" }));
        dispatch(deleteFilter(latestFilter.id));
      }
    }
  };

  const handleDropdownOpen = (open) => {
    // open ? disableScope("dashboard") : enableScope("dashboard");
    // if (!open) dispatch(setCurrentFilter({ metric: undefined, id: "" }));
    setStart(open);

    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
  };

  let trigger: React.ReactNode = (
    <div>
      <Tooltip
        side="bottom"
        sideOffset={4}
        align="center"
        content={
          <>
            <p className="caption text-gray-4">Show filter options</p>
            <AlphanumericKey value={"F"} />
          </>
        }
      >
        <div>
          <Button
            variant="small-dashed"
            icon={Filter}
            text="Filter"
            disabled={loading}
            active={start}
            onClick={() => {
              if (loading) return;
              handleDropdownOpen(!start);
            }}
          />
        </div>
      </Tooltip>
    </div>
  );
  switch (type) {
    case "create":
      trigger = <Button variant="small" icon={Add} text="Create" />;
      break;
    case "add":
      trigger = (
        <DotsButton
          icon={Add}
          className={filterLength == 0 ? "hidden" : ""}
          onClick={() => {
            if (loading) return;
            handleDropdownOpen(!start);
          }}
        />
      );
      break;
  }
  if (hidden) trigger = <div></div>;
  return (
    <>
      {!filterType || (filterType && changeFieldType === "selection") ? (
        <SelectInputMenu
          anchor={type == "Filter" ? <div></div> : undefined}
          trigger={trigger}
          open={start}
          setOpen={handleDropdownOpen}
          onChange={selectFilterValue}
          align="start"
          items={filterType ? secondStepItems || [] : firstStepItems}
          multiple={filterType ? true : false}
        />
      ) : (
        <>
          <InputModal
            filterOption={filterOptions[filterType]}
            defaultOperator={
              filterOptions[filterType]?.operator_choices?.[0]
                ?.value as Operator
            }
          />
        </>
      )}
    </>
  );
}

export const InputModal = ({ filterOption, defaultOperator }) => {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(true);
  const dispatch = useTypedDispatch();
  const onSubmit = (data) => {
    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
    if (filterOption.metric === "timestamp") {
      if (!data.filterValue) {
        data.filterValue = new Date().toISOString().slice(0, -8);
      }
    }
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: [data.filterValue],
        operator: operator.value,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );

    setOpen(false);
  };
  const [operator, setOperator] = useState(filterOption?.operator_choices?.[0]);
  return (
    <Modal
      title={`Filter by ${
        filterOption.display_name.charAt(0).toLowerCase() +
        filterOption.display_name.slice(1)
      }`}
      open={open}
      setOpen={(prev) => {
        if (prev === false) {
          dispatch(setCurrentFilter({ metric: undefined, id: "" }));
        }
        setOpen(prev);
      }}
      width="w-[600px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col items-center gap-md self-stretch"
      >
        <div className="flex gap-xs self-stretch">
          <SelectInput
            headLess
            trigger={() => (
              <Button
                variant="r4-gray-2"
                text={operator.name}
                className="outline-none w-[150px]"
              />
            )}
            align="start"
            choices={filterOption.operator_choices}
            onChange={(e) => {
              const value = e.target.value;
              setOperator(
                filterOption.operator_choices.find((e) => e.value === value)
              );
            }}
            // multiple={true}
          />
          <TextInput
            placeholder={`Enter ${filterOption.display_name.toLowerCase()} to search`}
            width="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(onSubmit)();
                e.stopPropagation();
              }
            }}
            {...register("filterValue")}
            type={filterOption.value_field_type}
          />
        </div>
        <div className="flex-col items-end justify-center gap-[10px] self-stretch ">
          <div className="flex justify-end items-center gap-xs">
            <Button
              variant="r4-gray-2"
              text="Cancel"
              onClick={() => {
                reset();
                setOpen(false);
                dispatch(setCurrentFilter({ metric: undefined, id: "" }));
              }}
            />
            <Button variant="r4-primary" text="Apply" type="submit" />
          </div>
        </div>
      </form>
    </Modal>
  );
};
