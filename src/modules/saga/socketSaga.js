import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

import { authSliceActions } from "../slice/authSlice";

export const socketCharacter = io("http://localhost:4000/character", {
  withCredentials: true,
});

export const socketVideo = io("http://localhost:4000/video", {
  withCredentials: true,
});

const createSocketCharacterChannel = (socketCharacter) => {
  return eventChannel((emit) => {
    socketCharacter.on("welcome", () => {
      emit(authSliceActions.doingTest());
    });

    return () => {
      socketCharacter.off("welcome");
    };
  });
};

const createSocketVideoChannel = (socketVideo) => {
  return eventChannel((emit) => {
    socketVideo.on("welcome", () => {
      emit(authSliceActions.doingTest());
    });

    return () => {
      socketVideo.off("welcome");
    };
  });
};

export const watchSocketCharacterSaga = function* () {
  const channel = yield call(createSocketCharacterChannel, socketCharacter);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
};

export const watchSocketVideoSaga = function* () {
  const channel = yield call(createSocketVideoChannel, socketVideo);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
};
