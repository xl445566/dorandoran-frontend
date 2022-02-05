import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainHeader from "../Rooms/MainHeader";
import Peer from "peerjs";

const VideoChat = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    peer.on("open", (id) => setPeerId(id));

    peer.on("call", (call) => {
      getUserMedia({ video: true }, (myStream) => {
        myVideoRef.current.srcObject = myStream;

        call.answer(myStream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true },
      (myStream) => {
        // call 버튼을 누르면 상대방에게 내 스트림을 전송하며 call을 발생시킵니다.
        const call = peerInstance.current.call(remotePeerId, myStream);

        myVideoRef.current.srcObject = myStream;

        // 상대방에게 stream을 받으면 상대방 비디오에 stream을 할당 합니다.
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      },
      (err) => {
        console.log("Failed to get local stream", err);
      }
    );
  };

  return (
    <>
      <h1>{peerId}</h1>
      <p>
        상대방 Peer ID를
        <input
          type="text"
          onChange={(e) => {
            setRemotePeerId(e.target.value);
          }}
        />
        여기 사이에 입력 해주세요.
      </p>
      <button
        onClick={() => {
          call(remotePeerId);
        }}
      >
        Call
      </button>
      <VideoChatContainer>
        <MainHeader />
        <VideoWrapper>
          <div>
            <video autoPlay playsInline ref={myVideoRef} />
            <span>나</span>
          </div>
          <div>
            <video autoPlay playsInline ref={remoteVideoRef} />
            <span>상대방</span>
          </div>
          <div>
            <video autoPlay playsInline />
            <span>한소영</span>
          </div>
          <div>
            <video autoPlay playsInline />
            <span>한소영</span>
          </div>
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
  background: var(--dark-gray-color);
`;

const VideoWrapper = styled.section`
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: space-evenly;
  align-content: space-evenly;
  grid-template-columns: repeat(2, minmax(600px, auto));
  /* grid-template-rows: repeat(2, minmax(400px, auto)); */
  gap: 10px;
  width: 1200px;
  margin: auto;

  div {
    position: relative;
    width: 100%;
    height: 100%;

    span {
      position: absolute;
      bottom: 10px;
      left: 20px;
      padding: 5px 15px;
      border-radius: 15px;
      background: var(--orange-color);
      color: var(--white-color);
    }

    video {
      width: 100%;
      height: 100%;
      border: 2px solid var(--orange-color);
      border-radius: 20px;
      box-sizing: border-box;
      background: var(--white-color);
    }
  }
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
