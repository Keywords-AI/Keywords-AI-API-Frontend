import React, { useRef } from "react";
import cn from "src/utilities/classMerge";

export function NumberInput({
  icon = null,
  iconClassName = "fill-gray-4",
  value,
  onChange = () => {},
  onClick = () => {},
  disabled = false,
  textClassName = "text-sm-md text-gray-4",
}) {
  const inputRef = useRef(null);

  const handleDivClick = () => {
    onClick();
    if (!disabled) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex w-full px-xs py-xxs items-center gap-xxs group rounded-sm",
        "shadow-border shadow-transparent hover:shadow-gray-3 hover:bg-gray-2 hover:cursor-pointer"
      )}
      onClick={handleDivClick}
    >
      <div className="flex-shrink-0 w-[16px] justify-center items-center gap-[10px]">
        {icon && React.createElement(icon, { fill: iconClassName })}
      </div>

      <input
        ref={inputRef}
        type="number"
        className={cn(
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none flex-grow bg-transparent max-w-[calc(100%-24px)]",
          textClassName
        )}
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          const truncatedValue = inputValue.slice(0, 4);
          onChange(truncatedValue);
        }}
        disabled={disabled}
      />
    </div>
  );
}
