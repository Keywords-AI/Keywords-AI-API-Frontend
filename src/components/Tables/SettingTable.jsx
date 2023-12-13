import React from 'react';
import cn from 'src/utilities/ClassMerge';

export default function SettingTable({ 
    headers, 
    headerLayout, 
    rows, 
    rowLayout, 
}) {
  const gridTemplateColumns = headers?.length ? `grid-cols-${headers.length}` : '';

  return (
    <div className="flex flex-col flex-1 list-display self-stretch">
      <div className={cn(
        "text-md text-gray-400 self-stretch grid gap-4", 
        headerLayout || gridTemplateColumns
      )}>
        {headers?.map((header, idx) => (
          <div className="grid-col" key={idx}>{header}</div>
        ))}
        <div className="grid-col"></div>
      </div>
      {rows?.map((row, idx) => (
        <div className={cn(
          "text-md text-black self-stretch grid gap-4", 
          rowLayout || gridTemplateColumns
        )} key={idx}>
          {rowIter?.map((header, idx) => (
            <div className="grid-col" key={idx}>{row[header]}</div>
          ))}
        </div>
      ))}
    </div>
  );
}