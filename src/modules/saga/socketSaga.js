import { eventChannel } from "redux-saga";
import { take, call, put } from "redux-saga/effects";
import io from "socket.io-client";

// import { videoSliceActions } from "../slice/videoSlice";

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
    console.log(emit, socketVideo);
    // socketVideo.on("enterRoom", (remoteId) => {
    //   emit(videoSliceActions.saveRemoteId(remoteId));
    // });

    // socketVideo.on("offer", (offer) => {
    //   emit(videoSliceActions.saveOffer(offer));
    // });

    // socketVideo.on("answer", (answer) => {
    //   emit(videoSliceActions.saveAnswer(answer));
    // });

    // socketVideo.on("ice", (iceCandidate) => {
    //   emit(videoSliceActions.saveIceCandidate(iceCandidate));
    // });

    return () => {
      // socketVideo.off("enterRoom");
      // socketVideo.off("offer");
      // socketVideo.off("answer");
      // socketVideo.off("ice");
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
