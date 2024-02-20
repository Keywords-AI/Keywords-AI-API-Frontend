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
import { Button, DotsButton } from "src/components/Buttons";
import {
  deleteDashboardFilter,
  setCurrentFilter,
  updateDashboardFilter,
} from "src/store/actions";
import { DashboardInputFieldUpdateFilter } from "./DashboardFilterValueField";

type DashboardFilterValueFieldType = {
  [key in FilterFieldType]: (
    filterToUpdate: FilterObject,
    filterOption: RawFilterOption,
    onChange: (values: (string | number | boolean)[]) => void
  ) => React.ReactNode;
};

const DashboardFilterValueFields: DashboardFilterValueFieldType = {
  text: (filterToUpdate, filterOption, onChange) => {
    return <DashboardInputFieldUpdateFilter filter={filterToUpdate} />;
  },
  number: (filterToUpdate, filterOption, onChange) => {
    return <DashboardInputFieldUpdateFilter filter={filterToUpdate} />;
  },
  "datetime-local": (filterToUpdate, filterOption, onChange) => {
    return <DashboardInputFieldUpdateFilter filter={filterToUpdate} />;
  },
  selection: (filterToUpdate, filterOption, onChange) => {
    const [open, setOpen] = React.useState<boolean | undefined>(false);
    const dispatch = useTypedDispatch();
    const handleOpen = (opening: boolean | undefined) => {
      if (opening) {
        dispatch(setCurrentFilter(filterToUpdate));
      }
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
        items={filterOption?.value_choices || []}
        multiple={true}
      />
    );
  },
};

export const DashboardFilterItem = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const [operator, setOperator] = React.useState(filter.operator);
  const filterOptions = useTypedSelector(
    (state) => state.dashboard.filterOptions
  );
  const filterOption = filterOptions[filter.metric || "failed"];
  const DashboardFilterValueField =
    DashboardFilterValueFields[filterOption?.value_field_type || "selection"];

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
            updateDashboardFilter({
              ...filter,
              operator: e.currentTarget.value,
            })
          );
        }}
      />
      {DashboardFilterValueField(filter, filterOption!, (values) => {
        dispatch(
          updateDashboardFilter({
            ...filter,
            value: values,
          })
        );
      })}
      {
        <DotsButton
          icon={Close}
          borderRadius="rounded-r-sm"
          bgColor="bg-gray-2"
          hoverColor="bg-gray-3"
          onClick={() => dispatch(deleteDashboardFilter(filter.id))}
        />
      }
    </div>
  );
};
