import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Down } from "src/components";
import { SelectInput } from "src/components/Inputs";
import { RequestFilter, FilterType } from "src/types";

export const RequestFilters: RequestFilter = {
  failed: {
    metricSelection: (register) => (
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
    operationSelection: (register) => (
      <SelectInput
        headLess
        placeholder="is"
        align="end"
        {...register("operator")}
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[
          { name: "is", value: "" },
          { name: "is not", value: "!" },
        ]}
        onChange={() => setEditing(true)}
      />
    ), // <SelectInput {...params} />
    changeField: (register) => (
      <SelectInput
        headLess
        placeholder="Error"
        align="end"
        {...register("value")}
        defaultValue="false"
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[
          { name: "Error", value: "true" }, // Yep, "truly" failed
          { name: "Success", value: "false" },
        ]}
        onChange={() => setEditing(true)}
      />
    ), // <AnyInputElement {...params} />
  },

  apiKey: {
    metricSelection: (register) => (
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
    ),
    // operationSelection: (register) => (),
    // changeField: (register) => (),
  },
};

export const Filters = ({ metric: FilterType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editing, setEditing] = useState(false);

  return <div></div>;
};
