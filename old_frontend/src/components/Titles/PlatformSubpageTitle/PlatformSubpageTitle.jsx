import React from 'react'

export default function PlatformSubpageTitle({title, subtitle}) {
    return (
        <div className="flex-col items-start gap-lg t-l"
            style={{
                width: "800px"
            }}
        >
            <div className="display-sm flex1 self-stretch">
                {title}
            </div>
            {subtitle && <div className="text-md text-gray4">
                {subtitle}
            </div>}
        </div>
    )
}
