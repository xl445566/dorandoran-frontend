import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Card = ({ roomInfo, index }) => {
  const { title, users } = roomInfo;
  return (
    <>
      <ChatRoom>
        <div>
          <img src="/assets/cards/card1.png" alt="image" />
        </div>
        <TextContent>
          <RoomNumber>0{index + 1}</RoomNumber>
          <h1>{title}</h1>
          <ul>
            {users.map((user) => {
              return <li key={user._id}>{user.name}</li>;
            })}
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
    padding: 0 0 5px;
    margin: 10px 0 15px 0;
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

Card.propTypes = {
  roomInfo: PropTypes.object,
  title: PropTypes.string,
  address: PropTypes.string,
  users: PropTypes.string,
  index: PropTypes.number,
};

export default Card;
