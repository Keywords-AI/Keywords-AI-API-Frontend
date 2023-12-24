import React from "react";
export function TitleStaticSubheading({ title, subtitle, align = "items-start" }) {
  return (
    <div className={"flex-col gap-xxs self-stretch " + align}>
      <span className="text-md-medium">{title}</span>
      {subtitle && <span className="text-sm text-gray-4">{subtitle}</span>}
    </div>
  );
}