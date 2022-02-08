import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import authSlice from "../modules/slice/authSlice";
import roomSlice from "../modules/slice/roomSlice";
import rootSaga from "./rootSaga";

import roomSlice from "../modules/slice/roomSlice";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      room: roomSlice.reducer,
    },
    devTools: true,
    middleware: [logger, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
