import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    isLoading: false,
    isStarted: false,
    isFinished: true,
    roomList: [],
    totalCount: 0,
    error: "",
  },
  reducers: {
    getRooms: (state) => {
      state.isLoading = true;
    },
    getRoomsSuccess: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    getRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getNextRooms: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    getPrevRooms: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    getFreshRooms: (state, action) => {
      state.isLoading = false;
      state.roomList = action.payload;
    },
    createRoomRequest: (state) => {
      state.isStarted = true;
      state.isFinished = false;
    },
    createRoomSuccess: (state) => {
      state.isStarted = false;
      state.isFinished = true;
    },
    createRoomFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const roomSliceActions = roomSlice.actions;

export default roomSlice;
