import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "roomList",
  initialState: {
    isLoading: false,
    roomList: [],
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
    allInit: (state) => {
      state.isLoading = false;
      state.roomList = [];
      state.error = "";
    },
  },
});

export const roomListSliceActions = roomSlice.actions;

export default roomSlice;
