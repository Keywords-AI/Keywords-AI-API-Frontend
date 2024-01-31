import React, { useEffect, useState } from "react";
import { SelectInputMenu, SelectCheckBoxMenu } from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  RootState,
  RawFilterOption,
  Operator
} from "src/types";
import {
  getRequestLogs,
  addFilter,
  setFilterType,
} from "src/store/actions";
import { set, useForm } from "react-hook-form";
import { TextInputSmall } from "src/components/Inputs";

export const InputFieldFilter = ({
  filterOption,
  defaultOperator,
}: {
  filterOption: RawFilterOption;
  defaultOperator: Operator;
}) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useTypedDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: data.value,
        operator: defaultOperator,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
    dispatch(setFilterType(undefined));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-row items-center">
      <TextInputSmall {...register("value")} type={filterOption.value_field_type} />
      <Button variant="small" text="Apply" />
      <Button
        variant="small"
        text="Cancel"
        onClick={() => dispatch(setFilterType(undefined))}
      />
    </form>
  );
};