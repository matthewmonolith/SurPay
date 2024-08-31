import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { userReducer } from "./slices/userSlice";
import { surveyReducer } from "./slices/surveySlice";
import { userApi } from "./apis/userApi";
import { surveyApi } from "./apis/surveyApi";

export const store = configureStore({
  reducer: {
    // user: userReducer,
    survey: surveyReducer,
    [userApi.reducerPath]: userApi.reducer,
    [surveyApi.reducerPath]: surveyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(surveyApi.middleware),
});

setupListeners(store.dispatch);

export {userApi}

export {
  useFetchUserQuery,
  useLogoutUserMutation,
  useHandleTokenMutation,
} from "./apis/userApi";

export { usePostSurveyMutation, useFetchSurveysQuery } from "./apis/surveyApi";

export { updateSurveyForm } from "./slices/surveySlice";
