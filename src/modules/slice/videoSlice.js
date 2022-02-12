import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    isUpdate: false,
    remotePeerId: "",
    leavePeerId: "",
    userList: [],
  },
  reducers: {
    saveRemotePeer: (state, action) => {
      state.isUpdate = true;
      state.remotePeerId = action.payload;
    },
    saveUserList: (state, action) => {
      state.userList = action.payload;
    },
    saveLeavePeerId: (state, action) => {
      state.leavePeerId = action.payload;
    },
    initIsUpdate: (state) => {
      state.isUpdate = !state.isUpdate;
    },
    test: (state) => {
      state.error = state;
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
