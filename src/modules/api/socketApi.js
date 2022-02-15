import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const socketCharacterApi = {
  enterRoom: (userInfo) => {
    socketCharacter.emit("enterRoom", userInfo);
  },
  changeCurrentCharacter: (x, y, side, moveCount, isChatting) => {
    socketCharacter.emit(
      "changeCurrentCharacter",
      x,
      y,
      side,
      moveCount,
      isChatting
    );
  },
  exitUser: () => {
    socketCharacter.emit("exitUser");
  },
  enterChattingRoom: (posIndex, x, y, roomId) => {
    socketCharacter.emit("enterChattingRoom", posIndex, x, y, roomId);
  },
  exitChattingRoom: (posIndex) => {
    socketCharacter.emit("exitChattingRoom", posIndex);
  },
};

export const socketVideoApi = {
  enterRoom: (payload) => {
    socketVideo.emit("enterRoom", payload);
  },
  offer: (payload) => {
    socketVideo.emit("offer", payload);
  },
  answer: (payload) => {
    socketVideo.emit("answer", payload);
  },
  leaveRoom: () => {
    socketVideo.emit("leaveRoom");
  },
};
