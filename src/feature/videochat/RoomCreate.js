import React, { useState } from "react";

import styled from "styled-components";

import Card from "../../common/components/Card";
import Modal from "../../common/components/modal/Modal";

const RoomCreate = () => {
  const [isShow, setIsShow] = useState(false);

  const handleModalShowChange = () => {
    setIsShow(isShow ? false : true);
  };

  return (
    <>
      {isShow && (
        <Modal>
          <RoomCreateWrapper />
        </Modal>
      )}
      <button onClick={handleModalShowChange}>방 만들기</button>
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

const RoomCreateWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white-color);
`;

export default RoomCreate;
