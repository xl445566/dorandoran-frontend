import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    error: "",
  },
  reducers: {
    saveError: (state, action) => {
      state.error = action.payload;
    },
    init: (state) => {
      state.error = "";
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
