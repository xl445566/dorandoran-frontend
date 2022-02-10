import React, { useEffect, useRef, useState } from "react";

import Peer from "peerjs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import mapSpots from "../../common/utils/mapSpot";
import { soketVideoApi } from "../../modules/api/socketApi";
import { socketVideo } from "../../modules/saga/socketSaga";

const VideoChat = () => {
  const [peerId, setPeerId] = useState("");

  const peerInstance = useRef(null);

  const myVideoRef = useRef(null);
  const remoteVideoRef1 = useRef(null);
  const remoteVideoRef2 = useRef(null);
  const remoteVideoRef3 = useRef(null);

  const seatPosition = useSelector((state) => state.auth.seatPosition);
  const history = useHistory();
  const roomName = "cnfp";

  useEffect(() => {
    const peer = new Peer();
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true }, (myStream) => {
      myVideoRef.current.srcObject = myStream;
    });

    peer.on("open", (id) => {
      console.log("-------------------------------------------------");
      console.log("my Peer ID: ", id);
      console.log("-------------------------------------------------");

      setPeerId(id);
      soketVideoApi.enterRoom("cnfp", id);
    });

    peer.on("call", (call) => {
      getUserMedia({ video: true }, (myStream) => {
        call.answer(myStream);

        call.on("stream", (remoteStream) => {
          if (!remoteVideoRef1.current.srcObject) {
            remoteVideoRef1.current.srcObject = remoteStream;
          } else if (!remoteVideoRef2.current.srcObject) {
            remoteVideoRef2.current.srcObject = remoteStream;
          } else if (!remoteVideoRef3.current.srcObject) {
            remoteVideoRef3.current.srcObject = remoteStream;
          }
        });

        call.on("close", () => {
          console.log("-------------------------------------------------");
          console.log("전화를 받은 사람이 나갔습니다.", call);
          console.log("-------------------------------------------------");

          call.close();
        });
      });
    });

    // socket.on("welcome", (newRemotePeerId) => {
    //   console.log("-------------------------------------------------");
    //   console.log("새로 들어온 사람: ", newRemotePeerId);
    //   console.log("-------------------------------------------------");

    //   call(newRemotePeerId);
    // });

    socketVideo.on("roomChange", (userList) => {
      console.log("-------------------------------------------------");
      console.log("현재 유저 리스트: ", userList);
      console.log("-------------------------------------------------");
    });

    socketVideo.on("bye", (leavePeerId) => {
      console.log("나간 사람: ", leavePeerId);
      console.log("남은 peerInstance.current", peerInstance.current);
    });

    peerInstance.current = peer;
  }, []);

  // const call = (remotePeerId) => {
  //   const getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia;

  //   getUserMedia({ video: true }, (myStream) => {
  //     const call = peerInstance.current.call(remotePeerId, myStream);

  //     call.on("stream", (remoteStream) => {
  //       if (!remoteVideoRef1.current.srcObject) {
  //         remoteVideoRef1.current.srcObject = remoteStream;
  //       } else if (!remoteVideoRef2.current.srcObject) {
  //         remoteVideoRef2.current.srcObject = remoteStream;
  //       } else if (!remoteVideoRef3.current.srcObject) {
  //         remoteVideoRef3.current.srcObject = remoteStream;
  //       }
  //     });

  //     call.on("close", () => {
  //       console.log("-------------------------------------------------");
  //       console.log("전화를 건 사람이 나갔습니다.", call);
  //       console.log("-------------------------------------------------");
  //       call.close();
  //     });
  //   });
  // };

  const handleLeaveRoom = () => {
    socketVideo.close();
    peerInstance.current.disconnect();
    peerInstance.current.destroy();
    history.push("/");
  };

  const onRoomPage = () => {
    seatPosition.forEach((point) => {
      mapSpots[point[0]][point[1]] = 1;
    });
    history.push(`/room/62028363530976bb8ea8ab6b`);
  };

  return (
    <>
      <h1>My PEER ID: {peerId}</h1>
      <h1>Room Name : {roomName}</h1>
      <button onClick={handleLeaveRoom}>나가기</button>
      <VideoChatContainer>
        <Header leftOnClick={onRoomPage} />
        <VideoWrapper>
          <VideoBox>
            <video autoPlay playsInline ref={myVideoRef} />
            <UserName>나</UserName>
          </VideoBox>
          <VideoBox>
            <video
              className="remotePeer"
              autoPlay
              playsInline
              ref={remoteVideoRef1}
            />
            <UserName>상대방- 1</UserName>
          </VideoBox>
          <VideoBox>
            <video
              className="remotePeer"
              autoPlay
              playsInline
              ref={remoteVideoRef2}
            />
            <UserName>상대방 -2</UserName>
          </VideoBox>
          <VideoBox>
            <video
              className="remotePeer"
              autoPlay
              playsInline
              ref={remoteVideoRef3}
            />
            <UserName>상대방 -3</UserName>
          </VideoBox>
        </VideoWrapper>
        <EmojiWrapper>
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
          <EmojiButton />
        </EmojiWrapper>
      </VideoChatContainer>
    </>
  );
};

const VideoChatContainer = styled.main`
  width: 100%;
  height: 100%;
  background: var(--light-gray-color);
`;

const VideoWrapper = styled.section`
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-evenly;
  grid-template-columns: repeat(2, minmax(600px, auto));
  grid-template-rows: repeat(2, minmax(400px, auto));
  gap: 20px;
  width: 1200px;
  margin: auto;
`;

const VideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  video {
    width: 600px;
    height: 400px;
    border: 2px solid var(--orange-color);
    border-radius: 20px;
    box-sizing: border-box;
    background: var(--white-color);
    box-shadow: 1px 1px 10px 1px var(--dark-grey-shadow-color);
    object-fit: cover;
  }
`;

const UserName = styled.span`
  position: absolute;
  bottom: 30px;
  left: 30px;
  padding: 5px 15px;
  border-radius: 15px;
  background: var(--orange-color);
  color: var(--white-color);
`;

const EmojiWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin: auto;
  background: var(--dark-gray-color);
`;

const EmojiButton = styled.button`
  width: 70px;
  height: 70px;
  margin-left: 45px;
  margin-right: 45px;
  border: 2px solid var(--dark-gray-color);
  border-radius: 15%;
  background: var(--dark-grey-shadow-color);
`;

export default VideoChat;
