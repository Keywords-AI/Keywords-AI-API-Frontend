import React, { useState } from "react";
import { Button, User } from "src/components";

const StreamingTextTest = () => {
  const variants = [
    "primary",
    "header",
    "secondary",
    "secondary-gray",
    "secondary-black",
    "beta",
    "r4-white",
    "r4-gray-2",
    "r4-primary",
    "r4-red",
    "small",
    "r18-white",
    "r18-black",
    "panel",
    "careers",
    "chat",
    "icon",
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {variants.map((variant) => (
        <div>
          <Button
            key={variant}
            variant={variant}
            text={variant}
            onClick={() => console.log(`${variant} clicked!`)}
            icon={User}
            iconSize="md"
          />
        </div>
      ))}
    </div>
  );
};

export default StreamingTextTest;
