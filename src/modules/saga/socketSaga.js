import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

import { authSliceActions } from "../slice/authSlice";

export const socket = io("http://localhost:4000", {
  withCredentials: true,
});

// sliceActions 를 임포트해서 아래예시 처럼
// emit(sliceActions.리듀서함수(payload)) 형식으로 작성필요

// 서버 ---> 리액트 소켓으로 오는 데이터를 처리하는 로직을 작성하는 곳

// eventChannel 안에 socket.on 작성후
// return 에 반드시 socket.off() 추가 해야 합니다.

const createSocketChannel = (socket) => {
  return eventChannel((emit) => {
    socket.on("welcome", () => {
      emit(authSliceActions.loginRequest());
    });

    return () => {
      socket.off("welcome");
    };
  });
};

export const watchSocketSaga = function* () {
  const channel = yield call(createSocketChannel, socket);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
};
