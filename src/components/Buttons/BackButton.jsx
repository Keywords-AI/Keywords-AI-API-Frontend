import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import React from "react";
import { ArrowLeft } from "../Icons";
export function BackButton({ text, link = -1 }) {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-start gap-[10px] self-stretch">
      <Button
        text={text}
        variant={"r18-black"}
        onClick={() => navigate(link)}
        icon={ArrowLeft}
        iconSize="xxs"
        iconFill="fill-gray-white"
      />
    </div>
  );
}
