import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomList: [],
    isStarted: false,
    isFinished: true,
    error: "",
  },
  reducers: {
    getRooms: (state, action) => {
      state.roomList.push(action.data);
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
