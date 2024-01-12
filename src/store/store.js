import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";
import { thunk } from "redux-thunk";

// Define the store
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [thunk],
});

export default store;
