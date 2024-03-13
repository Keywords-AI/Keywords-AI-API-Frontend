import { TypedDispatch } from "src/types";
import { keywordsRequest } from "src/utilities/requests";
export const GET_MODELS = "GET_MODELS";

export const getModels = () => {
  return (dispatch: TypedDispatch) => {
    keywordsRequest({
      path: "api/models",
    })
      .then((responseJson) => {
        dispatch({
          type: GET_MODELS,
          payload: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
