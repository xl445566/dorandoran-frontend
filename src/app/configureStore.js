import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import authSlice from "../modules/slice/authSlice";
import rootSaga from "./rootSaga";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    devTools: true,
    middleware: [logger, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
