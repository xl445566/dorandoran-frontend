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

export const soketVideoApi = {
  enterRoom: (roomName, peerId) => {
    socketVideo.emit("enterRoom", roomName, peerId);
  },
};
