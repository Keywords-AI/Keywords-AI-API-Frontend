import { PayloadAction } from "@reduxjs/toolkit";
import { TypedDispatch } from "src/types";
import { keywordsRequest } from "src/utilities/requests";

export const GET_EVAL_RESULTS = "GET_EVAL_RESULTS";

export const getEvalResults = () => {
  return async (dispatch: TypedDispatch) => {
    try {
      const responseJson = await keywordsRequest({
        path: "/api/evaluations",
      });
      dispatch({
        type: GET_EVAL_RESULTS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
