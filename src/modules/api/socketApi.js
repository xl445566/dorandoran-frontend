import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const socketCharacterApi = {
  enterRoom: (roomName, peerId) => {
    socketCharacter.emit("enterRoom", roomName, peerId);
  },
};

export const socketVideoApi = {
  joinRoom: (roomName) => {
    socketVideo.emit("joinRoom", roomName);
  },
  offer: (payload) => {
    socketVideo.emit("offer", payload);
  },
  answer: (payload) => {
    socketVideo.emit("answer", payload);
  },
  iceCandidate: (payload) => {
    socketVideo.emit("iceCandidate", payload);
  },
};
