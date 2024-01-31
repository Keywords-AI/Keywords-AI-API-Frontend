import React, { useEffect } from "react";
import {
  RequestFilter as RequestFilterType,
  FilterObject,
  RequestFilters as RequestFiltersType,
  FilterFieldType,
  RawFilterOption,
} from "src/types";
import { SelectInputSmall, SelectInputMenu } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DotsButton } from "src/components/Buttons";
import { deleteFilter, setCurrentFilter, updateFilter } from "src/store/actions";
import { Close } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { InputFieldUpdateFilter } from "./FilterValueField";

type RequestFilterValueFieldType = {
  [key in FilterFieldType]: (
    filterToUpdate: FilterObject,
    filterOption: RawFilterOption,
    onChange: (values: (string | number | boolean)[]) => void
  ) => React.ReactNode;
};

const RequestFilterValueFields: RequestFilterValueFieldType = {
  text: (filterToUpdate, filterOption, onChange) => {
    return <InputFieldUpdateFilter filter={filterToUpdate} />;
  },
  number: (filterToUpdate, filterOption, onChange) => {
    return <InputFieldUpdateFilter filter={filterToUpdate} />;
  },
  "datetime-local": (filterToUpdate, filterOption, onChange) => {
    return <InputFieldUpdateFilter filter={filterToUpdate} />;
  },
  selection: (filterToUpdate, filterOption) => {
    const [open, setOpen] = React.useState<boolean|undefined>(false);
    const dispatch = useTypedDispatch();
    const currentFilter = useTypedSelector(
      (state) => state.requestLogs.currentFilter
    );
    const handleOpen = (opening: boolean | undefined) => {
      if (currentFilter?.value && currentFilter?.value.length > 0 && !opening) { // Close the dropdown if the filter has a value
        dispatch(
          updateFilter({
            ...filterToUpdate,
            value: currentFilter.value,
          })
        );
      }
      setOpen(opening);
    }
    return (
      <SelectInputMenu
        trigger={<Button variant="small" text={filterToUpdate.display_name} />}
        open={open}
        setOpen={handleOpen}
        onChange={(values) => {
          dispatch(setCurrentFilter({ ...currentFilter, value: values }));
        }}
        value={filterToUpdate.value as string[]}
        align="start"
        items={filterOption?.value_choices || []}
        multiple={true}
      />
    );
  },
};

export const RequstFilter = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const [operator, setOperator] = React.useState(filter.operator);
  const filterOptions = useTypedSelector(
    (state) => state.requestLogs.filterOptions
  );
  const filterOption = filterOptions[filter.metric || "failed"];
  const RequstFilterValueField =
    RequestFilterValueFields[filterOption?.value_field_type || "selection"];

  return (
    <div className="flex flex-row items-center gap-[2px]">
      <Button
        type="button"
        disabled
        variant="small-select"
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
        dispatch(
          updateFilter({
            ...filter,
            value: values,
          })
        );
      })}
      {
        <DotsButton
          icon={Close}
          onClick={() => dispatch(deleteFilter(filter.id))}
        />
      }
    </div>
  );
};
