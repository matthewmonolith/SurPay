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
        invalidatesTags:  ["Surveys", { type: "Auth" }],
      }),
      fetchSurveys: builder.query({
        query: () => "/surveys",
        providesTags: ["Surveys"],
      }),
    };
  },
});

export const { usePostSurveyMutation, useFetchSurveysQuery } = surveyApi;
