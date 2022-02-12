import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    characters: [],
  },
  reducers: {
    charactersInRoom: (state, action) => {
      state.characters = action.payload;
    },
  },
});

export const characterSliceActions = characterSlice.actions;

export default characterSlice;
