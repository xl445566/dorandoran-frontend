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
  exitChattingRoom: (posIndex, roomId) => {
    socketCharacter.emit("exitChattingRoom", posIndex, roomId);
  },
};

export const socketVideoApi = {
  enterRoom: (roomName, userName) => {
    socketVideo.emit("enterRoom", roomName, userName);
  },
  offer: (payload) => {
    socketVideo.emit("offer", payload);
  },
  answer: (payload) => {
    socketVideo.emit("answer", payload);
  },
  leaveRoom: (payload) => {
    socketVideo.emit("leaveRoom", payload);
  },
  sendEvent: (payload) => {
    socketVideo.emit("sendEvent", payload);
  },
};
