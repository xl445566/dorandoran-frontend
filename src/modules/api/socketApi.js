import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const socketCharacterApi = {
  enterRoom: (userInfo) => {
    socketCharacter.emit("enterRoom", userInfo);
  },
  changeCurrentCharacter: (x, y, side, moveCount) => {
    socketCharacter.emit("changeCurrentCharacter", x, y, side, moveCount);
  },
  exitUser: () => {
    socketCharacter.emit("exitUser");
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
