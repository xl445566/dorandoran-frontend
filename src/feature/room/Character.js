import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import Profile from "../../common/components/Profile";

const Character = ({ count, isChatting, x, y, side, name, type }) => {
  const sides = {
    down: [0, -70],
    left: [-71, -70],
    right: [-142, -70],
    up: [-213, -70],
  };
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {isChatting ? (
        <>
          <Profile
            left={x * 60}
            top={y * 60}
            type={user.profile}
            text={user.name}
          />
        </>
      ) : (
        <Container
          count={count}
          xPos={64}
          yPos={69}
          left={x * 60}
          top={y * 60}
          sidePos={sides[side]}
          type={type}
        >
          <UserName>{name}</UserName>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => props.xPos}px;
  height: ${(props) => props.yPos}px;
  background-image: url(${(props) => props.type});
  background-position: ${(props) => props.count * props.sidePos[1]}px
    ${(props) => props.sidePos[0]}px;
`;

const UserName = styled.p`
  position: relative;
  top: 80px;
  right: 15px;
  width: 100px;
  border-radius: 10px;
  background: #0000007d;
  color: #fff;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default Character;
