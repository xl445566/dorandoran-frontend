import React from "react";
// import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { roomSliceActions } from "../../modules/slice/roomSlice";
import createKey from "../utils/createKey";
import { makeRandomRoomImage } from "../utils/makeRoomResource";

const Card = ({ roomInfo }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user._id);
  const { title, users, room_no, _id } = roomInfo;
  const images = makeRandomRoomImage();

  const joinedUser = () => {
    dispatch(
      roomSliceActions.getCurrentRoomInfo({
        _id,
        currentUser,
      })
    );
  };

  return (
    <>
      <ChatRoom onClick={joinedUser}>
        <div className="img-container">
          <img src={images[0]} alt={images[1]} />
        </div>
        <div className="text-container">
          <RoomNumber>{room_no < 10 ? "0" + room_no : room_no}</RoomNumber>
          <h1>{title.length > 15 ? title.slice(0, 15) + "..." : title}</h1>
          <ul>
            {users.map((user) => {
              return <li key={createKey()}>{user.name}</li>;
            })}
          </ul>
        </div>
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

  .text-container {
    padding: 8px;
    background-color: var(--white-color);
  }

  .text-container ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, minmax(23px, auto));
    gap: 6px;
  }

  .text-container ul li {
    padding: 5px 0;
    border-radius: 15px;
    background-color: var(--orange-color);
    color: var(--white-color);
    font-size: 18px;
    text-align: center;
  }

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

const RoomNumber = styled.span`
  color: var(--scarlet-color);
  font-weight: bold;
`;

export default Card;
