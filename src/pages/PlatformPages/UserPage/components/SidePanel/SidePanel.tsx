import { useEffect, useState } from "react";
import { TabProps, Tabs } from "src/components/Sections/Tabs/Tabs";
import { useTypedSelector } from "src/store/store";
import UserPane from "./UserPane";
import Tooltip from "src/components/Misc/Tooltip";
import { AlphanumericKey, Compare } from "src/components";
import { CopyButton, DotsButton } from "src/components/Buttons";
import { setJsonMode } from "src/store/actions";

export interface SidePanelProps {}

export function SidePanel({}: SidePanelProps) {
  const pages: TabProps[] = [
    {
      value: "User",
      content: <UserPane />,
      buttonVariant: "text",
    },
  ];
  const userLog = useTypedSelector((state) => {
    return (
      state.usersPage.usersLogData.find(
        (user) => user.customerId === state.usersPage.selectedID
      ) || {}
    );
  });
  const headerRight = (
    <div className="flex items-center">
      <CopyButton text={JSON.stringify(userLog)} />
    </div>
  );
  const [tab, setTab] = useState("User");
  return (
    <Tabs
      rootClassName={
        "flex-col shrink-0 w-[400px] items-start self-stretch shadow-border-l shadow-gray-2 bg-gray-1"
      }
      headerRight={headerRight}
      headerClassName="flex px-lg py-xxs justify-between  w-[inherit] items-center shadow-border-lb shadow-gray-2  bg-gray-1  h-[44px]"
      tabs={pages}
      value={tab}
      onValueChange={setTab}
    />
  );
}

const userPane = () => {};
