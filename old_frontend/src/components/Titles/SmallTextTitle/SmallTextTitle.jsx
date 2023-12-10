import React from 'react'

export default function SmallTextTitle({ title, subtitle }) {
    return (
        <div className="flex-col items-start gap-xxs t-l"
            style={{
                width: "800px"
            }}
        >
            <div className="display-sm">
                {title}
            </div>
            {subtitle && <div className="text-sm text-gray4">
                {subtitle}
            </div>}
        </div>
    )
}
