import React, { useEffect, forwardRef, ForwardedRef } from "react";
import { ModelTag } from "src/components/Misc";
import { useTypedSelector } from "src/store/store";

type Props = {};

const UserPane = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const userLogs = useTypedSelector((state) => state.usersPage.usersLogData);
  const selectedID = useTypedSelector((state) => state.usersPage.selectedID);
  const selectedUser = selectedID
    ? userLogs.find((user) => user.customerId === selectedID)
    : userLogs[0];
  let options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const displayObj = [
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Customer ID</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.customerId}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">
          Customer Name
        </div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.name || "N/A"}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Last active</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.lastActive
            ? `${new Date(selectedUser?.lastActive)
                .toLocaleString("en-US", options)
                .replace(",", " at")}`
            : "N/A"}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Top model</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {<ModelTag model={selectedUser?.topModel || "None"} />}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Cache hits</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.cacheHits || "-"}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Total tokens</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.tokens || "-"}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">Total costs</div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.cost ? "$" + selectedUser?.cost : "-"}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-xxs text-sm-md">
          Average generation time
        </div>
      ),
      value: (
        <div className="text-sm-regular text-gray-4">
          {selectedUser?.averageLatency
            ? +selectedUser?.averageLatency + "s"
            : "-"}
        </div>
      ),
    },
  ];

  return (
    <div className="flex-col py-sm px-lg items-start gap-xs self-stretch" ref={ref}>
      {displayObj.map((item, index) => (
        <div className="flex h-md justify-between items-center self-stretch" key={index}>
          {item.title}
          {item.value}
        </div>
      ))}
    </div>
  );
});

export default UserPane;
