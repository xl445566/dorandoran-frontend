import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ChatRoomList from "../Rooms/ChatRoomList";
import Header from "../../common/components/Header";
import Room from "../Rooms/Room";

const Rooms = () => {
  const [data, setData] = useState("");

  const handleFresh = async (e) => {
    e.preventDefault();
    setData(null);
    try {
      // 테스트중
      const result = await axios.get("http://localhost:4000/rooms");
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Entry>
      <Header />
      <MainBody>
        <button onClick={handleFresh}>
          <FaChevronLeft size="60" className="icons" />
        </button>
        <ChatRoomList data={data} />
        <button>
          <FaChevronRight size="60" className="icons" />
        </button>
      </MainBody>
      <Room />
    </Entry>
  );
};

const Entry = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 5% 0;
  background-color: #f6f8f9;
`;

const MainBody = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  .icons {
    color: var(--black-color);
  }
`;

Rooms.propTypes = {
  handleFresh: PropTypes.string,
};

export default Rooms;
