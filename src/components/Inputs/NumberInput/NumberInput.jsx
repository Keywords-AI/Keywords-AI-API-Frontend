import React from "react";
import cn from "src/utilities/ClassMerge";

export function NumberInput({
  icon = null,
  iconClassName = "fill-gray-white",
  value,
  onChange = () => {},
  onClick = () => {},
  disabled = false,
  textClassName = "text-sm-md",
}) {
  return (
    <div
      className={cn(
        "flex w-full px-xs py-xxs items-center gap-xxs group rounded-sm",
        "border border-solid border-transparent hover:border-gray-3 hover:bg-gray-2 "
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-[16px] justify-center items-center gap-[10px]">
        {icon && React.createElement(icon, { fill: iconClassName })}
      </div>

      <input
        type="number"
        className={cn(
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none flex-grow bg-transparent max-w-[calc(100%-24px)]",
          textClassName
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
