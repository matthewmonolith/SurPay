import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi", 
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // fetchUser: builder.query({
    //   query: () => "/current_user", //only relative path needed, proxy needed for dev, for prod the proxy doesn't exist of course
    // }),
    fetchUser: builder.query({
      query: () => "/users/41", 
  }),
  }),
});

export const { useFetchUserQuery } = authApi;
