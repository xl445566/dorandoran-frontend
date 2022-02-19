import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import constants from "../common/utils/constants";
import authSlice from "../modules/slice/authSlice";
import characterSlice from "../modules/slice/characterSlice";
import roomListSlice from "../modules/slice/roomListSlice";
import roomSlice from "../modules/slice/roomSlice";
import videoSlice from "../modules/slice/videoSlice";
import rootSaga from "./rootSaga";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      room: roomSlice.reducer,
      roomList: roomListSlice.reducer,
      character: characterSlice.reducer,
      video: videoSlice.reducer,
    },
    devTools: true,
    middleware:
      process.env.NODE_ENV === constants.DEV
        ? [sagaMiddleware, logger]
        : [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
