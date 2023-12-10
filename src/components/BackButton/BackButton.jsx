import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ArrowLeft } from "src/components/icons";
import React from "react";
export function BackButton({ text, link = -1 }) {
  const navigate = useNavigate();
  return (
    <div className="flex-col items-start gap-[10px] self-stretch">
      <Button
        text={text}
        variant={"button-18-blackgit"}
        onClick={() => navigate(link)}
        icon={ArrowLeft}
      />
    </div>
  );
}
