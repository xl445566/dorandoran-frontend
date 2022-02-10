import { all, fork } from "redux-saga/effects";

import {
  watchLogin,
  watchLogout,
  watchCookieClearSaga,
} from "../modules/saga/authSaga";
import {
  watchInitRooms,
  watchNextRooms,
  watchPrevRooms,
  watchFreshRooms,
  watchCreateRoom,
} from "../modules/saga/roomSaga";
import { watchSocketSaga } from "../modules/saga/socketSaga";

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchInitRooms),
    fork(watchNextRooms),
    fork(watchPrevRooms),
    fork(watchFreshRooms),
    fork(watchCreateRoom),
    fork(watchCookieClearSaga),
    fork(watchSocketSaga),
  ]);
}
