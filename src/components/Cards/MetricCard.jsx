import React, {useState} from "react";
import { Quality, Up } from "../Icons";

export default function MetricCard({icon: Icon, title, number, percentage}) {
  return (
    <div className="p-md bg-gray-2 border border-gray-3 rounded-sm w-full flex flex-row items-end h-fit">
      <div className="flex flex-col w-full gap-xxs">
        <div className="flex flex-row gap-xxs items-center">
          {Icon && <Icon />}
          <div className="text-sm-md text-gray-4">{title}</div>
        </div>
        <div className="display-sm text-gray-white">{number}</div>
      </div>
      <div className="gap-xxs flex flex-row items-center justify-center bg-gray-black rounded-lg h-fit px-xxs py-xxxs">
        <Up size="xxs" fill="fill-success"></Up>
        <div className="text-success text-sm-md">{percentage}%</div>
      </div>
    </div>
  );
}
