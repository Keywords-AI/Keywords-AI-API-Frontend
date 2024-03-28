import React, { useEffect, useState } from "react";
import {
  DisplayPopover,
  ExportPopOver,
  SearchUser,
  SidePanel,
  TimeSwitcher,
} from "./components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  addUserLogFilter,
  exportUserLogs,
  getUsersLogData,
  setSelectedUser,
  toggleSidePanel,
} from "src/store/actions/usersPageAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Divider, WelcomeState } from "src/components/Sections";
import cn from "src/utilities/classMerge";
import { TitleAuth } from "src/components/Titles";
import {
  AlphanumericKey,
  Button,
  Right,
  SideBar,
  SideBarActive,
} from "src/components";
import { userTableColumns } from "src/utilities/constants";
import MetricCardFocus from "src/components/Cards/MetricCardFocus";
import WelcomeCard from "src/components/Cards/WelcomeCard";
import { UsersPagePreview } from "src/components/Display/Figures";
import { SentimentTag } from "src/components/Misc";
import Tooltip from "src/components/Misc/Tooltip";
import { DotsButton } from "src/components/Buttons";
import { toggleRightPanel } from "src/store/actions";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { Table } from "./components/Table/Table";
import { Paginator } from "../Requests/Paginator";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";

type Props = {};

export default function UsersPage({}: Props) {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getUsersLogData());
  }, []);
  const isSidePanelOpen = useTypedSelector(
    (state) => state.usersPage.sidepanel
  );
  const isEmpty = useTypedSelector((state) => state.usersPage.isEmpty);
  const total_users = useTypedSelector(
    (state) => state.usersPage.aggregationData.total_users
  );
  return (
    <div
      className={cn(
        "flex-col items-start self-stretch flex-1 h-screen bg-gray-1 ",
        isEmpty ? "p-lg" : ""
      )}
      aria-label="frame 1733"
    >
      {!isEmpty ? (
        <>
          <TopBar />
          <div className=" flex self-stretch h-[calc(100%-105px)]">
            <Table />
            {isSidePanelOpen && <SidePanel />}
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const TopBar = () => {
  const dispatch = useTypedDispatch();
  const aggregatedData = useTypedSelector(
    (state) => state.usersPage.aggregationData
  );
  const isAdmin = useTypedSelector((state) => state.user.is_admin);
  const handleSearch = (searchString: string) => {
    const randomId = Math.random().toString(36).substring(2, 15);
    dispatch(
      addUserLogFilter({
        display_name: "Customer identifier",
        metric: "customer_identifier",
        value: [searchString],
        id: randomId,
        operator: "icontains",
        value_field_type: "text",
      })
    );
  };
  const handleReset = () => {
    // dispatch(filterUsersLogDataAction(""));
  };
  const isSidePanelOpen = useTypedSelector(
    (state) => state.usersPage.sidepanel
  );
  useHotkeys(
    ".",
    () => {
      if (!isAdmin) return;
      dispatch(toggleSidePanel(!isSidePanelOpen));
    },
    { preventDefault: true }
  );
  const cardData = [
    {
      title: "Total users",
      number: aggregatedData.total_users.toLocaleString(),

      dataKey: "total",
    },
    {
      title: "Monthly active users",
      number: aggregatedData.monthly_active_users.toLocaleString(),
      dataKey: "active",
    },
    {
      title: "Daily active users",
      number: aggregatedData.daily_active_users.toLocaleString(),
      dataKey: "active",
    },
    {
      title: "New users",
      number: "+" + aggregatedData.new_users.toLocaleString(),
      dataKey: "active",
    },
    {
      title: "Daily request per user",
      number: aggregatedData.daily_request_per_user.toLocaleString(),
      dataKey: "active",
    },
    {
      title: "Monthly cost per user",
      number: "$" + aggregatedData.monthly_cost_per_user.toLocaleString(),
      dataKey: "active",
    },
  ];
  const urlParams = new URLSearchParams(location.search);
  const BCItems = [
    {
      label: "Users",
      link: "/platform/users",
    },
    urlParams.get("is_test") === "true"
      ? {
          label: "Test env",
        }
      : {
          label: "Prod env",
        },
  ];
  return (
    <>
      {/* <div aria-label="frame 1938" className="flex items-start w-full  gap-md">
        {cardData.map((item, index) => (
          <MetricCardFocus
            key={index}
            title={item.title}
            number={item.number}
            // chartData={item.chartData}
            // dataKey={item.dataKey}
            width="flex-1"
          />
        ))}
      </div> */}
      <div
        aria-label="frame 1944"
        className="flex px-lg py-xs justify-between items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <div className="flex flex-row items-center gap-xxxs">
          <BCrumb items={BCItems} />
        </div>
        <div className="flex  items-center gap-xxs">
          {/* {isAdmin && (
            <SearchUser handleSearch={handleSearch} handleReset={handleReset} />
          )} */}
          <TimeSwitcher />
          <DisplayPopover />
        </div>
      </div>
      <div
        aria-label="filter-display"
        className="flex flex-row py-xs px-lg justify-between items-center self-stretch rounded-xs shadow-border-b-2 h-[52px]"
      >
        <div className="flex flex-row items-center gap-xxs rounded-xs"></div>
        <div className="flex flex-row items-center gap-xxs">
          <ExportPopOver exportAction={exportUserLogs} />
          <div className="w-[1px] h-[28px] bg-gray-2"></div>
          {isAdmin && (
            <Tooltip
              side="bottom"
              sideOffset={4}
              align="end"
              delayDuration={1}
              content={
                <>
                  <p className="caption text-gray-4">Open right sidebar</p>
                  <AlphanumericKey value={"."} />
                </>
              }
            >
              <div>
                <DotsButton
                  icon={isSidePanelOpen ? SideBarActive : SideBar}
                  onClick={() => dispatch(toggleSidePanel(!isSidePanelOpen))}
                  active={isSidePanelOpen}
                />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

const EmptyState = () => {
  return (
    <WelcomeCard
      pageTitle="USER INSIGHTS"
      beta
      title={`Add parameter “customer_identifier”`}
      content={
        <>
          to view user metrics.
          <br />
          View usage by user, analyze unit economics, and get more insights.
        </>
      }
      figure={<UsersPagePreview />}
    />
  );
};
