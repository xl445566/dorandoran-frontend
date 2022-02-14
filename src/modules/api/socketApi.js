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
};

export const socketVideoApi = {
  enterRoom: (videoChatId) => {
    socketVideo.emit("enterRoom", videoChatId);
  },
  sendingSignalToConnectWebRTC: (payload) => {
    socketVideo.emit("sendingSignalToConnectWebRTC", payload);
  },
  returningSignalToConnectWebRTC: (payload) => {
    socketVideo.emit("returningSignalToConnectWebRTC", payload);
  },
  leaveVideoChat: () => {
    socketVideo.emit("leaveVideoChat");
  },
};
