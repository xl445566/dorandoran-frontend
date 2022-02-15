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
  const getpositionParams = location.state.position;
  console.log("VideoChat getpositionParams", getpositionParams);
  let peer;

  useEffect(() => {
    if (error) {
      history.push("/error");
    }

    if (!isLoggedIn) {
      history.push("/");
    }
  }, [error, isLoggedIn]);

  const handleRoomPage = () => {
    socketCharacterApi.exitChattingRoom(getpositionParams);
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

  const userVideo = useRef(); //태그
  // const partnerVideo = useRef();

  const peerRef = useRef(); //연결
  const userStream = useRef(); //영상

  const otherUser = useRef(); //나말고 다른 윶

  // const [otherUser1, setOtherUser1] = useState("");
  // const [otherUser2, setOtherUser2] = useState("");
  // const [otherUser3, setOtherUser3] = useState("");
  const otherVideo1 = useRef(); //다른 유저 비디오 태그
  const otherVideo2 = useRef();
  const otherVideo3 = useRef();

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      const handleRecieveCall = async (incoming) => {
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
      };

      const handleAnswer = async (message) => {
        try {
          const description = await new RTCSessionDescription(message.sdp);
          await peerRef.current.setRemoteDescription(description);
        } catch (error) {
          console.log("handleAnswer ERROR::::", error);
        }
      };

      const handleNewIceCandidateMessage = (incoming) => {
        //incoming이 icecandidate다
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate);
      };

      socketVideoApi.joinRoom(params.roomId);

      socketVideo.on("otherUser", (userId) => {
        callUser(userId);
        otherUser.current = userId;
      });

      socketVideo.on("userJoined", (userId) => {
        otherUser.current = userId;
      });

      socketVideo.on("offer", handleRecieveCall);
      socketVideo.on("answer", handleAnswer);
      socketVideo.on("iceCandidate", handleNewIceCandidateMessage);
    };

    init();
  }, []);

  const handleIceCandidateEvent = (event) => {
    if (event.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: event.candidate,
      };
      socketVideoApi.iceCandidate(payload);
    }
  };

  const handleTrackEvent = (event) => {
    console.log("track event", event);
    // partnerVideo.current.srcObject = event.streams[0];
    if (!otherVideo1.current.srcObject) {
      otherVideo1.current.srcObject = event.streams[0];
    } else if (!otherVideo2.current.srcObject) {
      otherVideo2.current.srcObject = event.streams[0];
    } else if (!otherVideo3.current.srcObject) {
      otherVideo3.current.srcObject = event.streams[0];
    }
  };

  const handleNegotiationNeededEvent = async (userId) => {
    try {
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
  };

  const myPeerCheck = () => {
    console.log("내 peer", peer);
    console.log("userVideo 내 비디오", userVideo);
  };

  const disconnectVideo = () => {
    // peer.onremovetrack = null;
    // peer.onremovestream = null;
    // peer.onicecandidate = null;
    // peer.oniceconnectionstatechange = null;
    // peer.onsignalingstatechange = null;
    // peer.onicegatheringstatechange = null;
    // peer.onnegotiationneeded = null;

    const tracks = userStream.current.getTracks();
    tracks.forEach((track) => track.stop());
    userVideo.current.srcObject = null;

    // userVideo.current.srcObject = null; //내 화면은 보이지 않지만 상대방화면에서는 내가 보인다
    // userVideo.srcObject.getTracks().forEach((track) => track.stop());

    // if (remoteVideo.srcObject) {
    //   remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    // }

    // if (localVideo.srcObject) {
    //   localVideo.srcObject.getTracks().forEach(track => track.stop());
    // }

    // peer.close();
    // peer = null;
    console.log("내 종료된 peer", peer);
    console.log("종료된 userVideo 내 비디오", userVideo);
  };

  const createPeer = (userId) => {
    //선 만드는 함수
    peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          url: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleIceCandidateEvent;
    // peer.ontrack = handleTrackEvent;
    peer.ontrack = function (event) {
      handleTrackEvent(event);
    };

    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId);

    return peer;
  };

  const callUser = (userId) => {
    peerRef.current = createPeer(userId);

    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  };

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
          <button onClick={myPeerCheck}>내 피어보기 버튼</button>
          <button onClick={disconnectVideo}>연결끊기 버튼</button>
          <VideoBox>
            <video autoPlay playsInline ref={userVideo} />
            <UserName>{socketVideo?.id}</UserName>
          </VideoBox>
          <VideoBox>
            <video autoPlay playsInline ref={otherVideo1} />
            <UserName>상대방 - 1</UserName>
          </VideoBox>
          <VideoBox>
            <video autoPlay playsInline ref={otherVideo2} />
            <UserName>상대방 - 2</UserName>
          </VideoBox>
          <VideoBox>
            <video autoPlay playsInline ref={otherVideo3} />
            <UserName>상대방 - 3</UserName>
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
//초록불도끄고 피어도 끄고 비디오 태그 영상이 꺼져 누가 나갔는지 확인해야 함
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
