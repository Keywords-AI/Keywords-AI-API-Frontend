import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import cn from "src/utilities/classMerge";

export interface MessageBoxProps {
  prop?: string;
  value?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  onBlur?: () => void;
  blur?: boolean;
}

export function MessageBox({
  value,
  onChange,
  onKeyDown,
  onBlur,
  disabled,
  blur,
}: MessageBoxProps) {
  const textAreaRef = useRef(null);
  const setHeight = () => {
    if (!textAreaRef.current) return;
    const target = textAreaRef.current as HTMLTextAreaElement;
    target.style.height = "1px";
    target.style.height = target.scrollHeight + "px";
  };
  useEffect(() => {
    setHeight();
  }, [value]);
  useEffect(() => {
    if (!textAreaRef.current) return;
    if (!blur) return;
    const target = textAreaRef.current as HTMLTextAreaElement;
    target.blur();
    setHeight();
  }, [blur]);
  return (
    <textarea
      ref={textAreaRef}
      onBlur={onBlur}
      placeholder="Enter a message..."
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      onKeyDown={(e) => onKeyDown && onKeyDown(e)}
      onInput={(e) => {
        setHeight();
      }}
      value={value}
      disabled={false}
      className={cn(
        "text-sm-regular flex w-full max-w-full whitespace-pre-line break-words text-wrap outline-none resize-none border-none bg-transparent  placeholder:text-gray-4 "
      )}
    ></textarea>
  );
}
