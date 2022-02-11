import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

import { characterSliceActions } from "../slice/characterSlice";

export const socketCharacter = io("http://localhost:4000/character", {
  withCredentials: true,
});

export const socketVideo = io("http://localhost:4000/video", {
  withCredentials: true,
});

const createSocketCharacterChannel = (socketCharacter) => {
  return eventChannel((emit) => {
    socketCharacter.on("visitedUser", (user) => {
      emit(characterSliceActions.characterSoCket(user));
    });

    socketCharacter.on("userInRoom", (user) => {
      emit(characterSliceActions.userInRoom(user));
    });

    socketCharacter.on("movePosition", (user) => {
      emit(characterSliceActions.movePosition(user));
    });

    return () => {
      socketCharacter.off("visitedUser");
      socketCharacter.off("onReceive");
      socketCharacter.off("userInRoom");
      socketCharacter.off("movePosition");
    };
  });
};

const createSocketVideoChannel = (socketVideo) => {
  return eventChannel((emit) => {
    socketVideo.on("welcome", () => {
      emit(characterSliceActions.characterSoCket());
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
