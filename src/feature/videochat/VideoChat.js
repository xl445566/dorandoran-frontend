import React from "react";
import styled from "styled-components";
import MainHeader from "../Rooms/MainHeader";

const VideoChat = () => {
  return (
    <VideoChatContainer>
      <MainHeader />
      <VideoWrapper>
        <div>
          <video autoPlay playsInline />
          <span>한소영</span>
        </div>
        <div>
          <video autoPlay playsInline />
          <span>한소영</span>
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
