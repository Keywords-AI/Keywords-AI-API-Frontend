import React from "react";
import { Arrow } from "src/assets/svgs.jsx";
import { useNavigate } from "react-router-dom";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

export default function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className="main-section-bottom bg-white" style={{ flexGrow: 1 }}>
      <div className="max-width-container">
        <div className="flex-col justify-center items-start gap-md self-stretch">
          <LargeTextTitle
            title="Get Started with a Plan"
            subtitle="You have not purchased access to API keys."
          />
          <button
            className="button-primary"
            onClick={() => navigate("/pricing")}
          >
            View pricing plans
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
