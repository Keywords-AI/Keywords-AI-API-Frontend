import React from 'react'

export default function LargeTextTitle({ title, subtitle }) {
    return (
        <div className="flex-col gap-sm items-start self-stretch"
            style={{
                maxWidth: "1200px",
            }}
        >
            <div className="display-sm t-l">
                {title}
            </div>
            {subtitle &&
                <div className="text-lg t-l text-gray4">
                    {subtitle}
                </div>
            }
        </div>
    )
}
