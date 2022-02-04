import React from "react";
import styled from "styled-components";
import Button from "../../common/components/Button";

const MainHeader = () => {
  return (
    <HeaderContainer>
      <Button text="방 만들기" size="medium" />
      <Button text="방 만들기" size="medium" type="cancel" />
      <RoomInfo>
        <Button text="새로고침" size="small" type="refresh" />
        <Button text="셀렉토" size="small" />
        <h1>강남구 대치노인정</h1>
      </RoomInfo>
      <Button text="셀렉토큰사이" size="large" />
      <Button
        type="logout"
        text="로그아웃"
        color="black"
        img="./assets/logout.png"
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
`;

const RoomInfo = styled.div`
  display: flex;

  h1 {
    margin: 0 10px;
  }
`;

export default MainHeader;
