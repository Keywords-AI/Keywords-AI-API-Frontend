import React, { useEffect } from "react";
import { ExportPopOver, SearchUser } from "./components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import {
  exportUserLogs,
  filterUsersLogDataAction,
  getUsersLogData,
} from "src/store/actions/usersPageAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {};

export default function UsersPage({}: Props) {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getUsersLogData());
  }, []);
  return (
    <div
      className="flex-col items-start self-stretch flex-1 h-[calc(100vh-52px)] bg-gray-1 "
      aria-label="frame 1733"
    >
      <TopBar />
      <Table />
    </div>
  );
}

const TopBar = () => {
  const dispatch = useTypedDispatch();
  const handleSearch = (searchString: string) => {
    dispatch(filterUsersLogDataAction(searchString));
  };
  const handleReset = () => {
    dispatch(filterUsersLogDataAction(""));
  };
  return (
    <>
      <div
        aria-label="frame 1944"
        className="flex px-lg py-xs justify-end items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <div className="flex  items-center gap-xxs">
          <SearchUser handleSearch={handleSearch} handleReset={handleReset} />
        </div>
      </div>
      <div
        aria-label="frame 1943"
        className="flex px-lg py-xs justify-end items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <ExportPopOver exportAction={exportUserLogs} />
      </div>
    </>
  );
};

const Table = () => {
  const templateString = "128px 128px 100px 120px 120px 120px 120px ";
  const data = useTypedSelector((state) => state.usersPage.usersLogData);
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
            {value as string}
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
            {value as string}
          </div>
        );
      case "totalRequests":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number).toLocaleString()}
          </div>
        );
      case "requestsPerDay":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number).toLocaleString()}
          </div>
        );

      case "totalTokens":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number).toLocaleString()}
          </div>
        );

      case "tokensPerDay":
        return (
          <div className="flex text-sm-regular text-gray-5  items-center h-[20px]">
            {(value as number).toLocaleString()}
          </div>
        );
    }
  };

  const LoadingRow = Array(40)
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
          {Array(7)
            .fill(null)
            .map((_, idx) => (
              <Skeleton duration={3} key={idx} className="h-[24px]" />
            ))}
        </SkeletonTheme>
      </div>
    ));
  const isloading = useTypedSelector((state) => state.usersPage.loading);
  const Header = (
    <div
      aria-label="table header"
      className="px-lg py-xs grid gap-x-sm bg-gray-2 h-[44px]"
      style={{
        gridTemplateColumns: templateString,
      }}
    >
      <div className="text-sm-md text-gray-4">Customer ID</div>
      <div className="text-sm-md text-gray-4">Last Active</div>
      <div className="text-sm-md text-gray-4">Active for</div>
      <div className="text-sm-md text-gray-4">Total Requests</div>
      <div className="text-sm-md text-gray-4">Requests / day</div>
      <div className="text-sm-md text-gray-4">Total tokens</div>
      <div className="text-sm-md text-gray-4">Tokens / day</div>
    </div>
  );
  return (
    <div className="flex-col w-full max-h-[calc(100vh-157px)] items-start overflow-auto ">
      <div
        aria-label="table"
        className="grid grid-flow-row auto-rows-[40px] w-full"
      >
        {Header}
        {isloading
          ? LoadingRow
          : data &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  aria-label="row"
                  className="px-lg py-xxs grid gap-x-sm items-center "
                  style={{
                    gridTemplateColumns: templateString,
                  }}
                >
                  {Object.entries(item).map(([key, value], i) => (
                    <React.Fragment key={i}>
                      {renderItem(key, value)}
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
      </div>
    </div>
  );
};
