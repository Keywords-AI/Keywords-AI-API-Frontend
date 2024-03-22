// src/store/reducers/onboardingReducer

import { SET_CURRENT_STEP } from "../actions/onboardingAction";

const initialState = {
  currentStep: 1,
};

export default function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};


