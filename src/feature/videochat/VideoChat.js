import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import {
  socketVideoApi,
  socketCharacterApi,
} from "../../modules/api/socketApi";
import { socketVideo } from "../../modules/saga/socketSaga";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";

const VideoChat = () => {
  const location = useLocation();
  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const roomInfo = useSelector((state) => state.room.info);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const getPositionParams = location.state.position;

  useEffect(() => {
    if (error) {
      history.push("/error");
    }

    if (!isLoggedIn) {
      history.push("/");
    }
  }, [error, isLoggedIn]);

  const handleRoomPage = () => {
    socketCharacterApi.exitChattingRoom(getPositionParams);
    history.push(`/room/${params.roomId}`);
  };

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(
          roomSliceActions.deleteUser({
            currentUser: currentUser._id,
            currentRoom: params.roomId,
          })
        );

        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  const peerRef = useRef();

  const userVideo = useRef();
  const userStream = useRef();

  const otherUser = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socketVideoApi.joinRoom(params.roomId);

      socketVideo.on("otherUser", (partnerId) => {
        console.log("새로운 유저가 기존 유저에게 CALL <otherUser>", partnerId);
        otherUser.current = partnerId;
        callUser(partnerId);
      });

      socketVideo.on("userJoined", (partnerId) => {
        console.log(
          partnerId,
          "기존 유저에게 새로운 유저 알림 <userJoined>",
          partnerId
        );
        otherUser.current = partnerId;
      });

      socketVideo.on("offer", handleRecieveCall);
      socketVideo.on("answer", handleAnswer);
      socketVideo.on("iceCandidate", handleNewIceCandidateMessage);
    }
    init();
  }, []);

  function callUser(partnerId) {
    console.log("callUser 전화 발생");
    peerRef.current = createPeer(partnerId);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(userId) {
    const peer = new RTCPeerConnection();
    peer.onicecandidate = handleIceCandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId);
    return peer;
  }

  async function handleNegotiationNeededEvent(userId) {
    try {
      console.log("offer 를 보냅니다.");
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);
      const payload = {
        target: userId,
        caller: socketVideo.id,
        sdp: peerRef.current.localDescription,
      };
      socketVideoApi.offer(payload);
    } catch (error) {
      console.log("handleNegotiationNeededEvent ERROR:::::", error);
    }
  }

  async function handleRecieveCall(incoming) {
    console.log("offer가 왔습니다. -> answer를 보냅니다.");
    try {
      peerRef.current = createPeer();
      const description = new RTCSessionDescription(incoming.sdp);
      await peerRef.current.setRemoteDescription(description);
      userStream.current
        .getTracks()
        .forEach((track) =>
          peerRef.current.addTrack(track, userStream.current)
        );
      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);
      const payload = {
        target: incoming.caller,
        caller: socketVideo.id,
        sdp: peerRef.current.localDescription,
      };
      socketVideoApi.answer(payload);
    } catch (error) {
      console.log("handleRecieveCall ERROR::::", error);
    }
  }

  async function handleAnswer(message) {
    try {
      console.log("answer가 왔습니다.");
      const description = await new RTCSessionDescription(message.sdp);
      await peerRef.current.setRemoteDescription(description);
    } catch (error) {
      console.log("handleAnswer ERROR::::", error);
    }
  }

  function handleIceCandidateEvent(event) {
    console.log("peer.current", peerRef.current);
    if (event.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: event.candidate,
      };
      socketVideoApi.iceCandidate(payload);
    }
  }

  function handleNewIceCandidateMessage(incoming) {
    console.log("ice candidate 발견!!!");
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate);
  }

  function handleTrackEvent(event) {
    console.log("track event 발생", event.streams);
    partnerVideo.current.srcObject = event.streams[0];
  }

  return (
    <>
      <VideoChatContainer>
        <Header
          leftOnClick={handleRoomPage}
          rightOnClick={handleLogout}
          text="방 으로 가기"
          title={roomInfo ? roomInfo.title : false}
        />
        <VideoWrapper>
          <VideoBox>
            <video autoPlay playsInline ref={userVideo} />
            <UserName>나 - {socketVideo.id}</UserName>
          </VideoBox>
          <VideoBox>
            <video autoPlay playsInline ref={partnerVideo} />
            <UserName>상대방 - 1</UserName>
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
