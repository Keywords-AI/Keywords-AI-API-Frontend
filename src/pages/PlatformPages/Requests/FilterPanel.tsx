import React, { useEffect, useState } from "react";
import { SelectInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Down, Display, AlphanumericKey } from "src/components/Icons";
import { Button, CheckBoxButtonSmall } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { Divider } from "src/components/Sections";
import { Operator, RootState } from "src/types";
import { updateUser, getRequestLogs } from "src/store/actions";
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
  const displayColumns = showColumns;
  const { register, handleSubmit, watch } = useForm();
  const displayProperties = watch("display_properties");
  useEffect(() => {
    if (user?.display_properties.length > 0) {
      dispatch(
        setDisplayColumns(checkBoxFieldToList(user?.display_properties))
      );
    }
  }, [user]);
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
    setQueryParams({ sort_by: "-timestamp" }, navigate);
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
            sideOffset={4}
            align="end"
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
              active={showPopover}
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
      sideOffset={4}
      align="end"
      width="w-[320px]"
    >
      <div className={"flex flex-col gap-xxs items-end"}>
        <div className="flex flex-col items-start gap-xs self-stretch">
          <div className="flex flex-col items-start gap-xs self-stretch">
            {/* <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Grouping</span>
              <SelectInput
                useShortCut
                headLess
                align="end"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
                backgroundColor="bg-gray-2"
                width="min-w-[140px]"
                optionsWidth="w-[140px]"
                defaultValue={user.group_by || ""}
                choices={[
                  // Value will be the db column name of request log
                  {
                    name: "API key",
                    value: "organization_key__name",
                    secText: "1",
                  },
                  { name: "Model", value: "model", secText: "2" },
                  { name: "Status", value: "failed", secText: "3" },
                  // { name: "Cached", value: "cached" },
                  { name: "Sentiment", value: "sentiment_score", secText: "4" },
                  { name: "No grouping", value: "", secText: "5" },
                ]}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams(window.location.search);
                  if (value !== params.get("group_by")) {
                    setQueryParams({ group_by: value }, navigate);
                    dispatch(getRequestLogs());
                  }
                }}
              />
            </div> */}
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Ordering</span>
              <SelectInput
                useShortCut
                headLess
                align="end"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
                backgroundColor="bg-gray-2"
                width="min-w-[140px]"
                optionsWidth="w-[180px]"
                defaultValue={user.sort_by || "-timestamp"}
                choices={[
                  // Value will be the db column name of request log
                  { name: "Default", value: "-timestamp", secText: "1" },
                  { name: "Cost", value: "-cost", secText: "2" },
                  { name: "TTFT", value: "-time_to_first_token", secText: "3" },
                  { name: "Generation time", value: "-latency", secText: "4" },
                  {
                    name: "Input tokens",
                    value: "-prompt_tokens",
                    secText: "5",
                  },
                  {
                    name: "Output tokens",
                    value: "-completion_tokens",
                    secText: "6",
                  },
                  {
                    name: "All tokens",
                    value: "-all_tokens",
                    secText: "7",
                  },
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
            {/* <div className="flex justify-between items-center self-stretch ">
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
            </div> */}
          </div>
          <Divider color="bg-gray-3" />
          <span className="text-sm-regular text-gray-4">
            Display properties
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
                return organization?.organization_subscription?.plan_level ??
                  0 > 1 ? (
                  <CheckBoxButtonSmall
                    key={metric.retrievalKey}
                    {...register("display_properties")}
                    text={metric.name}
                    value={metric.retrievalKey}
                    checked={checked}
                  />
                ) : null;
              } else if (metric.name === "Organization") {
                return user.is_admin ? (
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
