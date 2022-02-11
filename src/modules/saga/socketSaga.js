import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

import { videoSliceActions } from "../slice/videoSlice";

export const socketCharacter = io("http://localhost:4000/character", {
  withCredentials: true,
});

export const socketVideo = io("http://localhost:4000/video", {
  withCredentials: true,
});

const createSocketCharacterChannel = (socketCharacter) => {
  return eventChannel((emit) => {
    // socketCharacter.on("welcome", () => {
    //   emit(videoSliceActions.test());
    // });
    console.log(emit);
    return () => {
      socketCharacter.off("welcome");
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
    socketVideo.on("welcome", (remoteId) => {
      console.log("새로 들어온 사람", remoteId);
      emit(videoSliceActions.saveRemotePeer(remoteId));
    });

    socketVideo.on("roomChange", (users) => {
      console.log("현재 유저 리스트", users);
      emit(videoSliceActions.saveUserList(users));
    });

    socketVideo.on("bye", (leavePeerId) => {
      console.log("나간 사람: ", leavePeerId);
      emit(videoSliceActions.saveLeavePeerId(leavePeerId));
    });

    return () => {
      socketVideo.off("welcome");
      socketVideo.off("roomChange");
      socketVideo.off("bye");
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
