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
  select: {
    changeField: ({ register, values, choices, onChange }) => {
      let value = values?.[0];
      let displayName:string;
      if (value === "true" || "false") value = value === "true" ? true : false;
      if (values?.length > 1) {
        displayName = values.length + " items";
      } else {
        displayName = choices?.find((choice) => choice?.value === value)?.name || "selected value";
      }
      return (
        <SelectInputMenu
          // placeholder="Error"
          align="end"
          trigger={<Button variant="small" text={displayName} />}
          {...register("value")}
          value={values}
          icon={Down}
          padding="py-xxxs px-xxs"
          gap="gap-xxs"
          items={choices}
          onChange={onChange}
          multiple={true}
        />
      );
    },
  },
  text: {
    changeField: ({ register, values, choices }) => {
      return (
        <TextInputSmall
          headLess
          disabled
          {...register("value")}
          defaultValue={values?.[0] as string}
          padding="py-xxxs px-xxs"
          gap="gap-xxs"
          width="w-[100px]"
          choices={choices}
        />
      );
    },
  },
  number: {
    changeField: ({ register, values, choices }) => {
      return (
        <TextInputSmall
          headLess
          disabled
          {...register("value")}
          defaultValue={values?.[0] as string}
          padding="py-xxxs px-xxs"
          gap="gap-xxs"
          width="w-[100px]"
          choices={choices}
        />
      );
    },
  },
  datetime: {
    changeField: ({ register, values, choices }) => {
      return (
        <TextInputSmall
          type="datetime"
          bgColor="bg-error"
          defaultValue={values?.[0] as string}
        />
      );
    },
  },

};

export const RequstFilter = ({ filter }: { filter: FilterObject }) => {
  const dispatch = useTypedDispatch();
  const { register } = useForm();
  const filterOptions = useTypedSelector(
    (state) => state.requestLogs.filterOptions
  );
  const filterOption = filterOptions[filter.metric!];
  const RequestFilter = RequestFilters[filter.value_field_type ?? "select"];

  return (
    <form className="flex flex-row items-center gap-[2px]">
      <Button
        type="button"
        disabled
        variant="small"
        text={filter.display_name}
      />
      <SelectInputSmall
        headLess
        align="end"
        // value={currentTimeRange}
        icon={Down}
        defaultValue={filterOption?.operator_choices?.[0]?.value}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={filterOption?.operator_choices}
        onChange={(e) => {
        dispatch(
            updateFilter({
              ...filter,
              operator: e.currentTarget.value,
            })
          );
        }}
      />
      {RequestFilter?.changeField({
        register,
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
