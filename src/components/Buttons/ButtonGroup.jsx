import React, { useState } from 'react';
import { Button } from "src/components/Buttons";

export default function ButtonGroup({ buttons }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (button, index) => {
    button.onClick();
    setActiveButton(index);
  };

  return (
    <div className="flex-row bg-gray-black rounded-sm h-fit">
      {buttons.map((button, index) => (
        <Button 
          key={index}
          active={activeButton === index}
          variant="r4-black"
          {...button}
          onClick={() => handleClick(button, index)}
        />
      ))}
    </div>
  );
}