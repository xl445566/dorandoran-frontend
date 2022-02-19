import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    error: "",
    event: "",
  },
  reducers: {
    saveError: (state, action) => {
      state.error = action.payload;
    },
    init: (state) => {
      state.error = "";
    },
    receiveEvent: (state, action) => {
      state.event = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
