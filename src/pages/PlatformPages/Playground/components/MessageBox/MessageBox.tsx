import { useEffect, useRef, useState } from "react";
import cn from "src/utilities/classMerge";

export interface MessageBoxProps {
  prop?: string;
  value?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  onBlur?: () => void;
}

export function MessageBox({
  value,
  onChange,
  onKeyDown,
  onBlur,
  disabled,
}: MessageBoxProps) {
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (!textAreaRef.current) return;
    const target = textAreaRef.current as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  }, []);
  return (
    <textarea
      ref={textAreaRef}
      onBlur={onBlur}
      placeholder="Enter a message..."
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      onKeyDown={(e) => onKeyDown && onKeyDown(e)}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = target.scrollHeight + "px";
      }}
      defaultValue={value}
      disabled={false}
      className={cn(
        "text-sm-regular flex w-full max-w-full whitespace-pre-line break-words outline-none resize-none border-none bg-transparent max-h-full placeholder:text-gray-4 "
      )}
    ></textarea>
  );
}
