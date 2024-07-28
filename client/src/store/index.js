import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dummyReducer, test } from "./slices/dummySlice";

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
  middleware(getDefaultMiddleware) {
    getDefaultMiddleware();
  },
});

setupListeners(store.dispatch);

export { store, test };
