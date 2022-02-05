import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../../common/components/Card";

const ChatRoomList = ({ roomData }) => {
  const roomInfos = roomData.rooms;

  return (
    <>
      <ChatRoomContainer>
        {roomInfos &&
          roomInfos.map((value, index) => {
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

ChatRoomList.propTypes = {
  handleFresh: PropTypes.string,
  roomData: PropTypes.object,
};

export default ChatRoomList;
