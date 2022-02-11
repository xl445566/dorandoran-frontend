import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    remoteIds: [],
    isWelcome: false,
  },
  reducers: {
    saveRemoteId: (state, action) => {
      state.isWelcome = true;
      state.remoteIds = state.remoteIds.push(action.payload);
    },
    changeIsWelcome: (state) => {
      state.isWelcome = false;
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
