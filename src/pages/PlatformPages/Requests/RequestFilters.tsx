import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Close, Down } from "src/components";
import { SelectInput } from "src/components/Inputs";
import { RequestFilter, FilterType } from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate } from "react-router-dom";
import { getRequestLogs, setFilters } from "src/store/actions";
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
    changeField: (register, choice) => (
      <SelectInput
        headLess
        // placeholder="Error"
        align="end"
        {...register("value")}
        defaultValue={choice}
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[
          { name: "error", value: "true" }, // Yep, "truly" failed
          { name: "success", value: "false" },
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

export const Filters = ({
  metric,
  secFilter,
}: {
  metric: FilterType;
  secFilter: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [filters, setLocalFilters] = useState<
  //   { metric: any; negation: boolean; value: any; id: string }[]
  // >([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  dispatch(getRequestLogs());
  const filters = useTypedSelector((state) => state.requestLogs.filters);
  let randomId;
  const onSubmit = (data: any) => {
    const negation = data.operator === "!";
    randomId = Math.random().toString(36).substring(2, 15);
    const filterData = {
      metric: data.metric,
      negation: negation,
      value: data.value,
      id: randomId,
    };
    // setQueryParams({ failed }, navigate);
    getRequestLogs();
    // setLocalFilters([...filters, filterData]);
    dispatch(setFilters([...filters, filterData]));
    // setEditing(false);
  };
  const handleClose = (id: string) => {
    // setLocalFilters(updatedFilters); // Update local state
    dispatch(setFilters(filters.filter((filter) => filter.id !== id)));
  };
  const currentFilter = RequestFilters[metric];
  return (
    <div>
      {filters.map((filter, index) => (
        <form
          key={filter.id}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-[2px]"
        >
          {RequestFilters[filter.metric]?.metricSelection(register)}
          {RequestFilters[filter.metric]?.operationSelection(register)}
          {RequestFilters[filter.metric]?.changeField(register, secFilter)}
          {<DotsButton icon={Close} onClick={() => handleClose(filter.id)} />}
        </form>
      ))}
      {filters.length === 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-[2px]"
        >
          {currentFilter?.metricSelection(register)}
          {currentFilter?.operationSelection(register)}
          {currentFilter?.changeField(register, secFilter)}
          {<DotsButton icon={Close} onClick={() => handleClose(randomId)} />}
        </form>
      )}
    </div>
  );
};
