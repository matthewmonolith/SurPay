import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "/current_user", // Relative path, proxy needed for dev, absolute for prod
      providesTags: [{ type: "Auth" }],
    }),
    logoutUser: builder.mutation({
      query: () => "/logout",
      invalidatesTags: [{ type: "Auth" }],
    }),
    handleToken: builder.mutation({
      query: (token) => ({
        url: "/stripe",
        method: "POST",
        body: { token: token },
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useFetchUserQuery, useLogoutUserMutation } = userApi;
