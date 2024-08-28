import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
  name: "survey",
  initialState: {
    surveyForm: {
      surveyTitle: "",
      surveySubject: "",
      surveyRecipients: "",
      surveyBody: "",
    },
  },
  reducers: {
    updateSurveyForm: (state, action) => {
      state.surveyForm[action.payload.id] = action.payload.value;
    },
  },
});

export const { updateSurveyForm } = surveySlice.actions;
export const surveyReducer = surveySlice.reducer;
