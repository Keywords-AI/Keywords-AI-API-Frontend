import React from "react";
import { useForm } from "react-hook-form";
import { SelectInput } from "src/components/Inputs";
import { RequestFilter, FilterType } from "src/types";

export const RequestFilters: RequestFilter = {
  failed: {
    metricSelection : (register)=> (
        <SelectInput
          headLess
          defaultValue={"failed"}
          {...register("metric")}
          align="end"
          // value={currentTimeRange}
          icon={Down}
          padding="py-xxxs px-xxs"
          gap="gap-xxs"
          choices={[{ name: "Status", value: "failed" }]}
          // handleSelected={handleTimePeriodSelection}
          onChange={() => setEditing(true)}
        />
    ), // <SelectInput {...params} />
    operationSelection: <SelectInput />, // <SelectInput {...params} />
    changeField: <SelectInput />, // <AnyInputElement {...params} />
  },
};

export const Filters = ({ metric: FilterType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return <div></div>;
};
