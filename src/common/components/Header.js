import React from "react";
import styled from "styled-components";
import Button from "./Button";
import LogoutButton from "./LogoutButton";

const Header = ({ leftOnClick, centerOnClick, rightOnClick, title }) => {
  return (
    <HeaderContainer>
      <Button text="방 만들기" size="medium" onClick={leftOnClick} />
      <RoomInfo>
        <Button
          type="refresh"
          text="새로고침"
          size="small"
          onClick={centerOnClick}
        />
        <Title>{title ? title : "강남구 대치노인정"}</Title>
      </RoomInfo>
      <LogoutButton text="로그아웃" onClick={rightOnClick} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
`;

const Title = styled.h1`
  border-bottom: 3px solid var(--scarlet-color);
`;

const RoomInfo = styled.div`
  display: flex;

  h1 {
    margin: 0 10px;
  }
`;

export default Header;
