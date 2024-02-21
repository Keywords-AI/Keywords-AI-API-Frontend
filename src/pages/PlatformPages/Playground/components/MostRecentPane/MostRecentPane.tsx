import React, { forwardRef } from 'react';

export interface MostRecentPaneProps {
  prop?: string;
}

export const MostRecentPane = forwardRef<HTMLDivElement, MostRecentPaneProps>(
  ({ prop = "default value" }, ref) => {
    return <div ref={ref}></div>;
  }
);

const LogCard = ({ displayObj }) => {
  return (
    <div className="flex-col px-lg ly-md items-start gap-xs self-stretch">
      {displayObj.map((item, index) => (
        <div
          key={index}
          className="flex h-[24px] items-center justify-between self-stretch"
        >
          {item.title}
          {item.value}
        </div>
      ))}
    </div>
  );
};
