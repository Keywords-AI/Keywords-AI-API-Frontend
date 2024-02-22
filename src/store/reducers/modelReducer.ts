import { PayloadAction } from "@reduxjs/toolkit";
import {
    GET_MODELS
    } from "src/store/actions";

type ModelsState = {
    models: any
}

const initState: ModelsState = {
    models: {} // items are like {model_name: {...model_params}}
}

export default function modelReducer(state = initState, action: PayloadAction<any>) {
  switch (action.type) {
    case GET_MODELS:
      return {
        ...state,
        models: action.payload,
      };
    default:
      return state;
  }
}