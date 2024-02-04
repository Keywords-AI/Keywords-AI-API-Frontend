import React, { useEffect, useState } from "react";
import {
  SelectInputMenu,
  SelectCheckBoxMenu,
  TextInput,
} from "src/components/Inputs";
import { Button, DotsButton } from "src/components/Buttons";
import { Add, AlphanumericKey, Filter } from "src/components/Icons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import {
  RootState,
  RawFilterOption,
  LogItem,
  Choice,
  Operator,
} from "src/types";
import { addFilter } from "src/store/actions";
import { InputFieldFilter } from "./FilterValueField";
import { setFilterType, setCurrentFilter } from "src/store/actions";
import { Modal } from "src/components/Dialogs";
import { set, useForm } from "react-hook-form";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeysContext, useHotkeys } from "react-hotkeys-hook";

export function FilterActions({ type }: { type: string }) {
  const [start, setStart] = useState<boolean | undefined>(false);
  const dispatch = useTypedDispatch();
  const filterOptions = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOptions
  );
  const filterType = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter?.metric
  );
  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const { enableScope, disableScope } = useHotkeysContext();
  useHotkeys(
    "f",
    () => {
      setStart((prev) => !prev);
    },
    {
      scopes: "dashboard",
    }
  );
  const changeFieldType =
    filterOptions?.[filterType ?? "failed"]?.value_field_type ?? "selection";
  const firstStepItems = Object.keys(filterOptions).map(
    (key, index): Choice | undefined => {
      return {
        name: filterOptions[key].display_name,
        value: key,
        onClick: () => {
          selectMetric(key as keyof LogItem);
        },
      };
    }
  );
  const secondStepItems = filterType
    ? filterOptions[filterType]?.value_choices?.map(
        (valueChoice, index): Choice => {
          if (!valueChoice) return null;
          return {
            name: valueChoice.name,
            value: valueChoice.value,
          };
        }
      )
    : [];

  const selectMetric = (metric: keyof LogItem) => {
    dispatch(setFilterType(metric));
    dispatch(
      setCurrentFilter({
        metric,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
  };

  const selectFilterValue = (filterValue: string[] | number[] | boolean[]) => {
    if (filterValue) {
      dispatch(setCurrentFilter({ ...currentFilter, value: filterValue }));
    }
  };
  useEffect(() => {
    enableScope("dashboard");
    return () => {
      disableScope("dashboard");
    };
  }, []);
  const handleDropdownOpen = (open) => {
    open ? disableScope("dashboard") : enableScope("dashboard");
    setStart(open);
    if (currentFilter?.metric && currentFilter.value) {
      dispatch(
        addFilter({
          display_name:
            filterOptions[currentFilter.metric]?.display_name ?? "failed",
          metric: filterType!,
          operator:
            (filterOptions[currentFilter.metric]?.operator_choices?.[0]
              ?.value as string) ?? "contains",
          value: currentFilter.value,
          id: currentFilter.id,
          value_field_type:
            filterOptions[currentFilter.metric]?.value_field_type ??
            "selection",
        })
      );
    }
    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
  };

  let trigger: React.ReactNode;
  switch (type) {
    case "create":
      trigger = <Button variant="small" icon={Add} text="Create" />;
      break;
    case "add":
      trigger = (
        <DotsButton icon={Add} onClick={() => handleDropdownOpen(!start)} />
      );
      break;
    default:
      trigger = (
        <div>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            content={
              <>
                <p className="caption text-gray-4">Show filter options</p>
                <AlphanumericKey value={"F"} />
              </>
            }
          >
            <Button variant="small-dashed" icon={Filter} text="Filter" />
          </Tooltip>
        </div>
      );
      break;
  }
  return (
    <>
      {!filterType || (filterType && changeFieldType === "selection") ? (
        <SelectInputMenu
          trigger={trigger}
          open={start}
          setOpen={handleDropdownOpen}
          onChange={selectFilterValue}
          align="start"
          items={filterType ? secondStepItems || [] : firstStepItems}
          multiple={filterType ? true : false}
        />
      ) : (
        <>
          <InputModal
            filterOption={filterOptions[filterType]}
            defaultOperator={
              filterOptions[filterType]?.operator_choices?.[0]
                ?.value as Operator
            }
          />
          {/* <InputFieldFilter
            filterOption={filterOptions[filterType]!}
            defaultOperator={
              filterOptions[filterType]?.operator_choices?.[0]
                ?.value as Operator
            }
          /> */}
        </>
      )}
    </>
  );
}

const InputModal = ({ filterOption, defaultOperator }) => {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(true);
  const dispatch = useTypedDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      addFilter({
        metric: filterOption.metric,
        value: [data.filterValue],
        operator: defaultOperator,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
    dispatch(setCurrentFilter({ metric: undefined, id: "" }));
    setOpen(false);
  };
  return (
    <Modal
      title={`Filter by ${filterOption.display_name}`}
      open={open}
      setOpen={setOpen}
      width="w-[600px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col items-center gap-md self-stretch"
      >
        <TextInput
          placeholder={`Enter ${filterOption.display_name.toLowerCase()} to search`}
          {...register("filterValue")}
          type={filterOption.value_field_type}
        />
        <div className="flex-col items-end justify-center gap-[10px] self-stretch ">
          <div className="flex justify-end items-center gap-xs">
            <Button
              variant="r4-black"
              text="Cancel"
              onClick={() => {
                reset();
                setOpen(false);
                dispatch(
                  dispatch(setCurrentFilter({ metric: undefined, id: "" }))
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
