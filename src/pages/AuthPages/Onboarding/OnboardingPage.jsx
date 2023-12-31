import React from "react";
import { connect } from "react-redux";
import { logout, setCurrentStep, setNextStep } from "src/store/actions";
import { CreateOrganization } from "./CreateOrganization";
import { Button } from "src/components/Buttons";
import { Left } from "src/components/Icons";
import { useForm } from "react-hook-form";
import { IdentifyUseCase } from "./IdentifyUseCase";
import { InviteTeam, OptimizeCosts, PrioritizeObj } from ".";
import StepsBar from "src/components/Misc/StepsBar";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import { setQueryParams } from "src/utilities/navigation";

const mapStateToProps = (state) => ({
    currentStep: state.onboarding.currentStep
});
const mapDispatchToProps = { logout, setCurrentStep, setNextStep };

export const OnboardingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ logout, fieldSet, currentStep,setNextStep }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const curr_step = new URLSearchParams(location.search).get("curr_step", 1);
    React.useEffect(()=>{
        setCurrentStep(curr_step);
    }, [curr_step])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleBackButtonClick = () => {
    logout(); // Dispatch the logout action
    window.location.href = "https://keywordsai.co";
  };
  const onSubmit = (data) => {
    setNextStep();
  };
  return (
    <div
      className="flex flex-col items-center gap-xxxl justify-start self-stretch relative h-screen p-lg"
      aria-label="create-org-page"
    >
      <div className="flex flex-col items-start self-stretch gap-[10px]">
        <Button
          text={"Sign out"}
          variant={"r18-black"}
          onClick={handleBackButtonClick}
          icon={Left}
          iconPosition={"left"}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[420px]">
        <CreateOrganization register={register} show={curr_step==1} buttonAction={()=>{setQueryParams({curr_step: 2},navigate)}}/>
        <InviteTeam register={register} show={curr_step==2} buttonAction={()=>{setQueryParams({curr_step: 3},navigate)}}/>
        <IdentifyUseCase register={register} show={curr_step==3} buttonAction={()=>{setQueryParams({curr_step: 4},navigate)}}/>
        <PrioritizeObj register={register} show={curr_step==4} buttonAction={()=>{setQueryParams({curr_step: 5},navigate)}}/>
        <OptimizeCosts register={register} show={curr_step==5} buttonAction={()=>{setQueryParams({curr_step: 6},navigate)}}/>
        {/* <Button variant="r4-white" width="w-full" text="Test submit" /> */}
      </form>
      <StepsBar className="absolute bottom-md" activeStep={curr_step} />
    </div>
  );
});
