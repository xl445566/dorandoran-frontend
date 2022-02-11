import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const soketCharacterApi = {
  enterRoom: (roomName, peerId) => {
    socketCharacter.emit("enterRoom", roomName, peerId);
  },
};

export const soketVideoApi = {
  enterRoom: (roomName, peerId) => {
    socketVideo.emit("enterRoom", roomName, peerId);
  },
};
