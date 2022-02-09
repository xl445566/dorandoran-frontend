import React from "react";

import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import createKey from "../utils/createKey";
import { makeRandomRoomImage } from "../utils/makeRoomResource";

const Card = ({ roomInfo }) => {
  const history = useHistory();
  const { title, users, room_no, _id } = roomInfo;

  return (
    <>
      <ChatRoom
        onClick={() => {
          history.push({
            pathname: `/room/${_id}`,
            state: roomInfo,
          });
        }}
      >
        <ImgContent>
          <img src={makeRandomRoomImage()} alt="채팅방 프로필 이미지" />
        </ImgContent>
        <TextContent>
          <RoomNumber>{room_no < 10 ? "0" + room_no : room_no}</RoomNumber>
          <h1>{title.length > 9 ? title.slice(0, 9) + "..." : title}</h1>
          <ul>
            {users.map((user) => {
              return <li key={createKey()}>{user.name}</li>;
            })}
          </ul>
        </TextContent>
      </ChatRoom>
    </>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-15px);
  }
`;

const ChatRoom = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  hieght: 100%;
  width: 100%;
  border: 1px solid var(--light-grey-shadow-color);
  border-radius: 15px;
  background: var(--white-color);
  box-shadow: 10px 1px 10px 1px #655e584d;
  overflow: hidden;
  cursor: pointer;

  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-name: ${slideUp};
  animation-fill-mode: both;

  &:hover {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-name: ${slideDown};
    animation-fill-mode: both;
    box-shadow: 1px 1px 10px 1px #6d60554d;
  }

  h1 {
    margin: 10px 0 13px 0;
    padding: 0 0 5px;
    border-bottom: 1px solid var(--dark-grey-shadow-color);
    font-size: 18px;
  }
`;

const ImgContent = styled.div`
  width: 100%;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 94%;
  height: 57%;
  padding: 3%;
  background: var(--white-color);

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, minmax(10px, auto));
    gap: 10px;
    width: 100%;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 2% 1%;
    border-radius: 15px;
    background-color: var(--orange-color);
    color: var(--white-color);
    text-align: center;
  }
`;

const RoomNumber = styled.span`
  color: var(--scarlet-color);
  font-weight: bold;
`;

export default Card;
