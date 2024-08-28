import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const surveyApi = createApi({
  reducerPath: "surveyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
      postSurvey: builder.mutation({
        query: (body) => ({
          method: "POST",
          url: "/surveys",
          body: body,
        }),
        // invalidatesTags: ['Auth'],
      }),
    };
  },
});


export const { usePostSurveyMutation } = surveyApi;
