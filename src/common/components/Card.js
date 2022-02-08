import React from "react";
import styled from "styled-components";
import { makeRandomRoomImage } from "../utils/makeRoomResource";
import createKey from "../utils/createKey";

const Card = ({ roomInfo }) => {
  const { title, users, room_no } = roomInfo;
  return (
    <>
      <ChatRoom>
        <ImgContent>
          <img src={makeRandomRoomImage()} alt="채팅방 프로필 이미지" />
        </ImgContent>
        <TextContent>
          <RoomNumber>{room_no < 10 ? "0" + room_no : room_no}</RoomNumber>
          <h1>{title.length > 10 ? title.slice(0, 10) + "..." : title}</h1>
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

const ChatRoom = styled.li`
  display: flex;
  flex-direction: column;
  hieght: 100%;
  width: 100%;
  border: 1px solid var(--dark-grey-shadow-color);
  border-radius: 15px;
  background: #fff;
  box-shadow: 1px 1px 10px 1px var(--light-grey-shadow-color);
  overflow: hidden;

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
  width: 96%;
  height: 57%;
  padding: 2%;
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
    padding: 1%;
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
