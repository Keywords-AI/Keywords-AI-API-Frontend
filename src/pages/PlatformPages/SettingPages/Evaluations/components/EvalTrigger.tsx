import React, { ForwardedRef, forwardRef } from "react";
import cn
 from "src/utilities/classMerge";
 import { format } from "date-fns";
 import { ModelTag, Tag } from "src/components/Misc";
 import { Pencil, Check } from "src/components/Icons";

export const EvalTrigger = forwardRef((
    { title, subtitle, updatedTime, isEnable, model, hover, setOpen, setHover }:{
    title: string;
    subtitle: string;
    updatedTime: Date;
    isEnable: boolean;   
    model: string;
    hover: boolean;
    setOpen: (value: boolean) => void;
    setHover: (value: boolean) => void;
    }, ref: ForwardedRef<any>
) => {
  return (
    <div
    ref={ref}
      className={cn(
        "flex-col py-xxs px-xs items-start gap-xxxs self-stretch bg-gray-1 shadow-border  rounded-sm cursor-pointer",
        "hover:bg-gray-2 hover:shadow-gray-3",
        "bg-gray-1 shadow-gray-2"
      )}
      onClick={() => {
        setOpen(true);
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        aria-label="top row"
        className="flex justify-between items-center self-stretch"
      >
        <div className="flex items-center gap-xxs text-sm-md text-gray-5">
          {title}
        </div>
        <div className="flex items-center gap-xs">
          <div className="flex items-center gap-xxs">
            <p className=" text-gray-4 caption">
              Updated {format(new Date(updatedTime), "M/dd/yyyy")}
            </p>
            <div className="flex items-center gap-xxxs">
              {isEnable && <ModelTag model={model} />}
              <Tag
                text={isEnable ? "Enabled" : "Disabled"}
                border="border-none"
                backgroundColor={isEnable ? "bg-success/10" : "bg-red/10"}
                textColor={isEnable ? "text-success" : "text-red"}
                icon={isEnable ? <Check fill="fill-success" /> : null}
              />
            </div>
          </div>
          <Pencil size="sm" active={hover} />
        </div>
      </div>
      <div
        aria-label="subtitle"
        className="max-w-[400px] caption w-full text-gray-4"
      >
        {subtitle}
      </div>
    </div>
  );
})
