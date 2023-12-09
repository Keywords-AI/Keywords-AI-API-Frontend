import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
