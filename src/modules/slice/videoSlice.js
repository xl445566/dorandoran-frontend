import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    remoteIds: [],
    offer: null,
    answer: null,
    iceCandidate: null,
    isEnter: false,
    isOffer: false,
    isAnswer: false,
    isIce: false,
  },
  reducers: {
    saveRemoteId: (state, action) => {
      state.isEnter = true;
      state.remoteIds.push(action.payload);
    },
    changeIsEnter: (state) => {
      state.isEnter = false;
    },
    saveOffer: (state, action) => {
      state.offer = action.payload;
      state.isOffer = true;
    },
    changeIsOffer: (state) => {
      state.isOffer = false;
    },
    saveAnswer: (state, action) => {
      state.answer = action.payload;
      state.isAnswer = true;
    },
    changeIsAnswer: (state) => {
      state.isAnswer = false;
    },
    saveIceCandidate: (state, action) => {
      state.isIce = true;
      state.iceCandidate = action.payload;
    },
    changeIsIce: (state) => {
      state.isIce = false;
    },
  },
});

export const videoSliceActions = videoSlice.actions;

export default videoSlice;
