import { createSlice } from "@reduxjs/toolkit";

export const avartarSlice = createSlice({
  name: "avartar",
  initialState: {
    isLoading: false,
    avartarInfo: [],
    error: "",
  },
  reducers: {
    getAvartar: (state, action) => {
      state.isLoading = true;
      state.avartarInfo = action.payload;
    },
    getAvartarSuccess: (state, action) => {
      state.isLoading = false;
      state.avartarInfo = action.payload;
    },
    getAvartarFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const avartarSliceActions = avartarSlice.actions;

export default avartarSlice;
