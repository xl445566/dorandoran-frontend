import React from "react";

import styled from "styled-components";

import Button from "../../common/components/Button";

const RoomModal = ({ onClick }) => {
  return (
    <ModalContainer>
      <h1>인원이 다 찼습니다.</h1>
      <h3>다른 방을 이용해주세요!</h3>
      <Button size="large" text="확인" onClick={onClick} />
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 15px;
  }

  h3 {
    margin-bottom: 30px;
    color: var(--dark-gray-color);
    font-weight: 400;
  }
`;

export default RoomModal;
