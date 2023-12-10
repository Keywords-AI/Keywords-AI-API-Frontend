import React from "react";
import { Stop, Send } from "src/assets/svgs";
import EditableBox from "src/components/EditableBox/EditableBox";

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
  const [focus, setFocus] = React.useState(false);
  React.useEffect(() => {
    if (spanRef.current && value) {
      spanRef.current.innerText = value;
    } else if (spanRef.current) {
    }
  }, [value]);
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
      }}
    >
      <span
        className={"text-input bg-white t-pre-wrap text-sm text-black"}
        role="textbox"
        contentEditable={!streaming}
        suppressContentEditableWarning={true} // could be dangerous, should keep an eye on this
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        ref={spanRef}
        style={{
          textAlign: "left",
          wordBreak: "break-word",
        }}
      >
        {streaming ? <span className="text-gray3">Generating...</span> : ""}
      </span>
      {streaming ? (
        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "7px",
          }}
          onClick={() => {
            handleStop();
          }}
          className="hover-cp"
        >
          <Stop />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "7px",
          }}
          className="hover-cp"
          onClick={() => {
            handleSend(spanRef.current);
          }}
        >
          <Send />
        </div>
      )}
    </div>
  );
}
