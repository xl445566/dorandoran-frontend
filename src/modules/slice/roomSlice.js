import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    isComplete: false,
    isLoading: false,
    isShowModal: false,
    isReload: false,
    isEnter: false,
    error: "",
    info: null,
  },
  reducers: {
    joinUser: (state) => {
      state.isLoading = true;
    },
    joinedUserSuccess: (state) => {
      state.isLoading = false;
    },
    joinedUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUser: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.isComplete = true;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createRoomRequest: (state) => {
      state.isLoading = true;
    },
    createRoomSuccess: (state, action) => {
      state.isComplete = true;
      state.isLoading = false;
      state.info = action.payload;
    },
    createRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCurrentRoomInfo: (state) => {
      state.isLoading = true;
    },
    getCurrentRoomInfoSuccess: (state) => {
      state.isLoading = false;
      state.isEnter = true;
    },
    getCurrentRoomInfoFailure: (state) => {
      state.isReload = true;
      state.isLoading = false;
    },
    saveInfo: (state, action) => {
      state.info = action.payload;
    },
    changeIsCompleted: (state) => {
      state.isComplete = false;
    },
    init: (state) => {
      state.info = null;
    },
    changeIsShowModal: (state) => {
      state.isShowModal = !state.isShowModal;
    },
    changeIsReload: (state) => {
      state.isReload = !state.isReload;
    },
    changeIsEnter: (state) => {
      state.isEnter = !state.isEnter;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const roomSliceActions = roomSlice.actions;

export default roomSlice;
