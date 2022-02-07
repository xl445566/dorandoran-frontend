import React from "react";

import styled from "styled-components";

const Card = () => {
  return (
    <>
      <ChatRoom>
        <div>
          <img src="/assets/cards/card1.png" alt="image" />
        </div>
        <TextContent>
          <RoomNumber>01</RoomNumber>
          <h1>김필순님의 방</h1>
          <ul>
            <li>김필순</li>
          </ul>
        </TextContent>
      </ChatRoom>
    </>
  );
};

const ChatRoom = styled.li`
  border: 1px solid var(--dark-grey-shadow-color);
  border-radius: 15px;
  box-shadow: 1px 1px 10px 1px var(--light-grey-shadow-color);
  overflow: hidden;

  h1 {
    margin: 3px 0 15px 0;
    border-bottom: 1px solid var(--dark-grey-shadow-color);
  }
`;

const TextContent = styled.div`
  padding: 15px;
  background: var(--white-color);

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, minmax(28px, auto));
    gap: 10px;
  }

  li {
    width: 90%;
    padding: 3px;
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
