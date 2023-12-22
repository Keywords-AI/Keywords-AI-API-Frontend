import React from "react";
import cn from "src/utilities/classMerge";
export const Divider = React.forwardRef(({ color = "bg-gray-2" }, ref) => {
  return <div ref={ref} className={cn("h-[1px] w-full", color)}></div>;
});
