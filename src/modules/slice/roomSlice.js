import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    isLoading: false,
    roomList: [],
    error: "",
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
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFreshRooms: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    createRoomRequest: (state) => {
      state.isLoading = true;
    },
    createRoomSuccess: (state) => {
      state.isLoading = false;
    },
    createRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const roomSliceActions = roomSlice.actions;

export default roomSlice;
