// import cn from "src/utilities/ClassMerge";
// import { useState, useEffect, useRef } from "react";
// export const EditableBox = ({
//   placeholder,
//   value,
//   handleInput,
//   handleKeyDown,
//   streaming = false,
//   onChange,
//   type = "text",
//   className,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [text, setText] = useState(value || "");
//   const textareaRef = useRef(null);
//   const divRef = useRef(null);
//   const [height, setHeight] = useState("auto"); // <-- Add state for height
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "1px";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//       setHeight(`${textareaRef.current.scrollHeight}px`);
//     }
//   }, [text, isEditing]);
//   useEffect(() => {
//     if (isEditing && textareaRef.current) {
//       textareaRef.current.focus();
//     }
//   }, [isEditing]);

//   const handleDivClick = () => {
//     setIsEditing(true);
//   };

//   const handleTextareaBlur = () => {
//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     const value =
//       type === "number"
//         ? e.target.value.replace(/[^0-9]/g, "")
//         : e.target.value;
//     setText(value);
//     if (onChange) {
//       onChange(value);
//     }
//   };

//   useEffect(() => {
//     setText(value);
//   }, [value]);

//   useEffect(() => {
//     if (textareaRef.current && streaming) {
//       textareaRef.current.blur();
//     }
//   }, [streaming]);

//   return (
//     <div
//       className="w-full h-full flex-col self-stretch flex-grow overflow-hidden"
//       ref={divRef}
//       onClick={handleDivClick}
//     >
//       {isEditing ? (
//         <textarea
//           className={cn(
//             "flex-grow resize-none outline-none whitespace-pre-wrap bg-transparent h-auto",
//             className
//           )}
//           placeholder={placeholder}
//           ref={textareaRef}
//           value={text}
//           onChange={handleChange}
//           onInput={handleInput}
//           onKeyDown={handleKeyDown}
//           onBlur={handleTextareaBlur}
//           rows={1}
//           onResize={(e) => {
//             e.target.style.height = "1px"; // Reset height to a small value before reading scrollHeight
//             e.target.style.height = `${e.target.scrollHeight}px`;
//           }}
//         />
//       ) : (
//         <div
//           className={cn(
//             "flex-grow resize-none outline-none whitespace-pre-wrap",
//             className,
//             !text && "text-gray-4"
//           )}
//         >
//           {text || placeholder}
//           {/* Display placeholder text when text is empty */}
//         </div>
//       )}
//     </div>
//   );
// };
import React from "react";
import cn from "src/utilities/ClassMerge";
import { useState, useEffect, useRef } from "react";
import { set } from "react-hook-form";
export const EditableBox = React.forwardRef(
  (
    {
      placeholder,
      value,
      handleInput,
      handleKeyDown,
      streaming = false,
      onChange,
      type = "text",
      className,
      focus = false,
      selectPrevious = false,
    },
    forwardRef
  ) => {
    const [isEditing, setIsEditing] = useState(focus);
    const [text, setText] = useState(value || "");
    const textareaRef = useRef(null);
    const divRef = useRef(null);
    const [height, setHeight] = useState("auto"); // <-- Add state for height

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "1px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        setHeight(`${textareaRef.current.scrollHeight}px`);
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
      const value =
        type === "number"
          ? e.target.value.replace(/[^0-9]/g, "")
          : e.target.value;
      setText(value);
      if (onChange) {
        onChange(value);
      }
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
        className="w-full h-full flex-col self-stretch flex-grow overflow-hidden"
        ref={divRef}
        onClick={handleDivClick}
      >
        {isEditing && !streaming ? (
          <textarea
            className={cn(
              "flex-grow resize-none outline-none whitespace-pre-wrap bg-transparent h-auto text-sm",
              className
            )}
            placeholder={placeholder}
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleTextareaBlur}
            onFocus={handleFocus}
            rows={1}
            onResize={(e) => {
              e.target.style.height = "1px"; // Reset height to a small value before reading scrollHeight
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        ) : (
          <div
            className={cn(
              "flex-grow whitespace-pre-wrap text-sm",
              className,
              !text && "text-gray-4"
            )}
          >
            {text || placeholder}
            {/* Display placeholder text when text is empty */}
          </div>
        )}
      </div>
    );
  }
);
