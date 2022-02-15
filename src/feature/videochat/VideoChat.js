import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import useConnection from "../../common/hooks/useConnection";
import mapSpots from "../../common/utils/mapSpot";
import { socketVideo } from "../../modules/saga/socketSaga";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import Video from "./Video";

const VideoChat = () => {
  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const seatPosition = useSelector((state) => state.auth.seatPosition);
  const currentUser = useSelector((state) => state.auth.user);
  const roomInfo = useSelector((state) => state.room.info);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const roomId = params.roomId;
  const { peerList, myVideo } = useConnection(roomId);

  useEffect(() => {
    if (error) {
      history.push("/error");
    }

    if (!isLoggedIn) {
      history.push("/");
    }
  }, [error, isLoggedIn]);

  const stopStreamedVideo = () => {
    const stream = myVideo.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    myVideo.current.srcObject = null;
  };

  const handleRoomPage = () => {
    stopStreamedVideo();

    history.push(`/room/${params.roomId}`);

    seatPosition.forEach((point) => {
      mapSpots[point[0]][point[1]] = 1;
    });
  };

  const handleLogout = () => {
    stopStreamedVideo();

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

        dispatch(authSliceActions.logoutRequest());
      },
    });
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
          <VideoBox>
            <video autoPlay playsInline muted ref={myVideo} />
            <UserName>{socketVideo.id}</UserName>
          </VideoBox>
          {peerList.map((connection) => {
            return (
              <VideoBox key={connection.id}>
                <Video peerConnection={connection.peer} />
                <UserName>{connection.id}</UserName>
              </VideoBox>
            );
          })}
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
