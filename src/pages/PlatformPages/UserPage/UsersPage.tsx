import React, { useEffect } from "react";
import {
  DisplayPopover,
  ExportPopOver,
  SearchUser,
  TimeSwitcher,
} from "./components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  exportUserLogs,
  filterUsersLogDataAction,
  getUsersLogData,
} from "src/store/actions/usersPageAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Divider, WelcomeState } from "src/components/Sections";
import cn from "src/utilities/classMerge";
import { TitleAuth } from "src/components/Titles";
import { Button, Right } from "src/components";
import { userTableColumns } from "src/utilities/constants";
import MetricCardFocus from "src/components/Cards/MetricCardFocus";
import WelcomeCard from "src/components/Cards/WelcomeCard";
import { UsersPagePreview } from "src/components/Display/Figures";
import { SentimentTag } from "src/components/Misc";

type Props = {};

export default function UsersPage({}: Props) {
  const isEmpty = useTypedSelector((state) => state.usersPage.isEmpty);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getUsersLogData());
  }, []);
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
          <Table />
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
  const handleSearch = (searchString: string) => {
    dispatch(filterUsersLogDataAction(searchString));
  };
  const handleReset = () => {
    dispatch(filterUsersLogDataAction(""));
  };

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
        </div>
      </div>
    </>
  );
};

const Table = () => {
  const templateString = "1fr 140px 100px 140px 120px 120px 120px 120px ";
  const data = useTypedSelector((state) => state.usersPage.usersLogData);
  const displayColumns = useTypedSelector(
    (state) => state.usersPage.displayColumns
  );

  const renderItem = (name: string, value: Date | number | string) => {
    let options = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    switch (name) {
      case "customerId":
        return (
          <div className="flex text-sm-regular text-gray-4 items-center h-[20px]">
            {value ? (value as string) : "-"}
          </div>
        );
      case "lastActive":
        return (
          <div className="flex text-sm-regular text-gray-5 whitespace-nowrap  items-center h-[20px]">
            {`${new Date(value)
              .toLocaleString("en-US", options)
              .replace(",", " at")}`}
          </div>
        );
      case "activeFor":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {value ? (value as string) : ""}
          </div>
        );
      case "requests":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number) >= 0 ? (value as number).toLocaleString() : "0"}
          </div>
        );

      case "tokens":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number) >= 0 ? (value as number).toLocaleString() : "0"}
          </div>
        );
      case "costs":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number) >= 0 && value != null
              ? "$" + (value as number).toFixed(2)
              : "$0"}
          </div>
        );
      case "sentiment":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            <SentimentTag sentiment_score={value as number} />
          </div>
        );
    }
  };

  const LoadingRow = Array(10)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="px-lg py-xxs grid gap-x-sm bg-gray-1"
        style={{
          gridTemplateColumns: templateString,
        }}
      >
        <SkeletonTheme baseColor="#1E1E23" highlightColor="#23232B">
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <Skeleton duration={3} key={idx} className="h-[24px]" />
            ))}
        </SkeletonTheme>
      </div>
    ));
  const isloading = useTypedSelector((state) => state.usersPage.loading);
  const currentsortKey = useTypedSelector((state) => state.usersPage.sortKey);
  const currentTimeRange = useTypedSelector(
    (state) => state.usersPage.timeRane
  );
  const timeValueToName = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    all: "Total",
  };
  const Header = (
    <div
      aria-label="table header"
      className="px-lg py-xs grid gap-x-sm bg-gray-2 h-[44px]"
      style={{
        gridTemplateColumns: templateString,
      }}
    >
      {userTableColumns
        .filter((e) => displayColumns.includes(e.value))
        .map((column, index) => (
          <div
            key={index}
            className={cn(
              "text-sm-md ",
              currentsortKey == column.value ? "text-gray-5" : "text-gray-4"
            )}
          >
            {column.value == "requests" ||
            column.value == "tokens" ||
            column.value == "costs"
              ? timeValueToName[currentTimeRange] + " " + column.name
              : column.name}
          </div>
        ))}
    </div>
  );
  return (
    <div className="flex-col w-full max-h-[calc(100dvh-236px)] items-start ">
      <div aria-label="table" className="grid grid-flow-row w-full">
        {Header}
        <div className="flex-col w-full max-h-[calc(100dvh-282px)] overflow-auto ">
          {isloading
            ? LoadingRow
            : data &&
              data.map((item, index) => {
                return (
                  <div
                    key={index}
                    aria-label="row"
                    className="px-lg py-xxs grid gap-x-sm items-center h-[40px] "
                    style={{
                      gridTemplateColumns: templateString,
                    }}
                  >
                    {Object.entries(item)
                      .filter((item) => displayColumns.includes(item[0]))
                      .map(([key, value], i) => (
                        <React.Fragment key={i}>
                          {renderItem(key, value)}
                        </React.Fragment>
                      ))}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
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
    // <div className="flex-col justify-center items-center gap-md flex-1 self-stretch outline outline-1 outline-gray-3  rounded-md">
    //   <TitleAuth
    //     title="Welcome to Keywords AI!"
    //     subtitle={
    //       "Add the customer_identifier parameter to your API calls to view user metrics."
    //     }
    //     textAlign="text-center"
    //   />
    //   <div className="flex justify-center items-center gap-xs">
    //     <Button
    //       variant="r4-black"
    //       text="View docs"
    //       icon={Right}
    //       iconPosition="right"
    //       onClick={() =>
    //         window.open(
    //           "https://docs.keywordsai.co/api-usage/request-params#extra-parameters-for-monitoring",
    //           "_blank"
    //         )
    //       }
    //     />
    //   </div>
    // </div>
  );
};
