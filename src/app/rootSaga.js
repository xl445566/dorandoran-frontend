import { all, fork } from "redux-saga/effects";

import { watchLogin, watchLogout } from "../modules/saga/authSaga";

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
