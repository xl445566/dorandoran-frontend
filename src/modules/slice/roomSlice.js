import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    isComplete: false,
    isLoading: false,
    error: "",
    info: null,
  },
  reducers: {
    joinUser: (state) => {
      state.isLoading = true;
    },
    joinedUserSuccess: (state) => {
      state.isLoading = false;
    },
    joinedUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUser: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.isComplete = true;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createRoomRequest: (state) => {
      state.isLoading = true;
    },
    createRoomSuccess: (state, action) => {
      state.isComplete = true;
      state.isLoading = false;
      state.info = action.payload;
    },
    createRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    saveInfo: (state, action) => {
      state.info = action.payload;
    },
    changeIsComplted: (state) => {
      state.isComplete = false;
    },
    init: (state) => {
      state.isComplete = false;
      state.isLoading = false;
      state.error = "";
      state.info = null;
    },
  },
});

export const roomSliceActions = roomSlice.actions;

export default roomSlice;
