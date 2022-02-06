import { call, takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { authSliceActions } from "../slice/authSlice";

const loginSaga = function* ({ payload }) {
  try {
    const request = yield call(() =>
      axios.post("http://localhost:4000/auth/login", payload, {
        withCredentials: true,
      })
    );
    yield put(authSliceActions.loginSuccess(request.data));
  } catch (err) {
    console.error("login error", err);
    yield put(authSliceActions.loginFailure(err));
  }
};

const logoutSaga = function* ({ payload }) {
  try {
    // console.log("로그아웃 payload", payload);
    const request = yield call(() =>
      axios.post("http://localhost:4000/auth/logout", payload, {
        withCredentials: true,
      })
    );
    yield put(authSliceActions.logoutSuccess(request.data));
  } catch (err) {
    console.error("login error", err);
    yield put(authSliceActions.logoutFailure(err));
  }
};

export function* watchLogin() {
  yield takeEvery(authSliceActions.loginRequest, loginSaga);
}

export function* watchLogout() {
  yield takeEvery(authSliceActions.logoutRequest, logoutSaga);
}
