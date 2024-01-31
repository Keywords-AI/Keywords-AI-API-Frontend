import { Button, DotsButton } from "src/components/Buttons";
import { useEffect, useState } from "react";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { FilterObject, RawFilterOption, Operator } from "src/types";
import {
  getRequestLogs,
  addFilter,
  setFilterType,
  updateFilter,
} from "src/store/actions";
import { useForm } from "react-hook-form";
import { TextInputSmall } from "src/components/Inputs";

export const InputFieldFilter = ({
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
      addFilter({
        metric: filterOption.metric,
        value: [data],
        operator: defaultOperator,
        value_field_type: filterOption.value_field_type,
        display_name: filterOption.display_name,
        id: Math.random().toString(36).substring(2, 15),
      })
    );
    dispatch(setFilterType(undefined));
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
      />
      <Button variant="small" text="Apply" onClick={onSubmit} />
      <Button
        variant="small"
        text="Cancel"
        type="button"
        onClick={() => dispatch(setFilterType(undefined))}
      />
    </div>
  );
};

export const InputFieldUpdateFilter = ({
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
      updateFilter({
        ...filter,
        value: [value as string],
      })
    );
    dispatch(setFilterType(undefined));
  };
  useEffect(() => {
    if (filter.value[0] !== value) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [value]);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="flex-row items-center">
      <TextInputSmall
        {...register("value", {
          onChange: (e) => {
            setValue(e.target.value);
          },
        })}
        padding="py-xxxs px-xxs"
        onKeyDown={onKeyDown}
        width="w-[120px]"
        value={value as string}
        type={filter.value_field_type}
      />
      {changed && (
        <>
          <Button variant="small" text="Apply" onClick={onSubmit} />
          <Button
            variant="small"
            text="Cancel"
            type="button"
            onClick={() => {
              setChanged(false);
              setValue(filter.value[0]);
            }}
          />
        </>
      )}
    </div>
  );
};
