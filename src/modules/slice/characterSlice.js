import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    currentUser: "",
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
    visitCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    movePosition: (state, action) => {
      state.character = action.payload;
    },
  },
});

export const characterSliceActions = characterSlice.actions;

export default characterSlice;
