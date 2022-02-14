import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    isVideoConnected: false,
    videoChatId: "",
  },
  reducers: {
    joinVideoChat: (state, action) => {
      state.isVideoConnected = true;
      state.videoChatId = action.payload.videoChatId;
    },
    leaveVideoChat: (state) => {
      state.isVideoConnected = false;
      state.videoChatId = null;
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
