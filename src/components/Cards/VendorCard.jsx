import React from "react";
import { connect } from "react-redux";
import { Pencil } from "../Icons";
import { IconButton } from 'src/components/Buttons'

export const VendorCard = ({ company_name, model_count, company_logo }) => {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div className="flex items-center py-sm px-md justify-between w-[360px] min-w-[200px] border border-gray-3 rounded-sm cursor-pointer hover:border-gray-4"
        onClick={() => {setOpen(true);}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
    >
        <div className="flex items-center gap-xs">
            <div className="flex p-xxs items-center w-[40px] h-[40px] rounded-sm bg-gray-white">
                {company_logo}
            </div> 
            <div className="flex-column items-start">
                <div className="text-left text-md-medium ">{company_name}</div>
                <div className="text-sm-regular text-gray-4 text-center">{model_count} models activated</div>
            </div>
        </div>
      <IconButton
                icon={<Pencil active={isHovered}/>}
            />
    </div>
  );
};
