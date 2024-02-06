import React, { useEffect, useState } from "react";
import { SelectInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Down, Display, AlphanumericKey } from "src/components/Icons";
import { Button, CheckBoxButtonSmall } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { Divider } from "src/components/Sections";
import { Operator, RootState } from "src/types";
import {
  updateUser,
  getRequestLogs,
  setFilters,
  addFilter,
  setCurrentFilter,
} from "src/store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import {
  requestLogColumns,
  requestLogTagColumns,
} from "src/utilities/constants";
import { useForm } from "react-hook-form";
import { setDisplayColumns } from "src/store/actions";
import { checkBoxFieldToList } from "src/utilities/objectProcessing";
import { setQueryParams } from "src/utilities/navigation";
import Tooltip from "src/components/Misc/Tooltip";
import { toLocalISOString } from "src/utilities/stringProcessing";

export function FilterPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useTypedDispatch();
  const { enableScope, disableScope } = useHotkeysContext();

  useHotkeys(
    "d",
    () => {
      setShowPopover((prev) => !prev);
    },
    {
      scopes: "request_log",
    }
  );
  const currentTimeRange =
    new URLSearchParams(location.search).get("time_range_type") || "all";
  const showColumns = useTypedSelector(
    (state: RootState) => state.requestLogs.displayColumns
  );
  const currentFilters = useTypedSelector(
    (state: RootState) => state.requestLogs.filters
  );
  const user = useTypedSelector((state: RootState) => state.user);
  const organization = useTypedSelector(
    (state: RootState) => state.organization
  );
  const displayColumns =
    user.display_properties.length > 0 ? user.display_properties : showColumns;
  const { register, handleSubmit, watch } = useForm();
  const displayProperties = watch("display_properties");
  useEffect(() => {
    if (displayProperties) {
      dispatch(setDisplayColumns(checkBoxFieldToList(displayProperties)));
      dispatch(
        updateUser({ display_properties: displayProperties }, () => {}, true)
      );
    }
  }, [displayProperties]);
  useEffect(() => {
    enableScope("request_log");
    return () => {
      disableScope("request_log");
    };
  }, []);
  return (
    <Popover
      trigger={
        <div>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
            content={
              <>
                <p className="caption text-gray-4">Show display options</p>
                <AlphanumericKey value={"D"} />
              </>
            }
          >
            <Button
              variant="small"
              text="Display"
              icon={Display}
              secIcon={Down}
              secIconPosition="right"
              onClick={() => setShowPopover((prev) => !prev)}
            />
          </Tooltip>
        </div>
      }
      open={showPopover}
      setOpen={setShowPopover}
      padding="px-sm py-xs"
      side="bottom"
      sideOffset={5}
      align="end"
      width="w-[320px]"
    >
      <div className={"flex flex-col gap-xxs items-end"}>
        <div className="flex flex-col items-start gap-xs self-stretch">
          <div className="flex flex-col items-start gap-xs self-stretch">
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Ordering</span>
              <SelectInput
                headLess
                align="end"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
                backgroundColor="bg-gray-2"
                width="min-w-[140px]"
                optionsWidth="w-[120px]"
                defaultValue={user.sort_by}
                choices={[
                  // Value will be the db column name of request log
                  { name: "Time", value: "-timestamp" },
                  { name: "Cost", value: "-cost" },
                ]}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams(window.location.search);
                  if (value !== params.get("sort_by")) {
                    dispatch(updateUser({ sort_by: value }, () => {}, true));
                    setQueryParams({ sort_by: value }, navigate);
                    dispatch(getRequestLogs());
                  }
                }}
              />
            </div>
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Display</span>
              <SelectInput
                headLess
                align="end"
                defaultValue={currentTimeRange}
                icon={Down}
                backgroundColor="bg-gray-2"
                padding="py-xxxs px-xxs"
                width="min-w-[140px]"
                optionsWidth="w-[120px]"
                gap="gap-xxs"
                choices={user.time_range_types}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams(window.location.search);

                  dispatch(
                    updateUser({ time_range_type: value }, () => {}, true)
                  );
                  setQueryParams({ time_range_type: value }, navigate);
                  dispatch(
                    setFilters(
                      currentFilters.filter(
                        (filter) => filter.metric !== "timestamp"
                      )
                    )
                  );
                  let newDate = "";
                  switch (value) {
                    case "daily":
                      console.log("daily");
                      newDate = toLocalISOString(
                        new Date(new Date().setDate(new Date().getDate() - 1))
                      );

                      break;

                    case "weekly":
                      console.log("weekly");
                      newDate = toLocalISOString(
                        new Date(new Date().setDate(new Date().getDate() - 7))
                      );

                      break;
                    case "monthly":
                      console.log("monthly");
                      newDate = toLocalISOString(
                        new Date(new Date().setMonth(new Date().getMonth() - 1))
                      );

                      break;
                    case "yearly":
                      console.log("yearly");
                      newDate = toLocalISOString(
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 1)
                        )
                      );
                      break;
                    default:
                      console.log("all");
                      break;
                  }
                  if (newDate !== "") {
                    dispatch(
                      addFilter({
                        metric: "timestamp",
                        value: [newDate],
                        operator: "gte" as Operator,
                        value_field_type: "datetime-local",
                        display_name: "Time",
                        id: Math.random().toString(36).substring(2, 15),
                      })
                    );
                  }

                  dispatch(setCurrentFilter({ metric: undefined, id: "" }));
                  dispatch(getRequestLogs());
                }}
              />
            </div>
          </div>
          <Divider color="bg-gray-3" />
          <span className="text-sm-regular text-gray-4">
            Display Properties
          </span>
          <div className="flex-row gap-xxxs flex-wrap">
            {requestLogColumns.map((metric) => {
              const checked = displayColumns.includes(metric.retrievalKey);
              return (
                <CheckBoxButtonSmall
                  key={metric.retrievalKey}
                  {...register("display_properties")}
                  text={metric.name}
                  value={metric.retrievalKey}
                  checked={checked}
                />
              );
            })}
            {requestLogTagColumns.map((metric) => {
              const checked = displayColumns.includes(metric.retrievalKey);
              if (metric.name === "Sentiment") {
                return organization?.organization_subscription.plan_level >
                  1 ? (
                  <CheckBoxButtonSmall
                    key={metric.retrievalKey}
                    {...register("display_properties")}
                    text={metric.name}
                    value={metric.retrievalKey}
                    checked={checked}
                  />
                ) : null;
              } else {
                return (
                  <CheckBoxButtonSmall
                    key={metric.retrievalKey}
                    {...register("display_properties")}
                    text={metric.name}
                    value={metric.retrievalKey}
                    checked={checked}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </Popover>
  );
}
