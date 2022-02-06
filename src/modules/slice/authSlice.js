import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: "",
    user: null,
    location: "",
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoggedIn = true;
      state.result = "";
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.result = action.payload;
      state.user = null;
    },
    logoutRequest: (state) => {
      state.isLoggingOut = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = "";
      state.location = "";
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
