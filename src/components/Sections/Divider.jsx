import React from "react";
import cn from "src/utilities/ClassMerge";
export function Divider({ color = "bg-gray-2" }) {
  return <div className={cn("h-[1px] w-full", color)}></div>;
}
