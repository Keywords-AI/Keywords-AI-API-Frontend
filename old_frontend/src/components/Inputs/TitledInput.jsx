import React from 'react'

export default function TitledInput({ lable, placeholder, value, onChange, type, className, style }) {
    return (
        <div className="flex-col gap-xxs items-start self-stretch flex-1  ">
            <div className="text-sm text-gray4">
                {lable}
            </div>
            <input
                type={type || "text"}
                className={"text-md" + " " + (className || "")}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                style={style}
            />
        </div>
    )
}
