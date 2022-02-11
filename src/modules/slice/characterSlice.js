import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: [],
    disUser: "",
    userPos: null,
  },
  reducers: {
    characterSoCket: (state, action) => {
      state.character = action.payload;
    },
    userInRoom: (state, action) => {
      state.character = action.payload;
    },
    movePosition: (state, action) => {
      state.userPos = action.payload;
    },
  },
});

export const characterSliceActions = characterSlice.actions;

export default characterSlice;
