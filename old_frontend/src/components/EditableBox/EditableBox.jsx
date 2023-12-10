import React, { useState, useRef, useEffect } from "react";

function EditableBox({
  placeholder,
  value,
  handleInput,
  handleKeyDown,
  border = "none",
  streaming = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");
  const textareaRef = useRef(null);
  const divRef = useRef(null);
  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleDivClick = () => {
    setIsEditing(true);
  };

  const handleTextareaBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "1px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [text, isEditing]);

  useEffect(() => {
    if (textareaRef.current && streaming) {
      textareaRef.current.blur();
    }
  }, [streaming]);

  return (
    <div
      className="flex-col text-md self-stretch"
      style={{
        height: height,
      }}
      ref={divRef}
      onClick={handleDivClick}
    >
      {isEditing ? (
        <textarea
          className="flex-col text-md t-pre-wrap placeholder-gray3"
          placeholder={placeholder}
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onBlur={handleTextareaBlur}
          style={{
            height: "auto",
            padding: "0px",
            resize: "none",
            flexGrow: 1,
            outline: "none",
            border: border,
            backgroundColor: "transparent",
          }}
        />
      ) : (
        <div className="flex-col text-md t-pre-wrap">
          {text || <span className="text-gray3">{placeholder}</span>}
        </div>
      )}
    </div>
  );
}

export default EditableBox;
