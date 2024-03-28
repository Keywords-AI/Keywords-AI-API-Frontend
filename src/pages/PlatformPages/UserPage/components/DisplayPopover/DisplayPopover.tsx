import React, { useEffect, useState } from "react";
import { TextInputSmall, SelectInput } from "src/components/Inputs";
import { DropDownMenu, Popover } from "src/components/Dialogs";
import {
  Search,
  Down,
  Display,
  EnterKey,
  AlphanumericKey,
} from "src/components/Icons";
import { Button, CheckBoxButtonSmall } from "src/components/Buttons";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import {
  setDisplayTimeRange,
  getDashboardData,
  setDisplayMetric,
  setDisplayType,
  setDisplayBreakdown,
  setTimeFrameOffset,
  resetTimeFrameOffset,
} from "src/store/actions";
import { setQueryParams } from "src/utilities/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "src/types";
import { Metrics, userTableColumns } from "src/utilities/constants";
import { useForm } from "react-hook-form";
import Tooltip from "src/components/Misc/Tooltip";
import {
  getUsersLogData,
  setUsersLogDataDisplayColumns,
  setUsersLogDataSort,
  setUsersLogDataSortOrdering,
} from "src/store/actions/usersPageAction";
import { Divider } from "src/components/Sections";
export interface DisplayPopoverProps {}

export function DisplayPopover({}: DisplayPopoverProps) {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    enableScope("userspage_displaypopover");
    return () => {
      disableScope("userspage_displaypopover");
    };
  }, []);

  const { register, handleSubmit, watch } = useForm();
  const [showPopover, setShowPopover] = useState(false);
  const { enableScope, disableScope } = useHotkeysContext();
  const currentsortKey = useTypedSelector((state) => state.usersPage.sortKey);
  const currentDisplayColumns = useTypedSelector(
    (state) => state.usersPage.displayColumns
  );
  const currentsortOrder = useTypedSelector(
    (state) => state.usersPage.sortOrder
  );
  const choices = userTableColumns.map((column, index) => {
    return {
      value: column.value,
      name: column.name,
      secText: (index + 1).toString(),
    };
  });
  useEffect(() => {
    watch((value, { name, type }) => {
      if (!value || value.length === 0 || Object.keys(value).length === 0)
        return;
      dispatch(setUsersLogDataDisplayColumns(value.display_properties));
    });
  }, [watch]);
  useHotkeys(
    "d",
    () => {
      setShowPopover((prev) => !prev);
    },
    {
      scopes: "userspage_displaypopover",
    }
  );
  const [_, ...displayTags] = userTableColumns;
  return (
    <Popover
      trigger={
        <div>
          <Tooltip
            side="bottom"
            sideOffset={4}
            align="end"
            delayDuration={1}
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
              onClick={() => {
                setShowPopover((prev) => !prev);
              }}
            />
          </Tooltip>
        </div>
      }
      open={showPopover}
      setOpen={setShowPopover}
      side="bottom"
      sideOffset={5}
      align="end"
      width="w-[320px]"
    >
      <form className={"flex flex-col gap-xxs items-end"}>
        <div className="flex flex-col items-start gap-xxs self-stretch">
          <div className="flex justify-between items-center self-stretch ">
            <span className="text-sm-regular text-gray-4">Sort by</span>
            <SelectInput
              headLess
              placeholder="Request"
              useShortCut
              align="start"
              backgroundColor="bg-gray-2"
              icon={Down}
              padding="py-xxxs px-xxs"
              gap="gap-xxs"
              width="min-w-[140px]"
              alignOffset={-40}
              optionsWidth="w-[180px]"
              onChange={(e) => {
                dispatch(setUsersLogDataSort(e.target.value));
                dispatch(getUsersLogData());
              }}
              value={currentsortKey}
              choices={choices}
            />
          </div>
          <div className="flex justify-between items-center self-stretch ">
            <span className="text-sm-regular text-gray-4">Ordering</span>
            <SelectInput
              headLess
              placeholder="Request"
              useShortCut
              align="start"
              backgroundColor="bg-gray-2"
              icon={Down}
              padding="py-xxxs px-xxs"
              gap="gap-xxs"
              width="min-w-[140px]"
              alignOffset={-40}
              optionsWidth="w-[180px]"
              onChange={(e) => {
                dispatch(setUsersLogDataSortOrdering(e.target.value));
                dispatch(getUsersLogData());
              }}
              value={currentsortOrder}
              choices={[
                { value: "asc", name: "Ascending", secText: "1" },
                { value: "desc", name: "Descending", secText: "2" },
              ]}
            />
          </div>
          <Divider color="bg-gray-3" />
          <div className="flex items-center gap-[10px] self-stretch text-gray-4 text-sm-regular">
            Display properties
          </div>
          <div className="flex items-start content-start gap-xxxs self-stretch flex-wrap">
            {displayTags.map((metric, index) => {
              const checked = currentDisplayColumns.includes(metric.value);
              return (
                <CheckBoxButtonSmall
                  key={index}
                  {...register("display_properties")}
                  text={
                    metric.name.charAt(0).toUpperCase() + metric.name.slice(1)
                  }
                  value={metric.value}
                  checked={checked}
                />
              );
            })}
          </div>
        </div>
      </form>
    </Popover>
  );
}
