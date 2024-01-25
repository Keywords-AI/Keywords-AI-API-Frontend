import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Close, Down } from "src/components";
import { SelectInput } from "src/components/Inputs";
import { RequestFilter, FilterType } from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate } from "react-router-dom";
import { getRequestLogs } from "src/store/actions";
import { DotsButton } from "src/components/Buttons";

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

  //   apiKey: {
  //     metricSelection: (register) => (
  //       <SelectInput
  //         headLess
  //         defaultValue={"failed"}
  //         {...register("metric")}
  //         align="end"
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[{ name: "API Key", value: "apiKey" }]}
  //         // handleSelected={handleTimePeriodSelection}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //     operationSelection: (register) => (
  //       <SelectInput
  //         headLess
  //         placeholder="is"
  //         align="end"
  //         {...register("operator")}
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[
  //           { name: "is", value: "" },
  //           { name: "is not", value: "!" },
  //         ]}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //     changeField: (register) => (
  //       <SelectInput
  //         headLess
  //         placeholder="Error"
  //         align="end"
  //         {...register("value")}
  //         defaultValue="false"
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[
  //           { name: "Error", value: "true" }, // Yep, "truly" failed
  //           { name: "Success", value: "false" },
  //         ]}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //   },

  //   model: {
  //     metricSelection: (register) => (
  //       <SelectInput
  //         headLess
  //         defaultValue={"failed"}
  //         {...register("metric")}
  //         align="end"
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[{ name: "Model", value: "model" }]}
  //         // handleSelected={handleTimePeriodSelection}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //     operationSelection: (register) => (
  //       <SelectInput
  //         headLess
  //         placeholder="is"
  //         align="end"
  //         {...register("operator")}
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[
  //           { name: "is", value: "" },
  //           { name: "is not", value: "!" },
  //         ]}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //     changeField: (register) => (
  //       <SelectInput
  //         headLess
  //         placeholder="Error"
  //         align="end"
  //         {...register("value")}
  //         defaultValue="false"
  //         // value={currentTimeRange}
  //         icon={Down}
  //         padding="py-xxxs px-xxs"
  //         gap="gap-xxs"
  //         choices={[
  //           { name: "Error", value: "true" }, // Yep, "truly" failed
  //           { name: "Success", value: "false" },
  //         ]}
  //         onChange={() => setEditing(true)}
  //       />
  //     ),
  //   },
};

export const Filters = ({ metric }: { metric: FilterType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  dispatch(getRequestLogs());
  const [editing, setEditing] = useState(false);
  const onSubmit = (data: any) => {
    const value = data.value === "true";
    const negation = data.operator === "!";
    const failed = negation ? !value : value;
    setQueryParams({ failed }, navigate);
    getRequestLogs();
    setEditing(false);
  };

  const currentFilter = RequestFilters[metric];
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-[2px]"
      >
        {currentFilter?.metricSelection(register)}
        {currentFilter?.operationSelection(register)}
        {currentFilter?.changeField(register)}
        {
          <DotsButton
            icon={Close}
            onClick={() => handleCloseInputSet(inputSetId)}
          />
        }
      </form>
    </div>
  );
};
