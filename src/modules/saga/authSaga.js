import axios from "axios";
import { call, takeEvery, put } from "redux-saga/effects";

import constants from "../../common/utils/constants";
import { authSliceActions } from "../slice/authSlice";

const loginSaga = function* ({ payload }) {
  try {
    const uri = process.env.REACT_APP_SERVER_URI + constants.REQUEST_AUTH_LOGIN;

    const response = yield call(() =>
      axios.post(uri, payload, {
        withCredentials: true,
      })
    );

    if (response.data.message) {
      yield put(authSliceActions.loginFailure(response.data));
      return;
    }

    yield put(authSliceActions.loginSuccess(response.data));
  } catch (error) {
    yield put(authSliceActions.loginFailure(error));
  }
};

const logoutSaga = function* () {
  try {
    const response = yield call(() =>
      axios.get(
        process.env.REACT_APP_SERVER_URI + constants.REQUEST_AUTH_LOGOUT,
        {
          withCredentials: true,
        }
      )
    );

    if (response.data.message) {
      yield put(authSliceActions.logoutFailure(response.data.message));
      return;
    }

    yield put(authSliceActions.logoutSuccess());
  } catch (error) {
    yield put(authSliceActions.logoutFailure(error));
  }
};

const cookieClearSaga = function* () {
  try {
    yield call(() =>
      axios.get(
        process.env.REACT_APP_SERVER_URI + constants.REQUEST_AUTH_CLEAR,
        {
          withCredentials: true,
        }
      )
    );

    yield put(authSliceActions.cookieClearSuccess());
  } catch (error) {
    yield put(authSliceActions.cookieClearFailure(error));
  }
};

export function* watchLogin() {
  yield takeEvery(authSliceActions.loginRequest, loginSaga);
}

export function* watchLogout() {
  yield takeEvery(authSliceActions.logoutRequest, logoutSaga);
}

export function* watchCookieClearSaga() {
  yield takeEvery(authSliceActions.cookieClear, cookieClearSaga);
}
