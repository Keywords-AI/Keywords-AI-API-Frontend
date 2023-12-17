import React from "react";
import cn from "src/utilities/ClassMerge";

export default function SettingTable({
  headers,
  headerLayout,
  rows,
  rowLayout,
  variant,
  columnNames,
}) {
  const gridTemplateColumns = headers?.length
    ? `grid-cols-${headers.length}`
    : "";
  let rowIterator = columnNames || (rows?.[0] && Object.keys(rows[0]));
  switch (variant) {
    case "billings":
      headers = ["Date", "Amount", "Payment ID"];
      headerLayout = "grid-cols-[160px,160px,1fr]";
      rowLayout = "grid-cols-[160px,160px,1fr,auto]";
      break;
    case "api-keys":
      headers = ["Name", "Key", "Created", "Last Used"];
      headerLayout = "grid-cols-4";
      headerLayout = "grid-cols-[1fr,120px,120px,120px,62px]";
      rowLayout = "grid-cols-[1fr,120px,120px,120px,62px]";
      break;
  }
  return (
    <div
      className="flex flex-col self-stretch border border-gray-3 rounded-md 
        w-full max-w-[1100px]"
    >
      <div
        className={cn(
          "text-sm-md text-gray-4 self-stretch grid py-xs px-sm bg-gray-2 rounded-t-md",
          headerLayout || gridTemplateColumns
        )}
      >
        {headers?.map((header, idx) => (
          <div className="flex-row justify-start items-center" key={idx}>
            {header}
          </div>
        ))}
        <div className="grid-col"></div>
      </div>
      {rows?.map((row, idx) => (
        <div
          className={cn(
            "text-sm text-gray-4 self-stretch grid px-sm py-xxs border-t border-gray-3",
            rowLayout || gridTemplateColumns
          )}
          key={idx}
        >
          {rowIterator?.map((header, idx) => (
            <div className="flex-row justify-start items-center" key={idx}>{row[header]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
