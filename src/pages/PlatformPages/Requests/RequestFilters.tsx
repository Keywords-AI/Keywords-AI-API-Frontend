import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Close, Down } from "src/components";
import { SelectInput, TextInputSmall } from "src/components/Inputs";
import { RequestFilter, FilterType } from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { RootState } from "src/types";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate } from "react-router-dom";
import {
  getRequestLogs,
  setFilters,
  setFilterOpen,
  setCurrentFilter,
} from "src/store/actions";
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
      />
    ), // <AnyInputElement {...params} />
  },

  apiKey: {
    metricSelection: (register) => (
      <SelectInput
        headLess
        defaultValue={"apiKey"}
        {...register("metric")}
        align="end"
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[{ name: "API Key", value: "apiKey" }]}
        // handleSelected={handleTimePeriodSelection}
      />
    ),
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
    ),
    changeField: ({ register, choice, choices }) => {
      return (
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
          choices={choices?.map((choice) => ({ name: choice, value: choice }))}
        />
      );
    },
  },

  model: {
    metricSelection: (register) => (
      <SelectInput
        headLess
        defaultValue={"model"}
        {...register("metric")}
        align="end"
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[{ name: "Model", value: "model" }]}
        // handleSelected={handleTimePeriodSelection}
      />
    ),
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
      />
    ),
    changeField: ({ register, choice, choices }) => {
      return (
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
          choices={choices?.map((choice) => ({ name: choice, value: choice }))}
        />
      );
    },
  },
  prompt: {
    metricSelection: (register) => (
      <SelectInput
        headLess
        defaultValue={"prompt"}
        {...register("metric")}
        align="end"
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[{ name: "Prompt", value: "prompt" }]}
        // handleSelected={handleTimePeriodSelection}
      />
    ),
    operationSelection: (register) => (
      <SelectInput
        headLess
        placeholder="contains"
        align="end"
        {...register("operator")}
        // value={currentTimeRange}
        icon={Down}
        padding="py-xxxs px-xxs"
        gap="gap-xxs"
        choices={[
          { name: "contains", value: "" },
          { name: "does not contains", value: "!" },
        ]}
      />
    ),
    changeField: (register) => {
      return (
        <TextInputSmall
        placeholder="Search prompt..."
        {...register("prompt", {
          value: searchText,
          onChange: (e) => setSearchText(e.target.value),
        })}
        value={searchText}
      />
      );
    },
  },
};

export const Filters = ({
  metric,
  secFilter,
}: {
  metric: FilterType;
  secFilter?: string;
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
  const filterOpen = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOpen
  );
  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const keys = useTypedSelector((state: RootState) => state.requestLogs.keys);
  const models = useTypedSelector(
    (state: RootState) => state.requestLogs.models
  );

  let randomId;
  const onSubmit = (data: any) => {
    const negation = data.operator === "!";
    const filterData = {
      metric: currentFilter.metric,
      negation: negation,
      value: currentFilter.value,
      id: currentFilter.id,
    };
    dispatch(setCurrentFilter(filterData));
    getRequestLogs();
  };
  const handleClose = (id: any) => {
    // setLocalFilters(updatedFilters); // Update local state
    dispatch(setFilters(filters.filter((filter) => filter.id !== id)));
    if (filters.length === 1) {
      dispatch(setFilters([]));
      dispatch(setFilterOpen(false));
      console.log("here", filters.length);
    }
  };
  // const currentFilter = RequestFilters[metric];
  console.log("keyws", keys);
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
          {filter.metric === "failed" &&
            RequestFilters[filter.metric]?.changeField(register, secFilter)}
          {filter.metric === "apiKey" &&
            RequestFilters[filter.metric]?.changeField({
              register,
              choice: secFilter,
              choices: keys,
            })}
          {filter.metric === "model" &&
            RequestFilters[filter.metric]?.changeField({
              register,
              choice: secFilter,
              choices: models,
            })}
          {filter.metric === "prompt" && RequestFilters[filter.metric]?.changeField(register)}
          {<DotsButton icon={Close} onClick={() => handleClose(filter.id)} />}
        </form>
      ))}
    </div>
  );
};
