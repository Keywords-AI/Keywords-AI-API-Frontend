import React from "react";
export function TitleLanding({ title, subtitle, align = "items-center" }) {
    return (
        <div className={"flex-col gap-sm self-stretch " + align}>
            <p className="display-lg">{title}</p>
            {subtitle && <p className="text-lg text-gray-4">{subtitle}</p>}
        </div>
    );
}