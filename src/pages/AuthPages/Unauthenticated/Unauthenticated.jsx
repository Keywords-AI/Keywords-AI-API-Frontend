import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { googleAuthJWT } from "src/store/actions";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TitleAuth } from "src/components/Titles";
import { useNavigate, useLocation } from "react-router-dom";

export function Unauthenticated() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    googleAuthJWT();
  }, []);
  return (
    <div className="flex-col items-center gap-xxxl justify-center self-stretch">
      <BackButton text="Home" link="/" />
      <div className="flex-col w-full max-w-[420px] items-center gap-md ">
        {(location.search) ?
          <>
            <TitleAuth
              title="Social Authentication in Progress..."
              subtitle="You will be redirected soon."
              align="items-center"
            />
          </>
          :
          <>
            <TitleAuth
              title="Authentication Required"
              subtitle="Please log in to access this page."
              align="items-center"
            />
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
          </>

        }
      </div>
    </div>
  );
}
