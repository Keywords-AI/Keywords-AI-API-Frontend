import React, { useEffect } from "react";
import {
  RequestFilter as RequestFilterType,
  FilterObject,
  RequestFilters as RequestFiltersType,
} from "src/types";
import { Down } from "src/components/Icons";
import {
  SelectInput,
  TextInputSmall,
  SelectInputSmall,
  SelectInputMenu,
} from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DotsButton } from "src/components/Buttons";
import { deleteFilter, updateFilter } from "src/store/actions";
import { Close } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";

export const RequestFilters: RequestFiltersType = {
  selection: {
    changeField: ({ values, choices, onChange }) => {
      let value = values?.[0];
      let displayName: string;
      if (value === "true" || "false") value = value === "true" ? true : false;
      if (values?.length > 1) {
        displayName = values.length + " items";
      } else {
        displayName =
          choices?.find((choice) => choice?.value === value)?.name ||
          "selected value";
      }
      return (
        <SelectInputMenu
          // placeholder="Error"
          align="end"
          trigger={<Button variant="small-select" text={displayName} />}
          value={values as string[]}
          items={choices}
          onChange={onChange}
          multiple={true}
        />
      );
    },
  },
  text: {
    changeField: ({ values, choices }) => {
      return (
        <TextInputSmall
          disabled
          defaultValue={values?.[0] as string}
          padding="py-xxxs px-xxs"
          width="w-[100px]"
        />
      );
    },
  },
  number: {
    changeField: ({ values, choices }) => {
      return (
        <TextInputSmall
          disabled
          defaultValue={values?.[0] as string}
          padding="py-xxxs px-xxs"
          width="w-[100px]"
        />
      );
    },
  },
  "datetime-local": {
    changeField: ({ values, choices }) => {
      return (
        <TextInputSmall
          type="datetime-local"
          defaultValue={values?.[0] as string}
        />
      );
    },
  },
};

export const RequstFilter = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const [operator, setOperator] = React.useState(filter.operator);
  const filterOptions = useTypedSelector(
    (state) => state.requestLogs.filterOptions
  );

  const filterOption = filterOptions[filter.metric!];
  const RequestFilter = RequestFilters[filter.value_field_type ?? "select"];
  console.log(RequestFilter);
  return (
    <form className="flex flex-row items-center gap-[2px]">
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
      {RequestFilter?.changeField({
        values: filter.value,
        choices: filterOption?.value_choices,
        onChange: (filterValues) => {
          let values: Array<string | boolean | number> = [];
          for (var value of filterValues) {
            if (value === "true" || value === "false") {
              value = value === "true" ? true : false;
            }
            values.push(value);
          }
          dispatch(
            updateFilter({
              ...filter,
              value: values,
            })
          );
        },
      })}
      {
        <DotsButton
          icon={Close}
          onClick={() => dispatch(deleteFilter(filter.id))}
        />
      }
    </form>
  );
};
