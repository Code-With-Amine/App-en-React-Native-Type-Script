import { configureStore } from "@reduxjs/toolkit";
import postssReducer from "../slices/postsSlice";

const store = configureStore({
  reducer: {
    items: postssReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
