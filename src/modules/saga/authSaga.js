import { call, takeEvery, put, delay } from "redux-saga/effects";
import axios from "axios";
import { authSliceActions } from "../slice/authSlice";

const loginSaga = function* ({ payload }) {
  try {
    console.log("payload", payload);
    const request = yield call(() =>
      axios.post("http://localhost:4000/auth/login", payload)
    );
    yield delay(2000);
    yield put(authSliceActions.loginSuccess(request.data));
  } catch (err) {
    console.error("login error", err);
    yield put(authSliceActions.loginFailure(err));
  }
};

const logoutSaga = function* () {
  try {
    const request = yield axios.post("/logout");
    yield delay(2000);
    yield put(authSliceActions.logoutSuccess(request.data));
  } catch (err) {
    console.error("login error", err);
    yield put(authSliceActions.logoutFailure(err));
  }
};

export function* watchLogin() {
  yield takeEvery(authSliceActions.loginRequest, loginSaga);
  yield takeEvery(authSliceActions.logoutRequest, logoutSaga);
}
