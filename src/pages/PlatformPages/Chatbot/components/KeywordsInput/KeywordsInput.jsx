import React from "react";
import { Stop, Send } from "src/components/Icons";
import { EditableBox } from "src/components/Inputs/EditableBox/EditableBox";
import {IconButton} from "src/components/Buttons";

export default function KeywordsInput({
  placeholder,
  handleStop,
  streaming,
  handleInput,
  handleKeyDown,
  handleSend,
  abortController,
  value,
}) {
  const spanRef = React.useRef(null);
  React.useEffect(() => {
    if (spanRef.current && value) {
      spanRef.current.innerText = value;
    } else if (spanRef.current) {
    }
  }, [value]);
  return (
    <div className="relative flex w-full">
      <EditableBox 
        className={"border border-solid border-white rounded-sm text-sm p-xxs " + (streaming ? "text-gray-3 bg-gray-2" : "bg-gray-black ")}
        placeholder={placeholder}
        text={streaming? "Generating":value}
      />
      {streaming ? (
        <IconButton
          icon={<Stop />}
          onClick={() => {
            handleStop();
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      ) : (
        <IconButton
          icon={<Send />}
          onClick={() => {
            handleSend(spanRef.current);
          }}
          className="absolute right-xs bottom-[11px] cursor-pointer"
        />
      )}
    </div>
  );
}
