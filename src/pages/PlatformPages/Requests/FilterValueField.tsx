import React, { useEffect, useState } from "react";
import { SelectInputMenu, SelectCheckBoxMenu } from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState, RawFilterOption, LogItem, Choice, FilterParam } from "src/types";
import { getRequestLogs, addFilter } from "src/store/actions";
import { RequestFilters } from "./RequestFilter";
import { useForm } from "react-hook-form";
import { FilterFileType, FilterObject } from "src/types";
import { TextInputSmall } from "src/components/Inputs";

type FilterComponents = {
  [key in FilterFileType]: React.ReactNode;
};

export const TimeFilter = ({ filterOption }: { filterOption: RawFilterOption }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useTypedDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: data.time,
        operator: "gte",
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-row items-center">
      <TextInputSmall {...register("time")} type="datetime-local" />
      <Button variant="small" text="Apply"/>
    </form>
  );
};

export const TextFilter = ({ filterOption }: { filterOption: RawFilterOption }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useTypedDispatch();
  const onSubmit = (data: any) => {
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: data.text,
        operator: "icontains",
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-row items-center">
      <TextInputSmall placeholder={`Put in your ${filterOption.metric}`} {...register("text")} />
      <Button variant="small" text="Apply"/>
    </form>
  );
}

export const NumberFilter = ({ filterOption }: { filterOption: RawFilterOption }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useTypedDispatch();
  const onSubmit = (data: any) => {
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: data.number,
        operator: "gte",
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-row items-center">
      <TextInputSmall placeholder={`Put in your ${filterOption.metric}`} type="number" step="0.0000001" {...register("number")} />
      <Button variant="small" text="Apply"/>
    </form>
  );
}
