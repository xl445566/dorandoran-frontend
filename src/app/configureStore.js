import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from "./rootSaga";
// import { authSlice } from '../modules/slice';
const createStore = () => {
  const rootReducer = combineReducers({});
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [logger, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = createStore();

export default store;
