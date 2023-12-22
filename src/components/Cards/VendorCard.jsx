import React from "react";
import { connect } from "react-redux";
import { Pencil, Ellipse } from "src/components/Icons";
import { IconButton } from 'src/components/Buttons'

export const VendorCard = React.forwardRef(({ companyName, modelCount, companyLogo, setOpen = () => { }, active }, forwardedRef) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="flex items-center py-sm px-md justify-between w-[360px] bg-gray-2 min-w-[200px] shadow-border shadow-gray-3 rounded-sm cursor-pointer hover:shadow-gray-4"
      onClick={() => setOpen(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={forwardedRef}
    >
      <div className="flex flex-row items-center gap-xs">
        <div className="flex-col relative">
          <IconButton
          className="absolute -top-xxxs -right-xxxs"
            icon={Ellipse}
            iconProps={{ active }}
          />

          <div className="flex p-xxs items-center w-[40px] h-[40px] rounded-sm bg-gray-white">
            {companyLogo}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-left text-md-medium ">{companyName}</span>
          <span className="text-sm-regular text-gray-4 text-center">{modelCount} models activated</span>
        </div>
      </div>
      <IconButton
        icon={Pencil}
        active={isHovered}
      />
    </div>
  );
});
