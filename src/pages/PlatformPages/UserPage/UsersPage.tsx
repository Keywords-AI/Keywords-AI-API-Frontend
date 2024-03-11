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
  exportUserLogs,
  filterUsersLogDataAction,
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

type Props = {};

export default function UsersPage({}: Props) {
  const isEmpty = useTypedSelector((state) => state.usersPage.isEmpty);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getUsersLogData());
  }, []);
  const isSidePanelOpen = useTypedSelector(
    (state) => state.usersPage.sidepanel
  );

  return (
    <div
      className={cn(
        "flex-col items-start self-stretch flex-1 h-[calc(100dvh-52px)] bg-gray-1 ",
        isEmpty ? "p-lg" : ""
      )}
      aria-label="frame 1733"
    >
      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <TopBar />
          <div className="flex flex-1 self-stretch">
            <Table />
            {isSidePanelOpen && <SidePanel />}
          </div>
        </>
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
    dispatch(filterUsersLogDataAction(searchString));
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
  return (
    <>
      <div aria-label="frame 1938" className="flex items-start w-full  gap-md">
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
      </div>
      <Divider />
      <div
        aria-label="frame 1944"
        className="flex px-lg py-xs justify-between items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <ExportPopOver exportAction={exportUserLogs} />
        <div className="flex  items-center gap-xxs">
          <SearchUser handleSearch={handleSearch} handleReset={handleReset} />
          <TimeSwitcher />
          <DisplayPopover />
          {isAdmin && (
            <Tooltip
              side="bottom"
              sideOffset={8}
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
