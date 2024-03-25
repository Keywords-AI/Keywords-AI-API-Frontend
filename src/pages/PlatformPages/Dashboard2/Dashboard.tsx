import React, { useEffect } from "react";
import { AlphanumericKey, SideBarActive, SideBar } from "src/components";
import { DotsButton } from "src/components/Buttons";
import KeywordsLineChart from "src/components/Display/KeywordsLineChart";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";
import DashboardFilter from "./DashboardFilter";
import { useTypedDispatch } from "src/store/store";
import { getDashboardData } from "src/store/actions";
import MainChart from "./MainChart";

type Props = {};

export const Dashboard = ({}: Props) => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  return (
    <div className=" flex-col flex-1 self-stretch ">
      <TopBar />
      <MainChart />
    </div>
  );
};

const TopBar = () => {
  const urlParams = new URLSearchParams(location.search);
  const BCItems = [
    {
      label: "Dashboard",
      link: "/platform/dashboard",
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
    <div className="flex flex-row py-xs px-lg justify-between items-center self-stretch shadow-border shadow-gray-2 w-full h-[52px]">
      <div className="flex items-center gap-sm">
        <BCrumb items={BCItems} />
      </div>
      <div className="flex items-center gap-xxs">
        <DashboardFilter />
        <div className="w-[1px] h-[28px] shadow-border shadow-gray-2 "></div>
      </div>
    </div>
  );
};
