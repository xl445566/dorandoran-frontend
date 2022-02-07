import { all, fork } from "redux-saga/effects";
import { watchLogin, watchLogout } from "../modules/saga/authSaga";
import { watchInitRooms } from "../modules/saga/roomSaga";

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchInitRooms)]);
}
