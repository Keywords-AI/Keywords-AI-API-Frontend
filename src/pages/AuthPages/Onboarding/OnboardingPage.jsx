import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  logout,
  setNextStep,
  updateOrganization,
  updateUser
} from "src/store/actions";
import { CreateOrganization } from "./CreateOrganization";
import { Button } from "src/components/Buttons";
import { Left } from "src/components/Icons";
import { useForm } from "react-hook-form";
import { IdentifyUseCase } from "./IdentifyUseCase";
import { InviteTeam, OptimizeCosts, PrioritizeObj } from ".";
import StepsBar from "src/components/Misc/StepsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";
import cn from "src/utilities/classMerge";
import { REDIRECT_URI } from "src/utilities/navigation";

const mapStateToProps = (state) => ({
  user: state.user,
  organization: state.organization
});
const mapDispatchToProps = {
  logout,
  updateOrganization
};

export const OnboardingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({
  logout,
  updateOrganization,
  user,
  organization
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const curr_step = new URLSearchParams(location.search).get("curr_step") || 1;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleBackButtonClick = () => {
    logout(
      () => {
        window.location.href = "https://keywordsai.co";
      }
    ); // Dispatch the logout action
  };
  const formfields = [
    <CreateOrganization />,
    // <InviteTeam />,
    <IdentifyUseCase />,
    <PrioritizeObj />,
    <OptimizeCosts />,
  ];
  useEffect(() => {
    if (organization?.onboarded) {
      navigate(REDIRECT_URI);
    } else if (organization?.curr_onboarding_step >= formfields.length) {
      navigate("/onboarding/plans");
    }
  }, [user])
  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-xxs">
        {parseInt(curr_step) <= formfields.length + 1 && <Button
          text={"Sign out"}
          variant={"r18-black"}
          onClick={handleBackButtonClick}
          icon={Left}
          iconPosition={"left"}
        />}
      </div>
      <div
        className="w-full max-w-[420px] flex-col flex-grow"
      >
        {formfields.map((field, index) => {
          return (
            <React.Fragment key={index}>
              {React.cloneElement(field, {
                register, watch,
                stepNumber: index + 1,
                buttonAction: () => {
                  updateOrganization({ curr_onboarding_step: index + 2 });
                  if (index + 1 == formfields.length) {
                    // end of forms to fill
                    if (!user.active_subscription) {
                      navigate("/onboarding/plans");
                    }
                  } else {
                    setQueryParams({ curr_step: index + 2 }, navigate);
                  }
                }
              })}
            </React.Fragment>
          )
        })}
      </div>
      <StepsBar
        className={cn("absolute bottom-md",
          curr_step == formfields.length + 1 ? "hidden" : "visible"
        )} activeStep={curr_step} totalSteps={formfields.length} />
    </>
  );
});
