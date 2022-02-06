import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ChatRoomList from "./ChatRoomList";
import Header from "../../common/components/Header";

const Rooms = () => {
  const [roomList, setRoomList] = useState([]);
  const [room, setRoom] = useState(0);
  const next = "next";
  const prev = "prev";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const result = await axios.get("http://localhost:4000/rooms", {
          withCredentials: true,
        });

        setRoom(result.data.rooms[5]);
        setRoomList(result.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent();
  }, []);

  const handleNextClick = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/rooms",
        {
          room,
          direction: next,
        },
        {
          withCredentials: true,
        }
      );

      setRoom(result.data.rooms[5]);
      setRoomList(result.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevClick = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/rooms",
        {
          room,
          direction: prev,
        },
        {
          withCredentials: true,
        }
      );

      setRoom(result.data.rooms[5]);
      setRoomList(result.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefreshClick = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/rooms/refresh",
        {
          roomList,
        },
        {
          withCredentials: true,
        }
      );

      setRoom(result.data.rooms[5]);
      setRoomList(result.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Entry>
      <Header centerOnClick={handleRefreshClick} />
      <MainBody>
        <button onClick={handlePrevClick}>
          <FaChevronLeft size="60" className="icons" />
        </button>
        {roomList.length > 0 && <ChatRoomList roomList={roomList} />}
        <button onClick={handleNextClick}>
          <FaChevronRight size="60" className="icons" />
        </button>
      </MainBody>
    </Entry>
  );
};

const Entry = styled.main`
  width: 100vw;
  height: 100vh;
  // padding: 5% 0;
  background-color: #f6f8f9;
`;

const MainBody = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
  // height: 100%;
  align-items: center;

  .icons {
    color: var(--black-color);
  }
`;

export default Rooms;
