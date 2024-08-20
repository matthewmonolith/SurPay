import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./slices/userSlice";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
});

setupListeners(store.dispatch);

export { useFetchUserQuery, useLogoutUserMutation, useHandleTokenMutation } from "./apis/userApi";
