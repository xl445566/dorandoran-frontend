import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Card from "../../common/components/Card";
import createKey from "../../common/utils/createKey";

const ChatRoomList = ({ roomList, setIsShowModal }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(roomList);
  }, [roomList]);

  return (
    <>
      <ChatRoomContainer>
        {rooms &&
          rooms.map((room) => {
            return (
              <Card
                key={createKey()}
                roomInfo={room}
                setIsShowModal={setIsShowModal}
              />
            );
          })}
      </ChatRoomContainer>
    </>
  );
};

const ChatRoomContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(3vw, auto));
  gap: 10px;
  width: 80%;
`;

export default ChatRoomList;
