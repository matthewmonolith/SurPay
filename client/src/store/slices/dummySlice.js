import { createSlice } from "@reduxjs/toolkit";

const dummySlice = createSlice({
  name: "dummy",
  initialState: {},
  reducers: {
    test: () => [],
  },
});

export const {test} = dummySlice.actions
export const dummyReducer = dummySlice.reducer