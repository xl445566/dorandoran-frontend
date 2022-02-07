import { call, takeEvery, put } from "redux-saga/effects";
// import axios from "axios";
import { roomSliceActions } from "../slice/roomSlice";

const getRoomSaga = function* getRoomSaga() {
  try {
    // const response = yield call(() =>
    //   axios.get("http://localhost:4000/rooms", {
    //     withCredentials: true,
    //   })
    // );
    // if (response.data) {
    //   console.log(response.data);
    //   yield put(roomSliceActions.getRooms([response.data.rooms]));
    // }

    const response = yield call(() => fetch("http://localhost:4000/rooms"));

    const formatted = yield response.json();
    console.log(formatted);
    yield put(roomSliceActions.getRooms());
  } catch (error) {
    console.log(error);
  }
};

export function* watchInitRooms() {
  yield takeEvery(roomSliceActions.getRooms, getRoomSaga);
}
