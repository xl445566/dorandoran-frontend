import { socket } from "../saga/socketSaga";

// 리액트 soketAPI ----> 서버 socket 으로 보내는 로직을 작성하는 곳

// 작성하는 방법
// 예)
// joinUser(data) { // 함수이름(서버에 소켓으로 보내는 데이터)
//   socket.emit("joinUser", data);
//   서버에서 socket.on("joinUser")으로 받을 수 있습니다.
//   2번째 인자는 서버로 보낼 data 입니다.
//   joinUser 함수이름과 emit의 첫번째인자를 똑같이 맞춰야 합니다 !
// },

// 컴포넌트에서 사용하는 방법
// 예) soketApi.enterRoom(roomName, id);

const soketApi = {
  enterRoom: (roomName, peerId) => {
    socket.emit("enterRoom", roomName, peerId);
  },
};

export default soketApi;
