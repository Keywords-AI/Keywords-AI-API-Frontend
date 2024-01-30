import React, { useEffect } from "react";
import {
  RequestFilter as RequestFilterType,
  FilterObject,
  RequestFilters as RequestFiltersType,
} from "src/types";
import { Down } from "src/components/Icons";
import { SelectInput, TextInputSmall, SelectInputSmall } from "src/components/Inputs";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DotsButton } from "src/components/Buttons";
import { deleteFilter, updateFilter } from "src/store/actions";
import { Close } from "src/components/Icons";
import { Button } from "src/components/Buttons";
import { useForm } from "react-hook-form";
import { SelectInputMenu } from "src/components/Inputs";

export const RequestFilters: RequestFiltersType = {
  select: {
    changeField: ({ register, value, choices, onChange }) => {
      return (
        <SelectInputMenu
          // placeholder="Error"
          align="end"
          {...register("value")}
          defaultValue={value as string}
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
    changeField: ({ register, value, choices }) => {
      return (
        <TextInputSmall
          headLess
          disabled
          {...register("value")}
          defaultValue={value as string}
          padding="py-xxxs px-xxs"
          gap="gap-xxs"
          width="w-[100px]"
          choices={choices}
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
  const RequestFilter = RequestFilters[filter.value_field_type!];

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
        value: filter.value,
        choices: filterOption?.value_choices,
        onChange: (e) => {
          let value = e.currentTarget.value;
          if (
            e.currentTarget.value === "true" ||
            e.currentTarget.value === "false"
          ) {
            value = value === "true" ? true : false;
          }
          dispatch(
            updateFilter({
              ...filter,
              value,
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
