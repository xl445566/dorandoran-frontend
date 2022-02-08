import axios from "axios";
import { call, take, put, takeEvery } from "redux-saga/effects";

import { roomSliceActions } from "../slice/roomSlice";

const getRoomSaga = function* getRoomSaga() {
  try {
    const response = yield call(() =>
      axios.get("http://localhost:4000/rooms", {
        withCredentials: true,
      })
    );

    if (response.data.rooms) {
      yield put(roomSliceActions.logoutFailure(response.data.rooms));
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export function* watchInitRooms() {
  yield take(roomSliceActions.getRooms, getRoomSaga);
}

const createRoomSaga = function* (action) {
  try {
    const roomData = action.payload;

    yield call(async () => {
      await axios.post(
        "http://localhost:4000/rooms/new",
        {
          roomData,
        },
        {
          withCredentials: true,
        }
      );
    });

    yield put(roomSliceActions.createRoomSuccess());
  } catch (error) {
    yield put(roomSliceActions.createRoomFailure(error));
  }
};

export function* watchCreateRoom() {
  yield takeEvery(roomSliceActions.createRoomRequest, createRoomSaga);
}
