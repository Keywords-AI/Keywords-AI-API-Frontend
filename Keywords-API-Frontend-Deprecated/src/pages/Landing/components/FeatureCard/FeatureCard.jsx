import React from 'react'
import "./style.css"
export default function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex-col items-center"
            style={{
                gap: "24px",
                flex: "1 0 280px"
            }}
        >
            {icon}
            <div className="flex-col gap-xs items-center">
                <div className="display-xs">
                    {title}
                </div>
                <div className="text-md t-c">
                    {description}
                </div>
            </div>
        </div>
    )
}
