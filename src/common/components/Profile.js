import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Profile = ({ type, text, left, top }) => {
  return (
    <Container left={left} top={top}>
      <ProfileImageWrapper>
        <img src={type} alt="카카오톡 프로필 이미지" />
      </ProfileImageWrapper>
      <UserName>
        <ChatOn />
        {text}
      </UserName>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
`;

const UserName = styled.h3`
  width: 94px;
  margin-top: 10px;
  padding: 5px 5px;
  border-radius: 46px;
  background-color: var(--black-color);
  color: var(--white-color);
  font-size: 15px;
  text-align: center;
  text-overflow: ellipsis;
  opacity: 0.6;
  overflow: hidden;
  white-space: nowrap;
`;

const ChatOn = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  border-radius: 10px;
  background: #00ff00;
`;

Profile.propTypes = {
  type: PropTypes.string,
  gender: PropTypes.string,
  text: PropTypes.string,
};

export default Profile;
