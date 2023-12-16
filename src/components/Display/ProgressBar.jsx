import React from 'react'

const ColorTile = ({ colorClass = "bg-gray-white" }) => {
    return (
        <div className={"w-xs h-xs flex-shrink-0 border border-gray-3 rounded-sm " + colorClass} ></ div>
    )
}

export default function ProgressBar({
    name,
    current,
    total,
    progressColorClass,
    remainColorClass,
    progressLegend,
    remainLegend,
    display = () => { },
}) {
    return (
        <div className="flex-col gap-xxs items-start self-stretch">
            <div className="flex-row gap-lg self-stretch text-sm text-gray-4 w-xxxl whitespace-nowrap">
                <span>
                    {name}
                </span>
                <div className="flex-row gap-sm items-center text-gray-4">
                    <div className="flex-row items-center gap-xxs">
                        <ColorTile colorClass={progressColorClass} />
                        <span>
                            {progressLegend}
                        </span>
                    </div>
                    <div className="flex-row items-center gap-xxs text-gray4">
                        <ColorTile colorClass={remainColorClass} />
                        <span>
                            {remainLegend}
                        </span>
                    </div>
                </div>
            </div>
            <div className={"flex-row items-center self-stretch justify-between"}>
                <div className={"w-[70%] h-sm border border-gray-3 rounded-sm first-line:" + remainColorClass}>
                    <div className={"h-full rounded-sm " + progressColorClass
                    }
                        style={{ width: `${Math.floor((current / total) * 100)}%` }}
                    ></div>
                </div>
                <span className={"text-gray4"} style={{
                    color: progressColorClass
                }}>
                    {display(current?.toLocaleString(), total?.toLocaleString())}
                </span>
            </div>
        </div>
    )
}
