import React from "react";


const IconButton = React.forwardRef(({ onClick, icon, className = "", onMouseEnter=()=>{}, onMouseLeave=()=>{}, hoverFill="fill-gray-white", fill="fill-gray-3", iconProps={}}, ref) => {
  const [hover, setHover] = React.useState(false);
  const handleHover = (e) => {
    onMouseEnter(e); 
    setHover(true);
    
  }
  const handleUnhover = (e) => {
    onMouseLeave(e);
    setHover(false);
  }
  return (
    <div
      aria-label="IconButton"
      ref={ref}
      className={"flex flex-shrink-0 cursor-pointer " + className}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnhover}
      onClick={onClick}
    >
                {React.createElement(icon, {
                  fill: hover ? hoverFill : fill,
                  ...iconProps
                })}
    </div>
  );
})

export default IconButton;