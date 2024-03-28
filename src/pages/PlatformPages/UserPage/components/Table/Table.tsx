import React, { useEffect, useRef, useState } from "react";
import { useHotkeysContext, useHotkeys } from "react-hotkeys-hook";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SentimentTag } from "src/components/Misc";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import {
  setSelectedUser,
  toggleSidePanel,
} from "src/store/actions/usersPageAction";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import cn from "src/utilities/classMerge";
import { userTableColumns } from "src/utilities/constants";
import { getQueryParam } from "src/utilities/navigation";
import { Paginator } from "../Paginator";

const TableRow = ({ item, index, isNavigating }) => {
  const templateString = "200px 140px 100px 140px 120px 120px 120px ";
  const dispatch = useTypedDispatch();
  const displayColumns = useTypedSelector(
    (state) => state.usersPage.displayColumns
  );
  const selectedID = useTypedSelector((state) => state.usersPage.selectedID);
  const isSidePanelOpen = useTypedSelector(
    (state) => state.usersPage.sidepanel
  );
  const loading = useTypedSelector((state) => state.usersPage.loading);
  const [hover, setHover] = useState(false);
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
          <div className="flex text-sm-regular text-gray-4 items-center h-[20px]  ">
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap">
              {value ? (value as string) : "-"}
            </span>
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
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rowRef && rowRef.current && selectedID === item.customerId) {
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const rect = rowRef.current.getBoundingClientRect();
      const isInViewport =
        rect.top >= 260 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      if (!isInViewport) {
        const distanceToTop = Math.abs(rect.top);
        const distanceToBottom = Math.abs(rect.bottom - windowHeight);
        const minDistance = Math.min(distanceToTop, distanceToBottom);
        const maxDistance =
          +(getQueryParam("page_size") || 1000) * 40 - windowHeight * 2;
        if (minDistance > maxDistance) {
          rowRef.current.scrollIntoView({
            behavior: "instant",
            block: "center",
          });
        } else {
          rowRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [selectedID, item.customerId]);
  return (
    <div
      key={index}
      aria-label="row"
      ref={rowRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "px-lg py-xxs grid gap-x-sm items-center h-[40px] cursor-pointer relative w-full",
        (hover || selectedID == item.customerId) && !isNavigating && "bg-gray-2"
      )}
      style={{
        gridTemplateColumns: templateString,
      }}
      onClick={() => {
        if (loading) return;
        if (selectedID === item.customerId) {
          dispatch(toggleSidePanel(!isSidePanelOpen));
        } else {
          if (!isSidePanelOpen) {
            dispatch(toggleSidePanel(true));
          }
        }

        dispatch(setSelectedUser(item.customerId));
      }}
    >
      {selectedID === item.customerId && (
        <div className="h-full w-xxxs bg-white absolute"></div>
      )}
      {Object.entries(item)
        .filter((item) => displayColumns.includes(item[0]))
        .map(([key, value], i) => (
          <React.Fragment key={i}>{renderItem(key, value)}</React.Fragment>
        ))}
    </div>
  );
};

export const Table = () => {
  const templateString = "200px 140px 100px 140px 120px 120px 120px 1fr ";
  const loadingtemplateString = "auto auto auto auto auto auto auto";
  const data = useTypedSelector((state) => state.usersPage.usersLogData);
  const displayColumns = useTypedSelector(
    (state) => state.usersPage.displayColumns
  );
  const selectedID = useTypedSelector((state) => state.usersPage.selectedID);
  const isSidePanelOpen = useTypedSelector(
    (state) => state.usersPage.sidepanel
  );
  const loading = useTypedSelector((state) => state.usersPage.loading);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (data.length > 0 && selectedID === null) {
      dispatch(setSelectedUser(data[0].customerId));
    }
  }, [data, selectedID]);

  const LoadingRows = Array(10)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="px-lg py-xxs grid gap-x-sm bg-gray-1 w-full"
        style={{
          gridTemplateColumns: templateString,
        }}
      >
        <SkeletonTheme baseColor="#1E1E23" highlightColor="#23232B">
          {Array(loadingtemplateString.split(" ").length)
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
      className="px-lg py-xs grid gap-x-sm bg-gray-1 h-[44px] shadow-border-b shadow-gray-2 w-full"
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
  const { enableScope, disableScope } = useHotkeysContext();
  const [isNavigating, setIsNavigating] = useState(false);
  const [hover, setHover] = useState(-1);
  useHotkeys(
    "up",
    () => {
      if (loading) return;

      setIsNavigating(true);
      const currentIndex = data.findIndex((e) => e.customerId == selectedID);
      if (currentIndex == 0) return;
      const nextID = data[currentIndex - 1].customerId;
      dispatch(setSelectedUser(nextID));
    },
    {
      preventDefault: true,
    }
  );
  useHotkeys(
    "down",
    () => {
      if (loading) return;

      setIsNavigating(true);
      const currentIndex = data.findIndex((e) => e.customerId == selectedID);
      if (currentIndex == data.length - 1) return;
      const nextID = data[currentIndex + 1].customerId;
      dispatch(setSelectedUser(nextID));
    },
    {
      preventDefault: true,
    }
  );
  useEffect(() => {
    const handleMouseMove = (event) => {
      setTimeout(() => {
        setIsNavigating(false);
      }, 1500);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex-col w-full h-full items-start overflow-x-auto ">
      <div
        aria-label="table"
        className="grid grid-flow-row w-full overflow-x-auto"
      >
        {Header}
        <div className="flex-col w-full h-full overflow-auto ">
          {isloading
            ? LoadingRows
            : data &&
              data.map((item, index) => (
                <TableRow
                  key={index}
                  item={item}
                  index={index}
                  isNavigating={isNavigating}
                />
              ))}
          <div className="flex flex-1 p-lg">
            <Paginator />
          </div>
        </div>
      </div>
    </div>
  );
};
