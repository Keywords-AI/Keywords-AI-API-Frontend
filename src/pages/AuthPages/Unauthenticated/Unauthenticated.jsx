import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { googleAuthJWT } from "src/store/actions";
import React, { useEffect } from "react";
import { Right } from "src/components";
import { useLocation } from "react-router-dom";

export function Unauthenticated() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    googleAuthJWT();
  }, []);
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" link="/" />
      <div className="flex-col w-full max-w-[420px] items-center gap-md ">
        <div
          aria-label="section title"
          className="flex-col items-center gap-xxs self-stretch "
        >
          <div className="display-xs text-gray-5">
            Authentication Required
          </div>
          <div className="text-md-regular text-gray-4">
            Please log in to access this page.
          </div>
        </div>
        <div className="flex justify-center items-center gap-md self-stretch">
          <Button
            text="Login"
            variant={"r18-white"}
            onClick={() => {
              navigate("/login");
            }}
          />
          <Button
            text="Sign up"
            variant={"header"}
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </div>
    </div>
  );
}
