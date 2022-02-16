import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

import constants from "../../common/utils/constants";
import { characterSliceActions } from "../slice/characterSlice";
import { videoSliceActions } from "../slice/videoSlice";

export const socketCharacter = io(constants.CONNECT_SOCKET_CHARACTER, {
  withCredentials: true,
});

export const socketVideo = io(constants.CONNECT_SOCKET_VIDEO, {
  withCredentials: true,
});

const createSocketCharacterChannel = (socketCharacter) => {
  return eventChannel((emit) => {
    socketCharacter.on("setCharacters", (character) => {
      emit(characterSliceActions.charactersInRoom(character));
    });

    socketCharacter.on("setChairPosition", (chairPosition) => {
      emit(characterSliceActions.doNotComeChair(chairPosition));
    });

    socketCharacter.on("setCurrentUserPosition", (userPosition) => {
      emit(characterSliceActions.doNotComeChair(userPosition));
    });
    return () => {
      socketCharacter.off("setCharacters");
      socketCharacter.off("setChairPosition");
      socketCharacter.off("setCurrentUserPosition");
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

const createSocketVideoChannel = (socketVideo) => {
  return eventChannel((emit) => {
    socketVideo.on("receiveEvent", (payload) => {
      emit(videoSliceActions.receiveEvent(payload));
    });

    return () => {
      socketVideo.off("receiveEvent");
    };
  });
};

export const watchSocketVideoSaga = function* () {
  const channel = yield call(createSocketVideoChannel, socketVideo);

  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
};
