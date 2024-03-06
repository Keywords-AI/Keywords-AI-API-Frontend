import React, { useEffect } from "react";
import { DisplayPopover, ExportPopOver, SearchUser } from "./components";
import { useTypedDispatch, useTypedSelector } from "src/store/store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cn from "src/utilities/classMerge";
import { TitleAuth } from "src/components/Titles";
import { Button, Right } from "src/components";
import { userTableColumns } from "src/utilities/constants";
import {
  exportCustomerLogs,
  filterCustomersLogDataAction,
  getCustomersLogData,
} from "src/store/actions/customersPageAction";
type Props = {};

export default function CustomerPage({}: Props) {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getCustomersLogData());
  }, []);
  const usersLogState = useTypedSelector((state) => state.usersPage);
  const isEmpty =
    usersLogState.usersLogData.length === 0 && !usersLogState.loading;
  return (
    <div
      className={cn(
        "flex-col items-start self-stretch flex-1 h-[calc(100vh-52px)] bg-gray-1 ",
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
  const handleSearch = (searchString: string) => {
    dispatch(filterCustomersLogDataAction(searchString));
  };
  const handleReset = () => {
    dispatch(filterCustomersLogDataAction(""));
  };
  return (
    <>
      <div
        aria-label="frame 1944"
        className="flex px-lg py-xs justify-end items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <div className="flex  items-center gap-xxs">
          <SearchUser handleSearch={handleSearch} handleReset={handleReset} />
          <DisplayPopover />
        </div>
      </div>
      <div
        aria-label="frame 1943"
        className="flex px-lg py-xs justify-end items-center gap-xxs self-stretch shadow-border-b shadow-gray-2"
      >
        <ExportPopOver exportAction={exportCustomerLogs} />
      </div>
    </>
  );
};

const Table = () => {
  const templateString = "1fr 140px 100px 120px 120px 120px 120px 120px";
  const data = useTypedSelector(
    (state) => state.customersPage.customersLogData
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
            {value as string}
          </div>
        );
      case "lastActive":
        return (
          <div className="flex text-sm-regular text-gray-5 whitespace-nowrap  items-center h-[20px]">
            {`${new Date(value)
              .toLocaleString("en-US", options as any)
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
  const isloading = useTypedSelector((state) => state.customersPage.loading);
  const currentsortKey = useTypedSelector((state) => state.usersPage.sortKey);
  const Header = (
    <div
      aria-label="table header"
      className="px-lg py-xs grid gap-x-sm bg-gray-2 h-[44px]"
      style={{
        gridTemplateColumns: templateString,
      }}
    >
      {userTableColumns.map((column, index) => (
        <div
          key={index}
          className={cn(
            "text-sm-md ",
            currentsortKey == column.value ? "text-gray-5" : "text-gray-4"
          )}
        >
          {column.name}
        </div>
      ))}
    </div>
  );
  return (
    <div className="flex-col w-full max-h-[calc(100vh-157px)] items-start overflow-auto ">
      <div aria-label="table" className="grid grid-flow-row w-full">
        {Header}
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

const EmptyState = () => {
  return (
    <div className="flex-col justify-center items-center gap-md flex-1 self-stretch outline outline-1 outline-gray-3  rounded-md">
      <TitleAuth
        title="Welcome to Keywords AI!"
        subtitle={
          "Add the customer_identifier parameter to your API calls to view user metrics."
        }
        textAlign="text-center"
      />
      <div className="flex justify-center items-center gap-xs">
        <Button
          variant="r4-black"
          text="View docs"
          icon={Right}
          iconPosition="right"
          onClick={() =>
            window.open(
              "https://docs.keywordsai.co/api-usage/request-params#extra-parameters-for-monitoring",
              "_blank"
            )
          }
        />
      </div>
    </div>
  );
};
