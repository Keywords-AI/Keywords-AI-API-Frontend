import React from 'react';
import cn from 'src/utilities/ClassMerge';

export default function SettingTable({
    headers,
    headerLayout,
    rows,
    rowLayout,
    variant
}) {
    const gridTemplateColumns = headers?.length ? `grid-cols-${headers.length}` : '';
    switch (variant) {
        case 'billings':
            headers = ['Date', 'Amount', 'Payment ID'];
            headerLayout = 'grid-cols-[160px,160px,1fr]';
            rowLayout = 'grid-cols-[160px,160px,1fr,auto]';
            break;
        case 'api-keys':
            headers = ['Name', 'Key', 'Created', 'Last Used', '<#EditsLeft/>'];
            headerLayout = 'grid-cols-4';
            headerLayout = 'grid-cols-[1fr,120px,120px,120px,62px]';
            rowLayout = 'grid-cols-[1fr,120px,120px,120px,62px]';
            break;
    }
    return (
        <div className="flex flex-col flex-1 list-display self-stretch border border-gray-3 rounded-md w-[800px]">
            <div className={cn(
                "text-sm-md text-gray-4 self-stretch grid py-xs px-sm bg-gray-2",
                headerLayout || gridTemplateColumns
            )}>
                {headers?.map((header, idx) => (
                    <div className="grid-col" key={idx}>{header}</div>
                ))}
                <div className="grid-col"></div>
            </div>
            {rows?.map((row, idx) => (
                <div className={cn(
                    "text-md text-gray-white self-stretch grid px-sm py-xxs border-t border-gray-3",
                    rowLayout || gridTemplateColumns
                )} key={idx}>
                    {Object.keys(row)?.map((header, idx) => (
                        <div className="grid-col" key={idx}>{row[header]}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}