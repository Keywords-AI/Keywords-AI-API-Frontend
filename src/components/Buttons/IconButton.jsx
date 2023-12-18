import React from "react";

const IconButton = React.forwardRef(({ onClick, icon, className = "", onMouseEnter, onMouseLeave }, ref) => {
  return (
    <div
      aria-label="IconButton"
      ref={ref}
      className={"flex flex-shrink-0 cursor-pointer " + className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {icon}
    </div>
  );
})

export default IconButton;