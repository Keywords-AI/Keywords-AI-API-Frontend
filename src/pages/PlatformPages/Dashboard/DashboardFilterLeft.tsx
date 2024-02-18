import React from "react";
import { Button, Close } from "src/components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DashboardFilterActions } from "./DashboardFilterActions";
import { setDashboardFilters } from "src/store/actions";

type Props = {};

export default function DashboardFilterLeft({}: Props) {
  const filters = useTypedSelector((state) => state.dashboard.filters);
  const dispatch = useTypedDispatch();
  return (
    <div className="flex items-center gap-xxxs">
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
    </div>
  );
}
