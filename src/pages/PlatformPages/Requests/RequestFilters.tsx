import React, { useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { Close, Down } from "src/components";
import { SelectInput, TextInputSmall } from "src/components/Inputs";
import {
  RequestFilters as RequestFiltersType,
  FilterObject,
  RootState,
  RequestFilter as RequestFilterType,
} from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  getRequestLogs,
  setFilters,
  setFilterOpen,
  setCurrentFilter,
} from "src/store/actions";
import { RequstFilter } from "./RequestFilter";


export const Filters = () => {
  const dispatch = useTypedDispatch();
  const filters = useTypedSelector((state) => state.requestLogs.filters);
  const currentFilter = useTypedSelector(
    (state: RootState) => state.requestLogs.currentFilter
  );
  const filterOptions = useTypedSelector(
    (state: RootState) => state.requestLogs.filterOptions
  );
  const keys = useTypedSelector((state: RootState) => state.requestLogs.keys);
  const models = useTypedSelector(
    (state: RootState) => state.requestLogs.models
  );

  return (
    <div className="flex-row gap-xxxs items-center">
      {filters.map((filter, index) => (
        <div
          key={filter.id}
          className="flex flex-row items-center gap-[2px]"
        >
          <RequstFilter filter={filter} />
        </div>
      ))}
    </div>
  );
};
