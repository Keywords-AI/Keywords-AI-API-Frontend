import { useNavigate } from "react-router-dom";
import { BackButton } from "src/components/Buttons/BackButton";
import { Button } from "src/components/Buttons/Button";
import { AuthenticationTitle } from "src/components/Titles";
import { useDispatch } from "react-redux";
import { logout } from "src/store/actions";

import React, { useEffect } from "react";
import { TextInput, SelectInput } from "src/components/Inputs";

export function OptimizeCosts() {
  const dispatch = useDispatch(); // Get the dispatch function

  const handleBackButtonClick = () => {
    dispatch(logout()); // Dispatch the logout action
    console.log("User logged out");
    window.location.href = "https://keywordsai.co";
  };

  return (
    <div className="flex flex-col items-center gap-xxxl justify-center self-stretch">
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <BackButton text="Log out" onClick={handleBackButtonClick} />
      </div>
      <div className="flex flex-col w-full max-w-[420px] items-center gap-lg justify-center">
        <AuthenticationTitle
          title="Optimize costs"
          subtitle="Set your target budget for LLM usage."
        />
        <div className="flex flex-col items-center justify-center gap-md self-stretch">
          <div className="flex flex-col justify-start gap-sm self-stretch ">
            <SelectInput
              title="Monthly LLM spending"
              placeholder="Please select"
              choices={[
                {
                  name: (
                    <span>
                      $0 - $100{" "}
                      <span className="text-gray-4/40 text-sm-regular">
                        /month
                      </span>
                    </span>
                  ),
                  value: "$0 - $100",
                },
                {
                  name: (
                    <span>
                      $100 - $500{" "}
                      <span className="text-gray-4/40 text-sm-regular">
                        /month
                      </span>
                    </span>
                  ),
                  value: "$100 - $500",
                },
                {
                  name: (
                    <span>
                      $500 - $1000{" "}
                      <span className="text-gray-4/40 text-sm-regular">
                        /month
                      </span>
                    </span>
                  ),
                  value: "$500 - $1000",
                },
                {
                  name: (
                    <span>
                      $1000+{" "}
                      <span className="text-gray-4/40 text-sm-regular">
                        /month
                      </span>
                    </span>
                  ),
                  value: "$1000+",
                },
              ]}
              optionsWidth="w-[420px]"
            />
            <TextInput
              title="Spending budget goal"
              width="w-full"
              placeholder="$"
              type="number"
            />
          </div>
          <Button
            variant="r4-primary"
            text="Continue"
            className="min-w-[60px] self-stretch items-center justify-center gap-xxs"
          />
        </div>
      </div>
    </div>
  );
}
