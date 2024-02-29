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
import { Button } from "src/components/Buttons";
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
  setUsersLogDataSort,
  setUsersLogDataSortOrdering,
} from "src/store/actions/usersPageAction";
export interface DisplayPopoverProps {}

export function DisplayPopover({}: DisplayPopoverProps) {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    enableScope("userspage_displaypopover");
    return () => {
      disableScope("userspage_displaypopover");
    };
  }, []);

  const [showPopover, setShowPopover] = useState(false);
  const { enableScope, disableScope } = useHotkeysContext();
  const currentsortKey = useTypedSelector(
    (state) => state.customersPage.sortKey
  );
  const currentsortOrder = useTypedSelector(
    (state) => state.customersPage.sortOrder
  );
  const choices = userTableColumns.map((column, index) => {
    return {
      value: column.value,
      name: column.name,
      secText: (index + 1).toString(),
    };
  });

  useHotkeys(
    "d",
    () => {
      setShowPopover((prev) => !prev);
    },
    {
      scopes: "userspage_displaypopover",
    }
  );
  return (
    <Popover
      trigger={
        <div>
          <Tooltip
            side="bottom"
            sideOffset={8}
            align="center"
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
        </div>
      </form>
    </Popover>
  );
}
