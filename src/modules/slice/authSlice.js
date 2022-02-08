import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: "",
    user: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoggedIn = false;
      state.error = "";
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = null;
    },
    logoutRequest: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = "";
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.isLoggedIn = true;
      state.error = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
