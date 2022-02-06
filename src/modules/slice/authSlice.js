import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLoggedIn: false, //로그인 여부
    isLoggingOut: false, //로그아웃 시도중
    isLoggingIn: false, //로그인 시도중
    result: "", //로그인 실패 사유
    isSignedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    user: null, //내정보,
    location: "서울 강남구",
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoggedIn = true;
      state.result = "";
    },
    loginSuccess: (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.result = action.payload;
      state.user = null;
    },
    logoutRequest: (state) => {
      state.isLoggingOut = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.isLoggingOut = false;
      state.result = action.payload;
      state.user = {};
    },
    logoutFailure: (state, action) => {
      state.isLoggingOut = false;
      state.result = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
