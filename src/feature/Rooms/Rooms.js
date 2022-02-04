import React from "react";
import ChatRoomList from "../Rooms/ChatRoomList";
import Header from "../../common/components/Header";
import styled from "styled-components";
import Room from "../Rooms/Room";

const Rooms = () => {
  return (
    <Entry>
      <Header />
      <MainBody>
        <button>🔙</button>
        <ChatRoomList />
        <button>🔜</button>
      </MainBody>
      <Room></Room>
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
`;

export default Rooms;
