import React, { useEffect } from "react";
import MainHeader from "./MainHeader";
import ChatRoomList from "./ChatRoomList";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Rooms = () => {
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
  }, [error]);

  return (
    <Entry>
      <MainHeader />
      <MainBody>
        <button>🔙</button>
        <ChatRoomList />
        <button>🔜</button>
      </MainBody>
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
