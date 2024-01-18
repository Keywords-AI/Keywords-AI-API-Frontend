import rootReducer from 'src/store/reducers/reducer';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { UnknownAction } from "redux";

export type RootState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<RootState, any, UnknownAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;