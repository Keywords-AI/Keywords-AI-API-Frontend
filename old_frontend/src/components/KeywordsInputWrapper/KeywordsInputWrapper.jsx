import React from "react";

export const KeywordsInputWrapper = ({ title, children }) => {
  return (
    <div className="flex-col gap-xxs stretch">
      {title && <p className="text-sm t-gray4 m-0">{title}</p>}
      {children}
    </div>
  );
};
