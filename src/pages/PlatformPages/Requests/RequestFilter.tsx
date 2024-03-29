import React, { useEffect } from "react";
import {
  RequestFilter as RequestFilterType,
  FilterObject,
  RequestFilters as RequestFiltersType,
  FilterFieldType,
  RawFilterOption,
  Operator,
} from "src/types";
import { Close, Down } from "src/components/Icons";
import { SelectInputSmall, SelectInputMenu } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DotsButton } from "src/components/Buttons";
import {
  deleteFilter,
  setCurrentFilter,
  updateFilter,
} from "src/store/actions";
import { Button } from "src/components/Buttons";
import { InputFieldUpdateFilter } from "./FilterValueField";
import { current } from "@reduxjs/toolkit";

type RequestFilterValueFieldType = {
  [key in FilterFieldType]: (
    filterToUpdate: FilterObject,
    filterOption: RawFilterOption,
    onChange: (values: (string | number | boolean)[]) => void
  ) => React.ReactNode;
};

export const RequstFilter = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const [operator, setOperator] = React.useState(filter.operator);
  const filterOptions = useTypedSelector(
    (state) => state.requestLogs.filterOptions
  );
  const RequestFilterValueFields: RequestFilterValueFieldType = {
    text: (filterToUpdate, filterOption, onChange) => {
      return <InputFieldUpdateFilter filter={filterToUpdate} />;
    },
    number: (filterToUpdate, filterOption, onChange) => {
      return <InputFieldUpdateFilter filter={filterToUpdate} />;
    },
    "datetime-local": (filterToUpdate, filterOption, onChange) => {
      return (
        <InputFieldUpdateFilter
          filter={{
            ...filterToUpdate,
            value: filterToUpdate.value.map((item) =>
              new Date(item as string).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            ),
          }}
        />
      );
    },
    selection: (filterToUpdate, filterOption, onChange) => {
      const [open, setOpen] = React.useState<boolean | undefined>(false);
      if (!filterOption || !filterOption.value_choices) {
        return null;
      }

      const dispatch = useTypedDispatch();
      const handleOpen = (opening: boolean | undefined) => {
        if (opening) {
          dispatch(setCurrentFilter(filterToUpdate));
        }
        if (!opening) dispatch(setCurrentFilter({ metric: undefined, id: "" }));
        setOpen(opening);
      };
      let displayChoice =
        filterOption.value_choices.find((choice) => {
          const choiceValue = choice?.value.toString();
          return filterToUpdate.value?.[0]?.toString() === choiceValue;
        })?.name ?? filterOption.display_name;
      if (filterToUpdate.value && filterToUpdate.value.length > 1) {
        displayChoice = `${filterToUpdate.value.length} items`;
      }
      return (
        <SelectInputMenu
          trigger={
            <Button variant="small-select" text={displayChoice as string} />
          }
          open={open}
          setOpen={handleOpen}
          onChange={onChange}
          value={filterToUpdate.value as string[]}
          align="start"
          items={
            [...filterOption?.value_choices].sort((a: any, b: any) =>
              a?.name.localeCompare(b.name)
            ) || []
          }
          multiple={true}
        />
      );
    },
  };
  const filterOption = filterOptions[filter.metric || "failed"];
  const RequstFilterValueField =
    RequestFilterValueFields[filterOption?.value_field_type || "selection"];
  const Filters = useTypedSelector((state) => state.requestLogs.filters);
  return (
    <div className="flex flex-row items-center gap-[1px]">
      <Button
        type="button"
        disabled
        variant="small-select"
        borderRadius="rounded-l-sm"
        text={filter.display_name}
      />
      <SelectInputSmall
        headLess
        align="end"
        trigger={() => (
          <Button
            variant="small-select"
            text={
              filterOption?.operator_choices?.find((choice) => {
                return choice?.value === operator;
              })?.name
            }
          />
        )}
        defaultValue={filterOption?.operator_choices?.[0]?.value}
        // value={filterOption?.operator_choices?.[0]?.value}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={filterOption?.operator_choices}
        onChange={(e) => {
          setOperator(e.currentTarget.value);
          dispatch(
            updateFilter({
              ...filter,
              operator: e.currentTarget.value,
            })
          );
        }}
      />
      {RequstFilterValueField(filter, filterOption!, (values) => {
        console.log("RequstFilterValueField");
        const currentFilter = Filters.find(
          (currFilter) => currFilter.id === filter.id
        );
        // if (values.toString() === currentFilter?.value?.toString()) return;
        if (values.length === 0) {
          dispatch(deleteFilter(filter.id));
        } else {
          console.log("updateFilter", values);
          dispatch(
            updateFilter({
              ...filter,
              value: values,
            })
          );
        }
      })}
      {
        <DotsButton
          icon={Close}
          borderRadius="rounded-r-sm"
          bgColor="bg-gray-2"
          hoverColor="bg-gray-3"
          onClick={() => dispatch(deleteFilter(filter.id))}
          className="h-[24px] w-[24px]"
        />
      }
    </div>
  );
};
