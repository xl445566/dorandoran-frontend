import React, { useEffect, useRef, useState } from "react";

import Peer from "peerjs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import mapSpots from "../../common/utils/mapSpot";
import {
  peerAnswer,
  peerCall,
  setMediaStream,
  handlePeerDisconnect,
} from "../../common/utils/mediaUtils";
import { soketVideoApi } from "../../modules/api/socketApi";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import { videoSliceActions } from "../../modules/slice/videoSlice";

const VideoChat = () => {
  const [peerId, setPeerId] = useState("");

  const peerInstance = useRef(null);
  const myVideoRef = useRef(null);
  const remoteVideoRef1 = useRef(null);
  const remoteVideoRef2 = useRef(null);
  const remoteVideoRef3 = useRef(null);

  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const seatPosition = useSelector((state) => state.auth.seatPosition);
  const currentUser = useSelector((state) => state.auth.user);
  const isUpdate = useSelector((state) => state.video.isUpdate);
  const remotePeerId = useSelector((state) => state.video.remotePeerId);
  const roomInfo = useSelector((state) => state.room.info);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;
    setMediaStream(myVideoRef.current);

    peer.on("open", (id) => {
      setPeerId(id);
      soketVideoApi.enterRoom(params.roomId, id);
    });

    peer.on("call", (call) => {
      peerAnswer(
        call,
        remoteVideoRef1.current,
        remoteVideoRef2.current,
        remoteVideoRef3.current
      );
    });
  }, []);

  useEffect(() => {
    if (isUpdate) {
      peerCall(
        peerInstance.current,
        remotePeerId,
        remoteVideoRef1.current,
        remoteVideoRef2.current,
        remoteVideoRef3.current
      );
      dispatch(videoSliceActions.initIsUpdate());
    }
  }, [remotePeerId, isUpdate]);

  useEffect(() => {
    if (error) {
      history.push("/error");
    }

    if (!isLoggedIn) {
      history.push("/");
    }
  }, [error, isLoggedIn]);

  const handleRoomPage = () => {
    const stream = myVideoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    myVideoRef.current.srcObject = null;
    handlePeerDisconnect(peerInstance.current);

    seatPosition.forEach((point) => {
      mapSpots[point[0]][point[1]] = 1;
    });

    history.push(`/room/${params.roomId}`);
  };

  const handleLogout = () => {
    const stream = myVideoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    myVideoRef.current.srcObject = null;
    handlePeerDisconnect(peerInstance.current);

    seatPosition.forEach((point) => {
      mapSpots[point[0]][point[1]] = 1;
    });

    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(
          roomSliceActions.deleteUser({
            currentUser: currentUser._id,
            currentRoom: params.roomId,
          })
        );
        dispatch(roomSliceActions.init());
        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  return (
    <>
      <p>My PEER ID: {peerId}</p>
      <VideoChatContainer>
        <Header
          leftOnClick={handleRoomPage}
          rightOnClick={handleLogout}
          text="방 으로 가기"
          title={roomInfo.title ? roomInfo.title : false}
        />
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
