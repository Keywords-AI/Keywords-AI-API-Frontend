import React, { useImperativeHandle } from "react";
import cn from "src/utilities/classMerge";
import { useState, useEffect, useRef } from "react";
import useForwardRef from "src/hooks/useForwardRef";
export const EditableBox = React.forwardRef(
  (
    {
      register = () => {},
      name,
      validationSchema,
      placeholder,
      value,
      handleInput = () => {},
      onKeyDown,
      onChange = () => {},
      streaming = false,
      type = "text",
      className,
      focus = false,
      selectPrevious = false,
      borderless = true,
      disabled = false,
    },
    forwardedRef
  ) => {
    const textareaRef = useForwardRef(forwardedRef);
    const [isEditing, setIsEditing] = useState(focus);
    const [text, setText] = useState(value || "");
    const divRef = useRef(null);
    const [height, setHeight] = useState("auto");

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "1px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        setHeight(`${textareaRef.current.scrollHeight + 2}px`);
      }
    }, [text, isEditing]);

    useEffect(() => {
      if (isEditing && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [isEditing]);

    useEffect(() => {
      if (focus) {
        setIsEditing(true);
      }
    }, [focus]);

    const handleFocus = () => {
      const valueLength = textareaRef.current.value.length;
      if (selectPrevious) {
        textareaRef.current.setSelectionRange(0, valueLength);
      } else {
        textareaRef.current.setSelectionRange(valueLength, valueLength);
      }
    };

    const handleDivClick = () => {
      setIsEditing(true);
    };

    const handleTextareaBlur = () => {
      setIsEditing(false);
    };

    const handleChange = (e) => {
      setText(e.target.value);
      onChange(e);
    };

    useEffect(() => {
      setText(value);
    }, [value]);

    useEffect(() => {
      if (textareaRef.current && streaming) {
        textareaRef.current.blur();
      }
    }, [streaming]);

    return (
      <div
        className={cn(
          "w-full h-full flex-col self-stretch flex-grow rounded-sm border",
          borderless
            ? "border-none"
            : focus || isEditing
            ? "border-gray-4"
            : "border-gray-3"
        )}
        ref={divRef}
        onClick={handleDivClick}
        style={{ height }}
      >
        <textarea
          className={cn(
            "resize-none outline-none whitespace-pre-wrap bg-transparent h-auto text-sm-regular text-gray-white placeholder-gray-4",
            className
          )}
          placeholder={placeholder}
          ref={textareaRef}
          name={name}
          // For react form register to work
          // need to have name prop
          // onChange from parent need to be called
          {...register(name, validationSchema)}
          value={text}
          onChange={handleChange}
          onInput={handleInput}
          onKeyDown={onKeyDown}
          onBlur={handleTextareaBlur}
          onFocus={handleFocus}
          readOnly={disabled}
          rows={1}
          onResize={(e) => {
            e.target.style.height = "1px"; // Reset height to a small value before reading scrollHeight
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
    );
  }
);
