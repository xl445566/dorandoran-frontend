import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    characters: [],
    chairPosition: [],
  },
  reducers: {
    charactersInRoom: (state, action) => {
      state.characters = action.payload;
    },
    doNotComeChair: (state, action) => {
      state.chairPosition = action.payload;
    },
    allInit: (state) => {
      state.characters = [];
      state.chairPosition = [];
    },
  },
});

export const characterSliceActions = characterSlice.actions;

export default characterSlice;
