import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  logout,
  setNextStep,
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
import { GetStarted } from "./GetStarted";
import cn from "src/utilities/classMerge";

const mapStateToProps = (state) => ({
  currentStep: state.onboarding.currentStep,
  user: state.user,
});
const mapDispatchToProps = {
  logout,
  setNextStep,
  updateUser
};

export const OnboardingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ 
  logout, 
  setNextStep,
  updateUser,
  user
 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const curr_step = new URLSearchParams(location.search).get("curr_step") || 1;
  const [currentStep, setCurrentStep] = React.useState(parseInt(curr_step));
  useEffect(()=>{
    if (user.onboarded) {
      navigate("/");
    }
  }, [user])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setCurrentStep(parseInt(curr_step));
  }, [curr_step])
  const onSubmit = (data) => {
    setNextStep();
  };
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
  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-xxs">
        <Button
          text={"Sign out"}
          variant={"r18-black"}
          onClick={handleBackButtonClick}
          icon={Left}
          iconPosition={"left"}
        />
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
                  updateUser({ curr_onboarding_step: index + 2 });
                  setQueryParams({ curr_step: index + 2 }, navigate);
                }
              })}
            </React.Fragment>
          )
        })}
        <GetStarted show={parseInt(curr_step) === formfields.length + 1} />
      </div>
      <StepsBar
        className={cn("absolute bottom-md",
          curr_step == formfields.length + 1 ? "hidden" : "visible"
        )} activeStep={curr_step} totalSteps={formfields.length} />
    </>
  );
});
