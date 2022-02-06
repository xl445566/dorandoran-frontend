import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../../common/components/Card";

const ChatRoomList = ({ roomList }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(roomList);
  }, [roomList]);

  return (
    <>
      <ChatRoomContainer>
        {rooms &&
          rooms.map((value, index) => {
            return <Card key={value + index} roomInfo={value} index={index} />;
          })}
      </ChatRoomContainer>
    </>
  );
};

const ChatRoomContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, minmax(100px, auto));
  gap: 10px;
  width: 70%;
`;

export default ChatRoomList;
