import React from "react";

export default function Paragraph({ title, text }) {
    return (
        <div className="flex-col items-start gap-sm self-stretch" style={{gap: "16px"}}>
            {title && <div className="display-xs text-black">
                {title}
            </div>}
            {Array.isArray(text) ? text.map((para, idx) => (
                <div key={idx} className="text-md text-gray4 flex-col self-stretch t-pre-wrap items-start t-l">
                    {para}
                </div>
            )) : (
                <div className="text-md text-gray4 flex-col self-stretch t-pre-wrap items-start t-l">
                    {text}
                </div>
            )}
        </div>
    )
}
