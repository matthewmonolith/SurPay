import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware(getDefaultMiddleware) {
  //   getDefaultMiddleware();
  // },
});

// setupListeners(store.dispatch);

export { store };
