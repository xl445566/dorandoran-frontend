import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomList: {},
  },
  reducers: {
    getRooms: (state, action) => {
      state.roomList = action.payload;
    },
  },
});

export const roomSliceActions = roomSlice.actions;

export default roomSlice;
