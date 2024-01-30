import React from "react";

export const UtilityButton = ({
  icon,
  text,
  clickedIcon,
  clickedText,
  handleClick,
}) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <button
      className="flex-row px-xxs py-xxxs gap-xxs items-center justify-center bg-white"
      style={{ border: "0.5px solid var(--gray-4, #3E424A)" }}
      onClick={() => {
        setClicked(true);
        handleClick();
      }}
    >
      <div>{clicked ? clickedIcon : icon}</div>
      <span className="text-sm">{clicked ? clickedText : text}</span>
    </button>
  );
};
