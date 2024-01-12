import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";

// Define the store
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
