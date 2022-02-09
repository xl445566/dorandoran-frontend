import axios from "axios";
import { call, takeEvery, put } from "redux-saga/effects";

import { roomSliceActions } from "../slice/roomSlice";

const joinUserSaga = function* ({ payload }) {
  try {
    const { currentRoom, currentUser } = payload;
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms/joinedUser",
        {
          currentRoom,
          currentUser,
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomSliceActions.joinedUserFailure(response));
      return;
    }

    yield put(roomSliceActions.joinedUserSuccess());
  } catch (error) {
    yield put(roomSliceActions.joinedUserFailure(error));
  }
};

const deleteUserSaga = function* ({ payload }) {
  try {
    const { currentRoom, currentUser } = payload;

    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms/deleteUser",
        {
          currentRoom,
          currentUser,
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomSliceActions.deleteUserFailure(response.data.message));
      return;
    }

    yield put(roomSliceActions.deleteUserSuccess(response.data.success));
  } catch (error) {
    yield put(roomSliceActions.deleteUserFailure(error));
  }
};

export function* watchJoinUser() {
  yield takeEvery(roomSliceActions.joinUser, joinUserSaga);
}

export function* watchDelteUser() {
  yield takeEvery(roomSliceActions.deleteUser, deleteUserSaga);
}
