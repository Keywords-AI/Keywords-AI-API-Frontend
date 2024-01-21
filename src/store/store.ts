import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { TypedDispatch, RootState } from "src/types/redux";
import { useMemo } from "react";

// Define the store
const store = configureStore({
  reducer: rootReducer,
});


export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
