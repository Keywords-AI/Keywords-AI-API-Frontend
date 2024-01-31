import React, { useEffect } from "react";
import {
  RequestFilter as RequestFilterType,
  FilterObject,
  RequestFilters as RequestFiltersType,
  RawFilterOption,
  Operator
} from "src/types";
import { Down } from "src/components/Icons";
import {
  SelectInputSmall,
  SelectInputMenu,
} from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DotsButton } from "src/components/Buttons";
import { deleteFilter, updateFilter } from "src/store/actions";
import { Close } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { InputFieldUpdateFilter } from "./FilterValueField";


export const RequstFilter = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const [operator, setOperator] = React.useState(filter.operator);
  const filterOptions = useTypedSelector(
    (state) => state.requestLogs.filterOptions
  );
  const filterOption = filterOptions[filter.metric!];

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
      {filterOption?.value_field_type === "selection" ? (
        <SelectInputMenu
          trigger={<Button variant="small" text={filter.display_name} />}
          onChange={(values)=>{
            dispatch(
              updateFilter({
                ...filter,
                value: values,
              })
            );
          }}
          value={filter.value as string[]}
          align="start"
          items={filterOption?.value_choices || []}
          multiple={true}
        />
      ) : (
        <InputFieldUpdateFilter
          filter={filter}
        />
      )}
      {
        <DotsButton
          icon={Close}
          onClick={() => dispatch(deleteFilter(filter.id))}
        />
      }
    </div>
  );
};
