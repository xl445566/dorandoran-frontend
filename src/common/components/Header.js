import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = () => {
  return (
    <HeaderContainer>
      <Button text="방 만들기" size="medium" />
      {/* <Button text="방 만들기" size="medium" type="cancel" /> */}
      <RoomInfo>
        <Button text="새로고침" size="small" type="refresh" />
        {/* <Button text="셀렉토" size="small" /> */}
        <Title>강남구 대치경로당</Title>
      </RoomInfo>
      {/* <Button text="라지사이즈" size="large" /> */}
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

const Title = styled.h1`
  border-bottom: 3px solid var(--scarlet-color);
`;

const RoomInfo = styled.div`
  display: flex;

  h1 {
    margin: 0 10px;
  }
`;

Header.propTypes = {
  handleRefresh: PropTypes.string,
};

export default Header;
