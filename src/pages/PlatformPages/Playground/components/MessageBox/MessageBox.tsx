import { set } from "date-fns";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from "react";
import { useTypedSelector } from "src/store/store";
import cn from "src/utilities/classMerge";

export interface MessageBoxProps {
  prop?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFoucs?: (e: any) => void;
  disabled?: boolean;
  onBlur?: () => void;
  blur?: boolean;
  index: number;
}

export const MessageBox = forwardRef(
  (
    {
      value,
      defaultValue,
      onChange,
      onKeyDown,
      onBlur,
      onFoucs,
      disabled,
      blur,
      index,
    }: MessageBoxProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    if (defaultValue == "\u200B") defaultValue = "";
    const setHeight = () => {
      if (!textAreaRef.current) return;
      const target = textAreaRef.current;
      target.style.height = "1px";
      target.style.height = target.scrollHeight + "px";
    };
    useImperativeHandle(ref, () => textAreaRef.current!, []);
    useEffect(() => {
      setHeight();
    }, [value, defaultValue]);
    useEffect(() => {
      if (!textAreaRef.current) return;
      if (!blur) return;
      const target = textAreaRef.current;
      target.blur();
      setHeight();
    }, [blur]);
    return (
      <textarea
        ref={textAreaRef}
        onBlur={() => {
          onBlur && onBlur();
        }}
        placeholder="Enter a message here"
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        onKeyDown={(e) => onKeyDown && onKeyDown(e)}
        onInput={(e) => {
          setHeight();
        }}
        onFocus={onFoucs}
        value={value}
        defaultValue={defaultValue}
        disabled={false}
        className={cn(
          "text-sm-regular flex w-full max-w-full whitespace-pre-line break-words text-wrap outline-none resize-none border-none bg-transparent  placeholder:text-gray-4 self-stretch <text-gray-5></text-gray-5> focus:text-gray-5 focus:shadow-border focus:shadow-gray-4 shadow-border shadow-gray-3",
          "px-xs py-xxs rounded-sm"
        )}
      ></textarea>
    );
  }
);
