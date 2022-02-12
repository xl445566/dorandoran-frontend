import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import authSlice from "../modules/slice/authSlice";
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
      video: videoSlice.reducer,
    },
    devTools: true,
    middleware: [sagaMiddleware, logger],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
