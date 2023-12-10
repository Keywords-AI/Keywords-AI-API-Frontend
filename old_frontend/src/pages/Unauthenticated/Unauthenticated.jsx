import React from "react";
import { Arrow } from "src/assets/svgs.jsx";
import { useNavigate } from "react-router-dom";
import LargeTextTitle from "src/components/Titles/LargeTextTitle/LargeTextTitle";

export default function Unauthenticated() {
  const navigate = useNavigate();
  return (
    <div
      className="main-section-bottom bg-white"
      style={{
        flexGrow: 1,
      }}
    >
      <div className="max-width-container">
        <div className="flex-col justify-center items-start gap-md self-stretch">
          <LargeTextTitle
            title="Authentication Required"
            subtitle="Please log in to access this page."
          />
          <div className="flex-row justify-start items-start gap-xs self-stretch">
            <button
              className="button-primary "
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </button>
            <button
              className="button-secondary-gray"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
