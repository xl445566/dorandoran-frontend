import axios from "axios";
import { call, takeEvery, put } from "redux-saga/effects";

import { roomSliceActions } from "../slice/roomSlice";

const getRoomSaga = function* () {
  try {
    const response = yield call(() =>
      axios.get("http://localhost:4000/rooms", {
        withCredentials: true,
      })
    );

    if (response.data.message) {
      yield put(roomSliceActions.getRoomFailure(response.data.rooms));
      return;
    }

    yield put(roomSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomSliceActions.getRoomFailure(error));
  }
};

const getNextRoomSaga = function* ({ payload }) {
  try {
    const room = payload[payload.length - 1];
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms",
        {
          room,
          direction: "next",
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomSliceActions.getRoomFailure(response.data));
      return;
    }

    yield put(roomSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomSliceActions.getRoomFailure(error));
  }
};

const getPrevRoomSaga = function* ({ payload }) {
  try {
    const room = payload[payload.length - 1];
    const response = yield call(() =>
      axios.post(
        "http://localhost:4000/rooms",
        {
          room,
          direction: "prev",
        },
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(roomSliceActions.getRoomFailure(response));
      return;
    }

    yield put(roomSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomSliceActions.getRoomFailure(error));
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
      yield put(roomSliceActions.getRoomFailure(response));
      return;
    }

    yield put(roomSliceActions.getRoomsSuccess(response.data.rooms));
  } catch (error) {
    yield put(roomSliceActions.getRoomFailure(error));
  }
};

const createRoomSaga = function* ({ payload }) {
  try {
    yield call(async () => {
      await axios.post(
        "http://localhost:4000/rooms/new",
        {
          roomData: payload,
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

export function* watchInitRooms() {
  yield takeEvery(roomSliceActions.getRooms, getRoomSaga);
}

export function* watchNextRooms() {
  yield takeEvery(roomSliceActions.getNextRooms, getNextRoomSaga);
}

export function* watchPrevRooms() {
  yield takeEvery(roomSliceActions.getPrevRooms, getPrevRoomSaga);
}

export function* watchFreshRooms() {
  yield takeEvery(roomSliceActions.getFreshRooms, getRefreshRoomSaga);
}

export function* watchCreateRoom() {
  yield takeEvery(roomSliceActions.createRoomRequest, createRoomSaga);
}
