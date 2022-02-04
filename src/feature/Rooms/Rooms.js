import React from "react";
import ChatRoomList from "../Rooms/ChatRoomList";
import Header from "../../common/components/Header";
import styled from "styled-components";
import Room from "../Rooms/Room";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Rooms = () => {
  return (
    <Entry>
      <Header />
      <MainBody>
        <button>
          <FaChevronLeft size="60" className="icons" />
        </button>
        <ChatRoomList />
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

export default Rooms;
