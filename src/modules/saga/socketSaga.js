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
    socketVideo.on("enterRoom", (remoteId) => {
      console.log("새로 들어온 사람 소켓 ID:::", remoteId);
      emit(videoSliceActions.saveRemoteId(remoteId));
    });

    socketVideo.on("offer", (offer) => {
      console.log("서버에서 온 Offer", offer);
    });

    return () => {
      socketVideo.off("enterRoom");
      socketVideo.off("offer");
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
