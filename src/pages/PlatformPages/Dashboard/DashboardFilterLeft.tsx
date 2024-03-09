import React, { useEffect } from "react";
import { AlphanumericKey, Button, Close } from "src/components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import { DashboardFilterActions } from "./DashboardFilterActions";
import { setDashboardFilters } from "src/store/actions";
import { DashboardFilterItem } from "./DashboardFilterItem";
import Tooltip from "src/components/Misc/Tooltip";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";

type Props = {};

export default function DashboardFilterLeft({}: Props) {
  const filters = useTypedSelector((state) => state.dashboard.filters);
  const isAdmin = useTypedSelector((state) => state.user.is_admin);
  const { enableScope, disableScope } = useHotkeysContext();
  const loading = useTypedSelector((state) => state.dashboard.loading);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (filters.length > 0) enableScope("clear_filters");
    else disableScope("clear_filters");
    return () => {
      disableScope("clear_filters");
    };
  }, [filters]);
  useHotkeys(
    "C",
    () => {
      if (loading) return;
      dispatch(setDashboardFilters([]));
    },
    {
      scopes: "clear_filters",
    }
  );
  if (!isAdmin) return null;
  return (
    <div className="flex items-center gap-xxs">
      {filters.length > 0 === false && <DashboardFilterActions type="filter" />}
      {filters.length > 0 && !loading && (
        <React.Fragment>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="start"
            delayDuration={1}
            content={
              <>
                <p className="caption text-gray-4">Clear filters</p>
                <AlphanumericKey value={"C"} />
              </>
            }
          >
            <Button
              variant="small-dashed"
              icon={Close}
              text="Clear filters"
              onClick={() => dispatch(setDashboardFilters([]))}
              iconPosition="right"
            />
          </Tooltip>
        </React.Fragment>
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
