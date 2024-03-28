import { Button, DotsButton } from "src/components/Buttons";
import { useEffect, useState } from "react";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { FilterObject, RawFilterOption, Operator } from "src/types";

import { useForm } from "react-hook-form";
import { SelectInput, TextInput, TextInputSmall } from "src/components/Inputs";
import { Modal } from "src/components/Dialogs";
import { useLocation } from "react-router-dom";
import {
  addDashboardFilter,
  setDashboardCurrentFilter,
  setDashboardFilterType,
  updateDashboardFilter,
} from "src/store/actions";
import { combineSlices } from "@reduxjs/toolkit";

export const DashboardInputFieldFilter = ({
  filterOption,
  defaultOperator,
  defaultValue,
}: {
  filterOption: RawFilterOption;
  defaultOperator: Operator;
  defaultValue?: string | number | boolean;
}) => {
  const { register, watch } = useForm();
  const dispatch = useTypedDispatch();
  const data = watch("value");
  const onSubmit = () => {
    dispatch(
      addDashboardFilter({
        metric: filterOption.metric,
        value: [data],
        operator: defaultOperator,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
    dispatch(setDashboardCurrentFilter({ metric: undefined, id: "" }));
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="flex-row items-center">
      <TextInputSmall
        placeholder={`Enter ${filterOption.display_name.toLowerCase()} to search`}
        {...register("value")}
        onKeyDown={onKeyDown}
        padding="py-xxxs px-xxs"
        type={filterOption.value_field_type}
        defaultValue={defaultValue as string}
        step={
          filterOption.value_field_type === "number" ? "0.00001" : undefined
        }
      />
      <Button variant="small" text="Apply" onClick={onSubmit} />
      <Button
        variant="small"
        text="Cancel"
        type="button"
        onClick={() =>
          dispatch(setDashboardCurrentFilter({ metric: undefined, id: "" }))
        }
      />
    </div>
  );
};

export const DashboardInputFieldUpdateFilter = ({
  filter,
}: {
  filter: FilterObject;
}) => {
  const { register } = useForm();
  const dispatch = useTypedDispatch();
  const [value, setValue] = useState(filter.value[0]);
  const [changed, setChanged] = useState(false);
  const onSubmit = () => {
    dispatch(
      updateDashboardFilter({
        ...filter,
        value: [value as string],
      })
    );
    dispatch(setDashboardFilterType(undefined));
  };
  useEffect(() => {
    if (filter.value[0] !== value) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [value]);
  //   {
  //     "id": "y6heh259ijf",
  //     "metric": "prompt_messages",
  //     "value_field_type": "text",
  //     "operator": "icontains",
  //     "value": [
  //         "haha"
  //     ],
  //     "display_name": "Prompt"
  // }
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex-row items-center">
      <InputModal
        filterOption={filter}
        defaultOperator={filter.operator as Operator}
        open={showModal}
        setOpen={setShowModal}
        trigger={
          <Button variant="small-select" text={`"${value as string}"`} />
        }
      />
    </div>
  );
};

const InputModal = ({
  filterOption,
  defaultOperator,
  trigger,
  open,
  setOpen,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useTypedDispatch();
  const onSubmit = (data) => {
    dispatch(setDashboardCurrentFilter({ metric: undefined, id: "" }));
    if (filterOption.metric === "timestamp") {
      if (!data.filterValue) {
        data.filterValue = new Date().toISOString().slice(0, -8);
      }
    }
    dispatch(
      updateDashboardFilter({
        metric: filterOption.metric,
        value: [data.filterValue],
        operator: filterOption.operator,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: filterOption.id,
      })
    );
    setOpen(false);
  };
  const location = useLocation();
  useEffect(() => {
    dispatch(setDashboardCurrentFilter({ metric: undefined, id: "" }));
  }, [location]);
  return (
    <Modal
      trigger={trigger}
      title={`Filter by ${filterOption.display_name}`}
      open={open}
      setOpen={(prev) => {
        if (prev === false) {
          dispatch(setDashboardCurrentFilter({ metric: undefined, id: "" }));
        }
        setOpen(prev);
      }}
      width="w-[600px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col items-center gap-md self-stretch"
      >
        {/*
          <SelectInput
            headLess
            trigger={() => (
              <Button
                variant="r4-gray-2"
                text={operator.name}
                className="outline-none"
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
          /> */}

        <TextInput
          placeholder={`Enter ${filterOption.display_name.toLowerCase()} to search`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit)();
              e.stopPropagation();
            }
          }}
          {...register("filterValue")}
          type={filterOption.value_field_type}
          step={
            filterOption.value_field_type === "number" ? "0.00001" : undefined
          }
        />
        <div className="flex-col items-end justify-center gap-[10px] self-stretch ">
          <div className="flex justify-end items-center gap-xs">
            <Button
              variant="r4-gray-2"
              text="Cancel"
              onClick={() => {
                reset();
                setOpen(false);
                dispatch(
                  setDashboardCurrentFilter({ metric: undefined, id: "" })
                );
              }}
            />
            <Button variant="r4-primary" text="Apply" type="submit" />
          </div>
        </div>
      </form>
    </Modal>
  );
};
