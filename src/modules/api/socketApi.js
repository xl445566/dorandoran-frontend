import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const soketCharacterApi = {
  enterRoom: (roomName, peerId) => {
    socketCharacter.emit("enterRoom", roomName, peerId);
  },
};

export const soketVideoApi = {
  enterRoom: (roomName) => {
    socketVideo.emit("enterRoom", roomName);
  },
  offer: (roomName, offer) => {
    socketVideo.emit("offer", roomName, offer);
  },
};
