import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const socketCharacterApi = {
  hello: (roomId, x, y, type, side, isChatting, currentUser) => {
    socketCharacter.emit(
      "hello",
      roomId,
      x,
      y,
      type,
      side,
      isChatting,
      currentUser
    );
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
