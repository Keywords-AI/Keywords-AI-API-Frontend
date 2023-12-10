import React from "react";
export function TitleStaticSubheading({ title, subtitle, align = "items-start" }) {
  return (
    <div className={"flex-col gap-xxs self-stretch " + align}>
      <p className="text-md-medium">{title}</p>
      {subtitle && <p className="text-sm text-gray-4">{subtitle}</p>}
    </div>
  );
}