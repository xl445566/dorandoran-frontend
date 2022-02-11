import axios from "axios";
import { call, takeEvery, put } from "redux-saga/effects";

import { roomListSliceActions } from "../slice/roomListSlice";

const getRoomSaga = function* () {
  try {
    const response = yield call(() =>
      axios.get("http://localhost:4000/rooms", {
        withCredentials: true,
      })
    );

    if (response.data.message) {
      yield put(roomListSliceActions.getRoomFailure(response.data.rooms));
      return;
    }

    yield put(roomListSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomListSliceActions.getRoomFailure(error));
  }
};

const getNextRoomSaga = function* ({ payload }) {
  try {
    const lastRoom = payload[payload.length - 1];
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms",
        {
          lastRoom,
          direction: "next",
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomListSliceActions.getRoomFailure(response.data));
      return;
    }

    yield put(roomListSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomListSliceActions.getRoomFailure(error));
  }
};

const getPrevRoomSaga = function* ({ payload }) {
  try {
    const lastRoom = payload[payload.length - 1];
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms",
        {
          lastRoom,
          direction: "prev",
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomListSliceActions.getRoomFailure(response));
      return;
    }

    yield put(roomListSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomListSliceActions.getRoomFailure(error));
  }
};

const getRefreshRoomSaga = function* ({ payload }) {
  try {
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms/refresh",
        {
          roomList: payload,
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomListSliceActions.getRoomFailure(response));
      return;
    }

    yield put(roomListSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomListSliceActions.getRoomFailure(error));
  }
};

export function* watchInitRooms() {
  yield takeEvery(roomListSliceActions.getRooms, getRoomSaga);
}

export function* watchNextRooms() {
  yield takeEvery(roomListSliceActions.getNextRooms, getNextRoomSaga);
}

export function* watchPrevRooms() {
  yield takeEvery(roomListSliceActions.getPrevRooms, getPrevRoomSaga);
}

export function* watchFreshRooms() {
  yield takeEvery(roomListSliceActions.getFreshRooms, getRefreshRoomSaga);
}
