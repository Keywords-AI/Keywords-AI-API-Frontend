import React from "react";
export function TitleAuth({ title, subtitle, align = "items-start" }) {
  return (
    <div className={"flex-col gap-xxs self-stretch " + align}>
      <p className="display-xs">{title}</p>
      {subtitle && <p className="text-md-regular text-gray-4">{subtitle}</p>}
    </div>
  );
}
