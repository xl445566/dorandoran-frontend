import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import Card from "../../common/components/Card";
import createKey from "../../common/utils/createKey";

const ChatRoomList = ({ roomList }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(roomList);
  }, [roomList]);

  return (
    <>
      <ChatRoomContainer>
        {rooms &&
          rooms.map((room) => {
            return <Card key={createKey()} roomInfo={room} />;
          })}
      </ChatRoomContainer>
    </>
  );
};

const ChatRoomContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  grid-template-row: repeat(2, 320px);
  gap: 10px;
  width: 100%;
`;

ChatRoomList.propTypes = {
  roomList: PropTypes.arrayOf(PropTypes.object),
};

ChatRoomList.defaultProps = {
  roomList: null,
};

export default ChatRoomList;
