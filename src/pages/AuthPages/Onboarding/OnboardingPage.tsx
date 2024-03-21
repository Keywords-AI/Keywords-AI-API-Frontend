import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  UpdateOrgSubscription,
  logout,
  updateOrganization,
} from "src/store/actions";
import { CreateOrganization } from "./CreateOrganization";
import { Button } from "src/components/Buttons";
import { Left, Right } from "src/components/Icons";
import { useForm } from "react-hook-form";
import { IdentifyUseCase } from "./IdentifyUseCase";
import { InviteTeam, OptimizeCosts, PrioritizeObj } from ".";
import { StepsBar } from "src/components/Misc";
import { useLocation, useNavigate } from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";
import cn from "src/utilities/classMerge";
import { REDIRECT_URI } from "src/utilities/navigation";
import { createSelector } from "reselect";
import { useTypedSelector, useTypedDispatch } from "src/store/store";
import { RootState } from "src/types";

export const OnboardingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const curr_step: number = parseInt(
    new URLSearchParams(location.search).get("curr_step") || "1"
  );
  const dispatch = useTypedDispatch();
  const orgUserSelector = createSelector(
    (state: RootState) => state.organization,
    (state) => state.user,
    (organization, user) => ({ organization, user })
  ); // Memoize the selector
  const { organization, user } = useTypedSelector(orgUserSelector);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleBackButtonClick = () => {
    dispatch(
      logout(() => {
        window.location.href = "https://keywordsai.co";
      })
    );
  };
  const handleSkipInvite = () => {
    dispatch(UpdateOrgSubscription("starter"));
  };
  const formfields = [
    <CreateOrganization />,
    // <InviteTeam stepNumber={2} />,
    // <IdentifyUseCase />,
    // <PrioritizeObj />,
    // <OptimizeCosts />,
  ];
  useEffect(() => {
    if (organization?.id) {
      navigate("/platform");
    }
    // else {
    //   const loadStep = organization?.curr_onboarding_step > formfields.length? formfields.length: organization?.curr_onboarding_step
    //   setQueryParams({ curr_step: loadStep }, navigate);
    // }
  }, [organization]);
  return (
    <>
      <div
        className={cn(
          "flex flex-col items-start self-stretch gap-xxs",
          "items-start"
        )}
      >
        <Button
          text={"Sign out"}
          variant={"r18-black"}
          onClick={handleBackButtonClick}
          icon={Left}
          iconPosition={"left"}
        />
      </div>
      <div className="w-full max-w-[420px] flex-col flex-grow">
        {formfields.map((field, index) => {
          return (
            <React.Fragment key={index}>
              {React.cloneElement(field, {
                register,
                watch,
                stepNumber: index + 1,
                buttonAction: () => {
                  // dispatch(updateOrganization({ onboarded: true }));
                },
              })}
            </React.Fragment>
          );
        })}
      </div>
      {/* <StepsBar
        className={cn(
          "absolute bottom-md select-none",
          curr_step == formfields.length + 1 ? "hidden" : "visible"
        )}
        totalSteps={formfields.length}
      /> */}
    </>
  );
};
