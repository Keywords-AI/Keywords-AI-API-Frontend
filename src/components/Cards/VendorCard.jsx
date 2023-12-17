import React from "react";
import { connect } from "react-redux";
import { Pencil } from "../Icons";

export const VendorCard = ({ company_name, model_count }) => {
  const [open, setOpen] = React.useState(false);
  const { icon } = props;
  return (
    <div className="flex items-center py-sm px-md justify-between w-[360px] min-w-[200px] border border-gray-3 rounded-sm"
        onClick={() => {setOpen(true);}}
    >
      <div className="flex-column items-start">
        <div className="text-center text-md-medium ">{company_name}</div>
        <div className="text-sm-regular text-gray4 text-center">{model_count} active models</div>
      </div>
      <IconButton
                icon={<Pencil />}
            />
    </div>
  );
};
