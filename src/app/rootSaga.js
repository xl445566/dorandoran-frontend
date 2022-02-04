import { all, fork } from "redux-saga/effects";
import { watchLogin } from "../modules/saga/authSaga";

export default function* rootSaga() {
  yield all([fork(watchLogin)]);
}
