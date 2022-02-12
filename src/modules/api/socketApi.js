import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const socketCharacterApi = {
  enterRoom: (roomName, peerId) => {
    socketCharacter.emit("enterRoom", roomName, peerId);
  },
};

export const socketVideoApi = {
  enterRoom: (roomName) => {
    socketVideo.emit("enterRoom", roomName);
  },
  offer: (roomName, offer) => {
    socketVideo.emit("offer", roomName, offer);
  },
  answer: (roomName, answer) => {
    socketVideo.emit("answer", roomName, answer);
  },
  ice: (roomName, candidate) => {
    socketVideo.emit("ice", roomName, candidate);
  },
};
