import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Logo } from "src/assets/svgs";

export default function KeywordsLogo() {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <Logo />
      <span
        className={"text-black "}
        style={{
          textAlign: "center",
          fontFamily: "Inter",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "28px" /* or '140%' */,
        }}
      >
        Keywords AI
      </span>
    </div>
  );
}
