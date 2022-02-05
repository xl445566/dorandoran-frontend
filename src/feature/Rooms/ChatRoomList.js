import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../../common/components/Card";

const ChatRoomList = ({ data }) => {
  console.log(data);
  return (
    <>
      <ChatRoomContainer>
        {Array(6)
          .fill(0)
          .map((v, i) => {
            return <Card key={v + i} />;
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
  data: PropTypes.string,
};

export default ChatRoomList;
