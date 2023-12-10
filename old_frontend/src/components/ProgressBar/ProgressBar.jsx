import React from 'react'
import { ColorTile } from 'src/assets/svgs'

export default function ProgressBar({
    name,
    current,
    total,
    progressColor,
    remainColor,
    progressLegend,
    remainLegend }) {
    return (
        <div className="flex-col gap-xxs items-start self-stretch">
            <div className="flex-row gap-lg self-stretch text-sm text-gray4">
                <span
                    style={{  
                        width: "120px"
                    }}
                >
                    {name}
                </span>
                <div className="flex-row gap-sm items-center text-gray4">
                    <div className="flex-row items-center gap-xxs">
                        <ColorTile fill={progressColor} />
                        <span>
                            {progressLegend}
                        </span>
                    </div>
                    <div className="flex-row items-center gap-xxs text-gray4">
                        <ColorTile fill={remainColor} />
                        <span>
                            {remainLegend}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex-row items-center self-stretch space-between">
                <div
                    style={{
                        width: "70%",
                        height: "16px",
                        backgroundColor: remainColor
                    }}
                >
                    <div
                        style={{
                            width: `${Math.floor((current / total) * 100)}%`,
                            backgroundColor: progressColor,
                            height: "100%"
                        }}
                    ></div>
                </div>
                <span className={"text-gray4"} style={{
                    color: progressColor
                }}>
                    {current?.toLocaleString()} / {total?.toLocaleString()}
                </span>
            </div>
        </div>
    )
}
