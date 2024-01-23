import React, { useEffect, useState } from "react";
import { SelectInput } from "src/components/Inputs";
import { Popover } from "src/components/Dialogs";
import { Down, Display } from "src/components/Icons";
import { Button, CheckBoxButtonSmall } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { Divider } from "src/components/Sections";
import { RootState } from "src/types";
import { updateUser, getRequestLogs } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import {
  requestLogColumns,
  requestLogTagColumns,
} from "src/utilities/constants";
import { useForm } from "react-hook-form";
import { setDisplayColumns } from "src/store/actions";
import { checkBoxFieldToList } from "src/utilities/objectProcessing";
import { setQueryParams } from "src/utilities/navigation";

export function FilterPanel() {
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useTypedDispatch();
  const currentTimeRange = useTypedSelector(
    (state: RootState) => state.dashboard.displayFilter.timeRange
  );
  const showColumns = useTypedSelector(
    (state: RootState) => state.requestLogs.displayColumns
  );
  const user = useTypedSelector((state: RootState) => state.user);
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
  return (
    <Popover
      trigger={
        <Button
          variant="small"
          text="Display"
          icon={Display}
          secIcon={Down}
          secIconPosition="right"
          onClick={() => setShowPopover((prev) => !prev)}
        />
      }
      open={showPopover}
      setOpen={setShowPopover}
      side="bottom"
      sideOffset={5}
      align="end"
      width="w-[320px]"
    >
      <div className={"flex flex-col gap-xxs items-end"}>
        <div className="flex flex-col items-start gap-sm self-stretch">
          <div className="flex flex-col items-start gap-xs self-stretch">
            <div className="flex justify-between items-center self-stretch ">
              <span className="text-sm-regular text-gray-4">Ordering</span>
              <SelectInput
                headLess
                align="end"
                icon={Down}
                padding="py-xxxs px-xxs"
                gap="gap-xxs"
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
                    dispatch(
                      updateUser({ sort_by: value }, () => {}, true)
                    );
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
                padding="py-xxxs px-xxs"
                width="min-w-[140px]"
                optionsWidth="w-[120px]"
                gap="gap-xxs"
                choices={user.time_range_types}
                onChange={(e) => {
                  const value = e.target.value;
                  const params = new URLSearchParams(window.location.search);
                  if (value !== params.get("time_range_type")) {
                    dispatch(
                      updateUser({ time_range_type: value }, () => {}, true)
                    );
                    setQueryParams({ time_range_type: value }, navigate);
                    dispatch(getRequestLogs());
                  }
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
          </div>
        </div>
      </div>
    </Popover>
  );
}