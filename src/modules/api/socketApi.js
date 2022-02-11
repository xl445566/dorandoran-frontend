import { socketCharacter, socketVideo } from "../saga/socketSaga";

export const soketCharacterApi = {
  hello: (roomId, image) => {
    socketCharacter.emit("hello", roomId, image);
  },
  moveCharacter: (char) => {
    socketCharacter.emit("moveCharacter", char);
  },
  exitUser: (roomId) => {
    socketCharacter.emit("exitUser", roomId);
  },
};

export const soketVideoApi = {
  enterRoom: (roomName, peerId) => {
    socketVideo.emit("enterRoom", roomName, peerId);
  },
};
