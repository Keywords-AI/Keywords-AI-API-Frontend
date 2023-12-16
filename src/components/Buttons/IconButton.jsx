import React from "react";

export default function IconButton({ onClick, icon, className = "", onMouseEnter, onMouseLeave }) {
  return (
    <button
      aria-label="IconButton"
      className={"flex flex-shrink-0 " + className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
}
