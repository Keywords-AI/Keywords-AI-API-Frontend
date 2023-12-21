import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import React from "react";
import { Dots } from "../Icons";
import cn from 'src/utilities/classMerge';

export function DotsButton({onclick}) {
  
  return (
    <div className="flex flex-col items-start gap-[10px] self-stretch justify-center">
      <Button
        variant={"icon"}
        // onClick={() => navigate(link)}
        // onClick={() => setOpen(!open)}
        onclick={onclick}
        icon={Dots}
        borderColor="shadow-transparent"
        borderHoverColor="shadow-transparent"
        bgColor="bg-gray-black"
      />
    </div>
  );
}
