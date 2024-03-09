import {
  RequestFilters as RequestFiltersType,
  FilterObject,
  RootState,
  RequestFilter as RequestFilterType,
} from "src/types";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
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
    <>
      {filters.map((filter, index) => (
        <div key={filter.id} className="flex flex-row items-center gap-[2px]">
          <RequstFilter filter={filter} />
        </div>
      ))}
    </>
  );
};
