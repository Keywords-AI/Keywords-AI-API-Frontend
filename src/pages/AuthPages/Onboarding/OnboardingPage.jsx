import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout, setCurrentStep, setNextStep } from "src/store/actions";
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
  currentStep: state.onboarding.currentStep
});
const mapDispatchToProps = { logout, setNextStep };

export const OnboardingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ logout, setNextStep }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const curr_step = new URLSearchParams(location.search).get("curr_step") || 1;
  const [currentStep, setCurrentStep] = React.useState(parseInt(curr_step));
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
    <CreateOrganization register={register} buttonAction={() => { setQueryParams({ curr_step: 2 }, navigate) }} />,
    <InviteTeam register={register} buttonAction={() => { setQueryParams({ curr_step: 3 }, navigate) }} />,
    <IdentifyUseCase register={register} buttonAction={() => { setQueryParams({ curr_step: 4 }, navigate) }} />,
    <PrioritizeObj register={register} buttonAction={() => { setQueryParams({ curr_step: 5 }, navigate) }} />,
    <OptimizeCosts register={register} buttonAction={() => { setQueryParams({ curr_step: 6 }, navigate) }} />,
  ];
  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <Button
          text={"Sign out"}
          variant={"r18-black"}
          onClick={handleBackButtonClick}
          icon={Left}
          iconPosition={"left"}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[420px] flex-col flex-grow"
      >
        {formfields.map((field, index) => {
          return (
            <React.Fragment key={index}>
              {React.cloneElement(field, { stepNumber: index + 1 })}
            </React.Fragment>
          )
        })}
        <GetStarted show={currentStep == 6} />
      </form>
      <StepsBar
        className={cn("absolute bottom-md",
          curr_step == formfields.length + 1 ? "hidden" : "visible"
        )} activeStep={curr_step} totalSteps={formfields.length} />
    </>
  );
});
