export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';



export const setCurrentStep = (step) => ({
    type: SET_CURRENT_STEP,
    payload: step,
  });

export const setNextStep = () => (dispatch, getState) => {
    const { currentStep } = getState().onboarding;
    dispatch(setCurrentStep(currentStep + 1));
    console.log(currentStep)
  }