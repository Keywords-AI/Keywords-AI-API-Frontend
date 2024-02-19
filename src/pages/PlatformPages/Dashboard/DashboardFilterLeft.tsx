import React from "react";
import { Button, Close } from "src/components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DashboardFilterActions } from "./DashboardFilterActions";
import { setDashboardFilters } from "src/store/actions";
import { DashboardFilterItem } from "./DashboardFilterItem";

type Props = {};

export default function DashboardFilterLeft({}: Props) {
  const filters = useTypedSelector((state) => state.dashboard.filters);

  const dispatch = useTypedDispatch();
  return (
    <div className="flex items-center gap-xxs">
      {filters.length > 0 === false && <DashboardFilterActions type="filter" />}
      {filters.length > 0 && (
        <Button
          variant="small-dashed"
          icon={Close}
          text="Clear filters"
          onClick={() => dispatch(setDashboardFilters([]))}
          iconPosition="right"
        />
      )}

      {filters.map((filter, index) => (
        <div key={filter.id} className="flex flex-row items-center gap-[2px]">
          <DashboardFilterItem filter={filter} />
        </div>
      ))}
      {filters.length > 0 && <DashboardFilterActions type="add" />}
    </div>
  );
}
